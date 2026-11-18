-- Safely release quota for uploads abandoned before object verification.
create or replace function public.document_cloud_expire_pending(p_document_id uuid)
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
      and upload_status = 'PENDING'
      and created_at < now() - interval '30 minutes'
    for update;
  if not found then return false; end if;

  update public.document_cloud_clients
    set storage_used_bytes = greatest(0, storage_used_bytes - doc.size_bytes),
        updated_at = now()
    where id = doc.client_id;
  delete from public.document_cloud_documents where id = doc.id;
  insert into public.document_cloud_audit_events(client_id, event_type, document_id)
    values (doc.client_id, 'UPLOAD_RESERVATION_EXPIRED', doc.id);
  return true;
end;
$$;

revoke all on function public.document_cloud_expire_pending(uuid) from public, anon, authenticated;
grant execute on function public.document_cloud_expire_pending(uuid) to service_role;
