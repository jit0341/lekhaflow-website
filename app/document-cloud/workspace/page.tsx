"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

type Doc = { id: string; category: string; original_filename: string; content_type: string; size_bytes: number; uploaded_at: string; first_downloaded_at: string | null; delete_after: string | null };
const MAX = 25 * 1024 * 1024;
const fmt = (n: number) => n < 1024 ? `${n} B` : n < 1024 ** 2 ? `${(n / 1024).toFixed(1)} KB` : n < 1024 ** 3 ? `${(n / 1024 ** 2).toFixed(1)} MB` : `${(n / 1024 ** 3).toFixed(2)} GB`;
const categoryName = (c: string) => c === "PURCHASE" ? "Purchase" : c === "SALES" ? "Sales" : "Bank Statement";

export default function DocumentCloudWorkspace() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [used, setUsed] = useState(0);
  const [quota, setQuota] = useState(1073741824);
  const [category, setCategory] = useState("PURCHASE");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState("");
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    let response = await fetch("/api/document-cloud/documents", { cache: "no-store" });
    let data = await response.json();
    if (response.status === 401) {
      const refreshed = await fetch("/api/document-cloud/refresh", { method: "POST" });
      if (refreshed.ok) {
        response = await fetch("/api/document-cloud/documents", { cache: "no-store" });
        data = await response.json();
      }
    }
    if (!response.ok || !data.success) throw new Error(data.error || "Please sign in again.");
    setDocuments(data.documents || []);
    setUsed(Number(data.storageUsedBytes || 0));
    setQuota(Number(data.storageQuotaBytes || 1073741824));
  }, []);

  useEffect(() => { void load().catch(e => setError(e instanceof Error ? e.message : "Could not load documents.")); }, [load]);

  const percent = useMemo(() => Math.min(100, used / Math.max(1, quota) * 100), [used, quota]);

  async function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] || null);
    setError(""); setNotice("");
  }

  async function upload() {
    if (!file) { setError("Choose a file first."); return; }
    setBusy(true); setError(""); setNotice("");
    let pendingDocumentId: string | null = null;
    try {
      if (file.size > MAX) throw new Error("A single file cannot exceed 25 MB.");
      const reservationResponse = await fetch("/api/document-cloud/documents", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, sizeBytes: file.size, category }),
      });
      const reservation = await reservationResponse.json();
      if (!reservationResponse.ok || !reservation.success) throw new Error(reservation.error || "Could not reserve storage.");
      pendingDocumentId = reservation.documentId;
      setUploadProgress(0);
      setUploadStage("Uploading to secure storage");
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", reservation.uploadUrl);
        for (const [name, value] of Object.entries(reservation.uploadHeaders || {})) {
          xhr.setRequestHeader(name, String(value));
        }
        xhr.upload.onprogress = event => {
          if (event.lengthComputable) setUploadProgress(Math.min(99, Math.round(event.loaded / event.total * 100)));
        };
        xhr.timeout = 120000;
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
            return;
          }
          const responseText = (xhr.responseText || "").slice(0, 500);
          const codeMatch = responseText.match(/<Code>([^<]+)<\\/Code>/i);
          const messageMatch = responseText.match(/<Message>([^<]+)<\\/Message>/i);
          const providerError = [codeMatch?.[1], messageMatch?.[1]].filter(Boolean).join(": ");
          reject(new Error(
            providerError
              ? `Filebase rejected the upload: ${providerError} (HTTP ${xhr.status}).`
              : `Filebase rejected the upload (HTTP ${xhr.status}). ${responseText || "No response body returned."}`
          ));
        };
        xhr.onerror = () => reject(new Error(
          "Browser could not complete the Filebase PUT request. Check the Filebase bucket CORS policy, the signed Content-Type header, and the Network tab's OPTIONS/PUT response."
        ));
        xhr.ontimeout = () => reject(new Error("Upload timed out after 2 minutes. Please retry; the pending reservation will be cancelled."));
        xhr.onabort = () => reject(new Error("Upload was interrupted. Please retry."));
        xhr.send(file);
      });
      setUploadProgress(100);
      setUploadStage("Verifying file");
      const finalizedResponse = await fetch("/api/document-cloud/documents/finalize", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: reservation.documentId }),
      });
      const finalized = await finalizedResponse.json();
      if (!finalizedResponse.ok || !finalized.success) throw new Error(finalized.error || "File verification failed.");
      pendingDocumentId = null;
      setNotice("File uploaded and verified successfully.");
      setFile(null);
      setUploadProgress(0);
      setUploadStage("");
      const input = document.getElementById("document-cloud-file") as HTMLInputElement | null;
      if (input) input.value = "";
      await load();
    } catch (e) {
      if (pendingDocumentId) {
        const cancellation = await fetch("/api/document-cloud/documents/cancel", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: pendingDocumentId }),
        }).then(async response => ({ response, data: await response.json().catch(() => ({})) })).catch(() => null);
        if (cancellation?.data?.cleanupPending) {
          setNotice("Upload cancelled. Storage cleanup is queued and will retry automatically.");
        } else if (cancellation?.data?.quotaReleased) {
          setNotice("Upload cancelled and reserved storage released.");
        } else if (!cancellation?.response.ok) {
          setNotice("Upload failed. Its storage reservation could not be confirmed as released; automatic cleanup will retry.");
        }
      }
      setError(e instanceof Error ? e.message : "Upload failed.");
    }
    finally { setBusy(false); setUploadStage(""); }
  }

  async function download(doc: Doc) {
    setBusyId(doc.id); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/document-cloud/documents/${doc.id}`, { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Download could not start.");
      const fileResponse = await fetch(data.url);
      if (!fileResponse.ok) throw new Error("Could not retrieve the file from private storage.");
      const blob = await fileResponse.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl; anchor.download = data.filename || doc.original_filename;
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
      const confirmation = await fetch(`/api/document-cloud/documents/${doc.id}/confirm`, { method: "POST" });
      const confirmationData = await confirmation.json().catch(() => ({}));
      if (!confirmation.ok || !confirmationData.success) throw new Error("File downloaded, but retention timing could not be confirmed. Please refresh the list or contact support.");
      setNotice(`Download completed. Scheduled expiry: ${new Date(confirmationData.deleteAfter).toLocaleString()}.`);
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Download failed."); }
    finally { setBusyId(""); }
  }

  async function preview(doc: Doc) {
    const previewWindow = window.open("about:blank", "_blank");
    if (!previewWindow) { setError("Allow pop-ups to preview this document."); return; }
    previewWindow.opener = null;
    setBusyId(doc.id); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/document-cloud/documents/${doc.id}?mode=preview`, { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Preview could not start.");
      previewWindow.location.href = data.url;
    } catch (e) {
      previewWindow.close();
      setError(e instanceof Error ? e.message : "Preview failed.");
    } finally { setBusyId(""); }
  }

  async function remove(doc: Doc) {
    if (!window.confirm(`Permanently delete "${doc.original_filename}"?`)) return;
    setBusyId(doc.id); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/document-cloud/documents/${doc.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Delete failed.");
      setNotice("Document deleted. Its storage has been released.");
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Delete failed."); }
    finally { setBusyId(""); }
  }

  async function logout() {
    await fetch("/api/document-cloud/logout", { method: "POST" });
    window.location.href = "/document-cloud";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.2em] text-teal-700">LekhaFlow · Secure Client Area</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">My Document Cloud</h1><p className="mt-2 text-sm text-slate-500">Purchase · Sales · Bank Statements</p></div><button onClick={() => void logout()} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold hover:bg-white">Sign out</button></div>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-black">Storage usage</h2><p className="text-sm font-bold tabular-nums">{fmt(used)} / {fmt(quota)}</p></div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${percent}%` }} /></div>
          <p className="mt-2 text-xs text-slate-500">{Math.max(0, quota - used) > 0 ? `${fmt(Math.max(0, quota - used))} available` : "Storage limit reached"} · Shared across all document categories</p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-black">Upload a document</h2>
          <p className="mt-1 text-sm text-slate-500">PDF, JPG, PNG or WEBP · Maximum 25 MB per file</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end">
            <label className="block"><span className="mb-2 block text-xs font-black uppercase text-slate-500">Category</span><select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm"><option value="PURCHASE">Purchase</option><option value="SALES">Sales</option><option value="BANK_STATEMENT">Bank Statement</option></select></label>
            <label className="block"><span className="mb-2 block text-xs font-black uppercase text-slate-500">Select file</span><input id="document-cloud-file" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={chooseFile} className="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-bold" /></label>
            <button onClick={() => void upload()} disabled={busy || !file} className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-black text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Uploading…" : "Upload securely"}</button>
          </div>
          {file && <p className="mt-3 text-xs text-slate-500">{file.name} · {fmt(file.size)}</p>}
          {busy && <div className="mt-4" aria-live="polite"><div className="flex items-center justify-between text-xs font-semibold text-slate-600"><span>{uploadStage || "Preparing upload"}</span><span>{uploadProgress}%</span></div><div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${uploadProgress}%` }} /></div><p className="mt-2 text-xs text-slate-500">Keep this page open until verification finishes.</p></div>}
        </section>

        {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="mt-5 rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900">{notice}</p>}

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-black">Your documents</h2><button onClick={() => void load().catch(e => setError(String(e)))} className="text-sm font-bold text-teal-700 hover:underline">Refresh list</button></div>
          {documents.length === 0 ? <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-bold">No documents uploaded yet</p><p className="mt-1 text-sm text-slate-500">Your uploaded files will appear here.</p></div> : <div className="mt-4 space-y-3">{documents.map(doc => <article key={doc.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-black text-teal-800">{categoryName(doc.category)}</span><span className="text-xs text-slate-400">{fmt(Number(doc.size_bytes))}</span></div><h3 className="mt-2 break-all text-sm font-black">{doc.original_filename}</h3><p className="mt-1 text-xs text-slate-500">Uploaded {new Date(doc.uploaded_at).toLocaleString()}</p><p className="mt-1 text-xs text-amber-700">{doc.delete_after ? `Scheduled expiry: ${new Date(doc.delete_after).toLocaleString()}` : "Expires within 14 days; after first successful download, 3-day retention applies"}</p></div><div className="flex gap-2"><button disabled={busyId === doc.id} onClick={() => void preview(doc)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-50">Preview</button><button disabled={busyId === doc.id} onClick={() => void download(doc)} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">{busyId === doc.id ? "Working…" : "Download"}</button><button disabled={busyId === doc.id} onClick={() => void remove(doc)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 disabled:opacity-50">Delete</button></div></article>)}</div>}
        </section>
        <p className="mt-8 text-xs leading-5 text-slate-500">Your files are stored privately. Keep your own backup: files expire automatically under the Document Cloud retention policy.</p>
      </div>
    </main>
  );
}
