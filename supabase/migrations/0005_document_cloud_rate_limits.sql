-- Server-side upload rate limits. Limits are per business/client, not per browser session.
create table if not exists public.document_cloud_upload_rate_events (
  id bigint generated always as identity primary key,
  client_id uuid not null references public.document_cloud_clients(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists document_cloud_upload_rate_client_time_idx
  on public.document_cloud_upload_rate_events(client_id, created_at desc);
alter table public.document_cloud_upload_rate_events enable row level security;
revoke all on public.document_cloud_upload_rate_events from anon, authenticated;

create or replace function public.document_cloud_enforce_upload_rate()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent_hour integer;
  recent_day integer;
begin
  select count(*) into recent_hour
    from public.document_cloud_upload_rate_events
    where client_id = new.client_id and created_at > now() - interval '1 hour';
  select count(*) into recent_day
    from public.document_cloud_upload_rate_events
    where client_id = new.client_id and created_at > now() - interval '24 hours';

  if recent_hour >= 20 then
    raise exception 'Upload rate limit reached: maximum 20 files per hour';
  end if;
  if recent_day >= 100 then
    raise exception 'Upload rate limit reached: maximum 100 files per 24 hours';
  end if;

  insert into public.document_cloud_upload_rate_events(client_id) values (new.client_id);
  return new;
end;
$$;

drop trigger if exists document_cloud_upload_rate_limit on public.document_cloud_documents;
create trigger document_cloud_upload_rate_limit
  before insert on public.document_cloud_documents
  for each row when (new.upload_status = 'PENDING')
  execute function public.document_cloud_enforce_upload_rate();

revoke all on function public.document_cloud_enforce_upload_rate() from public, anon, authenticated;
