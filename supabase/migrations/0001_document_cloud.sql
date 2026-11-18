-- LekhaFlow Document Cloud: Phase 1 database foundation
-- Apply only to the dedicated Supabase project "lekhaflow-document-cloud".
-- This migration does not modify existing LekhaFlow payment/licensing tables.

create extension if not exists pgcrypto;

create table if not exists public.document_cloud_clients (
  id uuid primary key references auth.users(id) on delete cascade,
  business_name text not null check (char_length(business_name) between 2 and 160),
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  email text not null,
  account_status text not null default 'EMAIL_PENDING'
    check (account_status in ('EMAIL_PENDING', 'APPROVAL_PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED')),
  is_test_account boolean not null default false,
  storage_quota_bytes bigint not null default 1073741824
    check (storage_quota_bytes > 0),
  storage_used_bytes bigint not null default 0
    check (storage_used_bytes >= 0 and storage_used_bytes <= storage_quota_bytes),
  approval_note text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists document_cloud_clients_status_idx
  on public.document_cloud_clients(account_status, created_at desc);

create table if not exists public.document_cloud_documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.document_cloud_clients(id) on delete cascade,
  category text not null check (category in ('PURCHASE', 'SALES', 'BANK_STATEMENT')),
  original_filename text not null check (char_length(original_filename) between 1 and 255),
  content_type text not null check (content_type in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp')),
  size_bytes bigint not null check (size_bytes > 0),
  storage_key text not null unique,
  upload_status text not null default 'PENDING'
    check (upload_status in ('PENDING', 'READY', 'DELETE_PENDING', 'DELETED', 'EXPIRED')),
  uploaded_at timestamptz not null default now(),
  first_downloaded_at timestamptz,
  delete_after timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists document_cloud_documents_client_idx
  on public.document_cloud_documents(client_id, created_at desc);

create index if not exists document_cloud_documents_expiry_idx
  on public.document_cloud_documents(upload_status, delete_after);

-- Automatically create a client profile after Supabase Auth creates a user.
-- Email confirmation remains controlled by Supabase Auth settings.
create or replace function public.document_cloud_create_client_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  business text;
  contact text;
begin
  business := coalesce(new.raw_user_meta_data ->> 'business_name', '');
  contact := coalesce(new.raw_user_meta_data ->> 'contact_name', '');

  if char_length(business) between 2 and 160
     and char_length(contact) between 2 and 120 then
    insert into public.document_cloud_clients (id, business_name, contact_name, email)
    values (new.id, business, contact, lower(new.email))
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists document_cloud_auth_user_created on auth.users;
create trigger document_cloud_auth_user_created
  after insert on auth.users
  for each row execute function public.document_cloud_create_client_profile();

alter table public.document_cloud_clients enable row level security;
alter table public.document_cloud_documents enable row level security;

-- Clients can read only their own profile and document metadata.
create policy "Clients read own document-cloud profile"
  on public.document_cloud_clients for select
  to authenticated
  using (id = (select auth.uid()));

create policy "Clients read own document metadata"
  on public.document_cloud_documents for select
  to authenticated
  using (client_id = (select auth.uid()));

-- Upload reservation is atomic: concurrent uploads cannot exceed the quota.
-- The server must still validate the actual file bytes before marking a file READY.
create or replace function public.document_cloud_reserve_upload(
  p_category text,
  p_original_filename text,
  p_content_type text,
  p_size_bytes bigint,
  p_storage_key text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  new_document_id uuid := gen_random_uuid();
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_category not in ('PURCHASE', 'SALES', 'BANK_STATEMENT') then
    raise exception 'Unsupported document category';
  end if;

  if p_content_type not in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp') then
    raise exception 'Unsupported file type';
  end if;

  if p_size_bytes is null or p_size_bytes <= 0 or p_size_bytes > 26214400 then
    raise exception 'File must be between 1 byte and 25 MiB';
  end if;

  if p_original_filename is null or char_length(p_original_filename) not between 1 and 255 then
    raise exception 'Invalid filename';
  end if;

  if p_storage_key is null or char_length(p_storage_key) < 10
     or left(p_storage_key, char_length(current_user_id::text) + 1) <> current_user_id::text || '/' then
    raise exception 'Invalid storage key';
  end if;

  update public.document_cloud_clients
    set storage_used_bytes = storage_used_bytes + p_size_bytes,
        updated_at = now()
    where id = current_user_id
      and account_status = 'ACTIVE'
      and storage_used_bytes + p_size_bytes <= storage_quota_bytes;

  if not found then
    raise exception 'Account is not active or storage quota would be exceeded';
  end if;

  insert into public.document_cloud_documents (
    id, client_id, category, original_filename, content_type,
    size_bytes, storage_key, upload_status
  ) values (
    new_document_id, current_user_id, p_category, p_original_filename,
    p_content_type, p_size_bytes, p_storage_key, 'PENDING'
  );

  return new_document_id;
end;
$$;

revoke all on function public.document_cloud_reserve_upload(text, text, text, bigint, text) from public;
grant execute on function public.document_cloud_reserve_upload(text, text, text, bigint, text) to authenticated;

-- A failed upload can release its reservation. Only the owning client can do this.
create or replace function public.document_cloud_cancel_upload(p_document_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  doc public.document_cloud_documents%rowtype;
begin
  select * into doc
    from public.document_cloud_documents
    where id = p_document_id
      and client_id = auth.uid()
      and upload_status = 'PENDING'
    for update;

  if not found then
    return false;
  end if;

  update public.document_cloud_clients
    set storage_used_bytes = greatest(0, storage_used_bytes - doc.size_bytes),
        updated_at = now()
    where id = doc.client_id;

  delete from public.document_cloud_documents where id = doc.id;
  return true;
end;
$$;

revoke all on function public.document_cloud_cancel_upload(uuid) from public;
grant execute on function public.document_cloud_cancel_upload(uuid) to authenticated;

-- Direct table writes are intentionally not granted to client sessions.
revoke insert, update, delete on public.document_cloud_clients from anon, authenticated;
revoke insert, update, delete on public.document_cloud_documents from anon, authenticated;
grant select on public.document_cloud_clients to authenticated;
grant select on public.document_cloud_documents to authenticated;
