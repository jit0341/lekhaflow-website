"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Client = {
  id: string; business_name: string; contact_name: string; email: string;
  account_status: string; is_test_account: boolean; storage_quota_bytes: number;
  storage_used_bytes: number; approval_note: string | null; created_at: string;
};

const fmt = (bytes: number) => {
  if (!Number.isFinite(Number(bytes))) return "—";
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
};

export default function DocumentCloudAdminPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/document-cloud/admin/clients", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Could not load accounts.");
      setClients(data.clients || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load accounts.");
    } finally { setBusy(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const visible = useMemo(() => filter === "ALL" ? clients : filter === "TEST" ? clients.filter(c => c.is_test_account) : clients.filter(c => c.account_status === filter), [clients, filter]);

  async function update(client: Client, accountStatus: string, isTestAccount = client.is_test_account) {
    setSaving(client.id); setError(""); setNotice("");
    try {
      const response = await fetch("/api/document-cloud/admin/clients", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id, accountStatus, isTestAccount, approvalNote: client.approval_note }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Update failed.");
      setNotice(`${client.business_name}: account updated to ${accountStatus}.`);
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Update failed."); }
    finally { setSaving(null); }
  }

  const counts = {
    all: clients.length,
    pending: clients.filter(c => ["EMAIL_PENDING", "APPROVAL_PENDING"].includes(c.account_status)).length,
    active: clients.filter(c => c.account_status === "ACTIVE").length,
    test: clients.filter(c => c.is_test_account).length,
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-28 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.24em] text-teal-400">LekhaFlow · Internal</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Document Cloud Admin</h1><p className="mt-2 text-sm text-slate-400">Client approvals, account status and test-account controls</p></div>
          <button onClick={() => void load()} disabled={busy} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold hover:bg-slate-800 disabled:opacity-50">{busy ? "Refreshing…" : "Refresh"}</button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[["All clients", counts.all], ["Pending review", counts.pending], ["Active clients", counts.active], ["TEST accounts", counts.test]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-xs font-bold text-slate-400">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}
        </div>

        {error && <p role="alert" className="mt-5 rounded-xl border border-red-900 bg-red-950/60 p-4 text-sm text-red-200">{error}</p>}
        {notice && <p role="status" className="mt-5 rounded-xl border border-teal-900 bg-teal-950/60 p-4 text-sm text-teal-200">{notice}</p>}

        <div className="mt-8 flex flex-wrap gap-2">
          {["ALL", "APPROVAL_PENDING", "ACTIVE", "SUSPENDED", "REJECTED", "TEST"].map(value => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-3 py-2 text-xs font-black ${filter === value ? "bg-teal-500 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"}`}>{value === "ALL" ? "All" : value.replaceAll("_", " ")}</button>)}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {busy ? <p className="p-8 text-sm text-slate-400">Loading client accounts…</p> : visible.length === 0 ? <p className="p-8 text-sm text-slate-400">No client accounts in this view.</p> : <div className="divide-y divide-slate-800">
            {visible.map(client => <section key={client.id} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-black">{client.business_name}</h2>{client.is_test_account && <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-[10px] font-black text-amber-300">TEST</span>}<span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-300">{client.account_status.replaceAll("_", " ")}</span></div><p className="mt-1 text-sm text-slate-300">{client.contact_name} · {client.email}</p><p className="mt-1 text-xs text-slate-500">Registered {new Date(client.created_at).toLocaleString()}</p></div>
                <div className="min-w-40 text-right"><p className="text-sm font-black">{fmt(client.storage_used_bytes)} / {fmt(client.storage_quota_bytes)}</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-teal-500" style={{ width: `${Math.min(100, Number(client.storage_used_bytes) / Math.max(1, Number(client.storage_quota_bytes)) * 100)}%` }} /></div></div>
              </div>
              {client.approval_note && <p className="mt-3 rounded-lg bg-slate-950 p-3 text-xs text-slate-400">Note: {client.approval_note}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {client.account_status !== "ACTIVE" && <button disabled={saving === client.id} onClick={() => void update(client, "ACTIVE")} className="rounded-lg bg-teal-500 px-3 py-2 text-xs font-black text-slate-950 disabled:opacity-50">Approve / Activate</button>}
                {client.account_status !== "SUSPENDED" && <button disabled={saving === client.id} onClick={() => void update(client, "SUSPENDED")} className="rounded-lg border border-amber-700 px-3 py-2 text-xs font-bold text-amber-300 disabled:opacity-50">Suspend</button>}
                {client.account_status !== "REJECTED" && client.account_status !== "ACTIVE" && <button disabled={saving === client.id} onClick={() => void update(client, "REJECTED")} className="rounded-lg border border-red-900 px-3 py-2 text-xs font-bold text-red-300 disabled:opacity-50">Reject</button>}
                {client.account_status === "SUSPENDED" && <button disabled={saving === client.id} onClick={() => void update(client, "ACTIVE")} className="rounded-lg border border-teal-800 px-3 py-2 text-xs font-bold text-teal-300 disabled:opacity-50">Reactivate</button>}
                <button disabled={saving === client.id} onClick={() => void update(client, client.account_status, !client.is_test_account)} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 disabled:opacity-50">{client.is_test_account ? "Remove TEST label" : "Mark as TEST"}</button>
                {saving === client.id && <span className="self-center text-xs text-slate-400">Saving…</span>}
              </div>
            </section>)}
          </div>}
        </div>
        <p className="mt-5 text-xs leading-5 text-slate-500">This page is protected by the server-side Document Cloud administrator allowlist. Test accounts use normal authentication and remain clearly labelled.</p>
      </div>
    </main>
  );
}
