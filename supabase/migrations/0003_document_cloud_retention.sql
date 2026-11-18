-- Retention defaults and limits for Document Cloud.
create or replace function public.document_cloud_set_expiry()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.delete_after is null then
    new.delete_after := coalesce(new.uploaded_at, now()) + interval '14 days';
  end if;
  return new;
end;
$$;

drop trigger if exists document_cloud_document_expiry on public.document_cloud_documents;
create trigger document_cloud_document_expiry
  before insert on public.document_cloud_documents
  for each row execute function public.document_cloud_set_expiry();

revoke all on function public.document_cloud_set_expiry() from public, anon, authenticated;

-- Keep first-download retention within the absolute 14-day maximum.
create or replace function public.document_cloud_confirm_first_download(p_document_id uuid)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  doc public.document_cloud_documents%rowtype;
  first_time timestamptz;
  expiry timestamptz;
begin
  select * into doc from public.document_cloud_documents
    where id = p_document_id and upload_status = 'READY' for update;
  if not found then raise exception 'Document not found'; end if;

  if doc.first_downloaded_at is not null then
    return doc.delete_after;
  end if;

  first_time := now();
  expiry := least(first_time + interval '3 days', doc.uploaded_at + interval '14 days');
  update public.document_cloud_documents
    set first_downloaded_at = first_time, delete_after = expiry
    where id = p_document_id;
  return expiry;
end;
$$;

revoke all on function public.document_cloud_confirm_first_download(uuid) from public, anon, authenticated;
grant execute on function public.document_cloud_confirm_first_download(uuid) to service_role;
