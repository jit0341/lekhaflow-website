-- Repair upload finalization authorization without a service-role API key.
-- Apply this migration in the dedicated Document Cloud Supabase project.
-- The signed-in owner can finalize only their own PENDING reservation.

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

  select * into doc
    from public.document_cloud_documents
    where id = p_document_id
      and client_id = auth.uid()
      and upload_status = 'PENDING'
    for update;

  if not found then
    return false;
  end if;

  if p_actual_size_bytes is null or p_actual_size_bytes <> doc.size_bytes then
    raise exception 'Uploaded object size does not match reservation';
  end if;

  update public.document_cloud_documents
    set upload_status = 'READY'
    where id = p_document_id
      and client_id = auth.uid()
      and upload_status = 'PENDING';

  if not found then
    return false;
  end if;

  insert into public.document_cloud_audit_events(client_id, event_type, document_id)
    values (doc.client_id, 'DOCUMENT_UPLOADED', doc.id);

  return true;
end;
$$;

revoke all on function public.document_cloud_finalize_upload(uuid, bigint) from public, anon;
grant execute on function public.document_cloud_finalize_upload(uuid, bigint) to authenticated;
