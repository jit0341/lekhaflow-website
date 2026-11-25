-- Document Cloud lifecycle hardening.
-- Apply only in the dedicated Document Cloud Supabase project after reviewing the Phase 1 schema.

create table if not exists public.document_cloud_audit_events (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.document_cloud_clients(id) on delete set null,
  actor_user_id uuid,
  event_type text not null,
  document_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists document_cloud_audit_client_idx
  on public.document_cloud_audit_events(client_id, created_at desc);
alter table public.document_cloud_audit_events enable row level security;
revoke all on public.document_cloud_audit_events from anon, authenticated;
grant select, insert on public.document_cloud_audit_events to service_role;

-- Move verified registrations into the administrator review queue.
create or replace function public.document_cloud_email_verified()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.email_confirmed_at is null and new.email_confirmed_at is not null then
    update public.document_cloud_clients
      set account_status = 'APPROVAL_PENDING', updated_at = now()
      where id = new.id and account_status = 'EMAIL_PENDING';
  end if;
  return new;
end;
$$;

drop trigger if exists document_cloud_auth_email_verified on auth.users;
create trigger document_cloud_auth_email_verified
  after update of email_confirmed_at on auth.users
  for each row execute function public.document_cloud_email_verified();

-- Confirm an uploaded object only when actual stored size matches the reservation.
create or replace function public.document_cloud_finalize_upload(
  p_document_id uuid,
  p_actual_size_bytes bigint
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  doc public.document_cloud_documents%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select * into doc from public.document_cloud_documents
    where id = p_document_id and client_id = auth.uid() and upload_status = 'PENDING' for update;
  if not found then return false; end if;
  if p_actual_size_bytes is null or p_actual_size_bytes <> doc.size_bytes then
    raise exception 'Uploaded object size does not match reservation';
  end if;
  update public.document_cloud_documents
    set upload_status = 'READY'
    where id = p_document_id;
  insert into public.document_cloud_audit_events(client_id, event_type, document_id)
    values (doc.client_id, 'DOCUMENT_UPLOADED', doc.id);
  return true;
end;
$$;

-- Call only after the private Filebase object has actually been deleted.
create or replace function public.document_cloud_confirm_delete(p_document_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  doc public.document_cloud_documents%rowtype;
begin
  select * into doc from public.document_cloud_documents
    where id = p_document_id and upload_status in ('READY', 'DELETE_PENDING', 'EXPIRED')
    for update;
  if not found then return false; end if;

  update public.document_cloud_clients
    set storage_used_bytes = greatest(0, storage_used_bytes - doc.size_bytes),
        updated_at = now()
    where id = doc.client_id;

  update public.document_cloud_documents
    set upload_status = 'DELETED', storage_key = storage_key || '.deleted.' || gen_random_uuid()::text
    where id = doc.id;

  insert into public.document_cloud_audit_events(client_id, event_type, document_id)
    values (doc.client_id, 'DOCUMENT_DELETED', doc.id);
  return true;
end;
$$;

revoke all on function public.document_cloud_finalize_upload(uuid, bigint) from public, anon;
revoke all on function public.document_cloud_confirm_delete(uuid) from public, anon, authenticated;
grant execute on function public.document_cloud_finalize_upload(uuid, bigint) to authenticated;
grant execute on function public.document_cloud_confirm_delete(uuid) to service_role;

-- Service-only transitions prevent a browser client from marking unverified objects READY.
revoke all on function public.document_cloud_email_verified() from public, anon, authenticated;
