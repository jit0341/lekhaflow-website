-- Explicit Data API table privileges for the server-only Supabase secret key.
-- RLS remains enabled. The service_role key is used only after server-side
-- administrator authorization; never expose it to browser code.
grant select, insert, update, delete
  on table public.document_cloud_clients,
            public.document_cloud_documents,
            public.document_cloud_audit_events,
            public.document_cloud_upload_rate_events
  to service_role;
