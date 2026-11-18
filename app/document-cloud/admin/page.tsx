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
  const [authenticated, setAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [recoveryBusy, setRecoveryBusy] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState("");
  const [health, setHealth] = useState<{ success: boolean; checks: Record<string, { ok: boolean; detail?: string }> } | null>(null);

  const load = useCallback(async () => {
    setBusy(true); setError("");
    try {
      let response = await fetch("/api/document-cloud/admin/clients", { cache: "no-store" });
      let data = await response.json();
      if (response.status === 401 || response.status === 403) {
        const refreshed = await fetch("/api/document-cloud/refresh", { method: "POST" });
        if (refreshed.ok) {
          response = await fetch("/api/document-cloud/admin/clients", { cache: "no-store" });
          data = await response.json();
        }
      }
      if (!response.ok || !data.success) throw new Error(data.error || "Could not load accounts.");
      setClients(data.clients || []);
      setAuthenticated(true);
    } catch (e) {
      setAuthenticated(false);
      setError(e instanceof Error ? e.message : "Could not load accounts.");
    } finally { setBusy(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const visible = useMemo(() => filter === "ALL" ? clients : filter === "TEST" ? clients.filter(c => c.is_test_account) : clients.filter(c => c.account_status === filter), [clients, filter]);

  async function adminLogin() {
    setSaving("admin-login"); setError(""); setNotice("");
    try {
      const response = await fetch("/api/document-cloud/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Administrator sign-in failed.");
      setAdminPassword("");
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Administrator sign-in failed."); }
    finally { setSaving(null); }
  }

  async function sendPasswordRecovery() {
    setRecoveryBusy(true); setError(""); setRecoveryNotice("");
    try {
      const response = await fetch("/api/document-cloud/admin/recover", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Could not send recovery email.");
      setRecoveryNotice(data.message || "Password recovery email sent. Open the newest email only.");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not send recovery email."); }
    finally { setRecoveryBusy(false); }
  }

  async function checkHealth() {
    setSaving("health"); setError(""); setNotice("");
    try {
      const response = await fetch("/api/document-cloud/admin/health", { cache: "no-store" });
      const data = await response.json();
      setHealth(data);
      if (!response.ok || !data.success) throw new Error("One or more services could not be reached. See the diagnostics below.");
    } catch (e) { setError(e instanceof Error ? e.message : "Service health check failed."); }
    finally { setSaving(null); }
  }

  async function adminLogout() {
    await fetch("/api/document-cloud/logout", { method: "POST" });
    setAuthenticated(false); setClients([]); setHealth(null);
  }

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
          <div className="flex flex-wrap gap-2"><button onClick={() => void load()} disabled={busy} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold hover:bg-slate-800 disabled:opacity-50">{busy ? "Refreshing…" : "Refresh"}</button>{authenticated && <><button onClick={() => void checkHealth()} disabled={saving === "health"} className="rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-black text-slate-950 disabled:opacity-50">{saving === "health" ? "Checking…" : "Check Services"}</button><button onClick={() => void adminLogout()} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold hover:bg-slate-800">Sign out</button></>}</div>
        </div>

        {error && <p role="alert" className="mt-5 max-w-2xl rounded-xl border border-red-900 bg-red-950/60 p-4 text-sm text-red-200">{error}</p>}
        {health && <section className="mt-5 grid gap-3 sm:grid-cols-2">{Object.entries(health.checks || {}).map(([name, check]) => <div key={name} className="rounded-xl border border-slate-800 bg-slate-900 p-4"><div className="flex items-center justify-between"><p className="text-sm font-black capitalize">{name}</p><span className={check.ok ? "text-xs font-black text-teal-300" : "text-xs font-black text-red-300"}>{check.ok ? "CONNECTED" : "NOT CONNECTED"}</span></div><p className="mt-2 break-words text-xs leading-5 text-slate-400">{check.detail || "No details returned."}</p></div>)}</section>}
        {notice && <p role="status" className="mt-5 max-w-2xl rounded-xl border border-teal-900 bg-teal-950/60 p-4 text-sm text-teal-200">{notice}</p>}

        {!authenticated && <section className="mt-8 max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-black">Administrator sign in</h2>
          <p className="mt-1 text-sm text-slate-400">Use a verified Supabase account listed in DOCUMENT_CLOUD_ADMIN_EMAILS.</p>
          <label className="mt-4 block text-xs font-bold text-slate-400">ADMIN EMAIL</label>
          <input type="email" autoComplete="username" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white" />
          <label className="mt-4 block text-xs font-bold text-slate-400">PASSWORD</label>
          <input type="password" autoComplete="current-password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white" />
          <button onClick={() => void adminLogin()} disabled={saving === "admin-login" || !adminEmail || !adminPassword} className="mt-4 w-full rounded-xl bg-teal-500 px-4 py-3 text-sm font-black text-slate-950 disabled:opacity-50">{saving === "admin-login" ? "Signing in…" : "Sign in securely"}</button>
          <button type="button" onClick={() => void sendPasswordRecovery()} disabled={recoveryBusy || !adminEmail} className="mt-3 w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-50">{recoveryBusy ? "Sending recovery email…" : "Forgot password? Send reset link"}</button>
          {recoveryNotice && <p role="status" className="mt-3 rounded-xl border border-teal-900 bg-teal-950/50 p-3 text-sm text-teal-200">{recoveryNotice}</p>}
        </section>}
        {authenticated && <>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[["All clients", counts.all], ["Pending review", counts.pending], ["Active clients", counts.active], ["TEST accounts", counts.test]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-xs font-bold text-slate-400">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}
        </div>

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
        </>}
      </div>
    </main>
  );
}
