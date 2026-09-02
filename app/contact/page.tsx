"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,

  PlayCircle,
  Sparkles,
} from "lucide-react";

const linkedinUrl = "https://www.linkedin.com/company/144811463/";
const whatsappUrl = "https://wa.me/918770808695";
const emailAddress = "Nexoriva.systems@gmail.com";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
    help: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/save_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          company: form.company,
          message: form.message,
          help: form.help,
          source: "contact_page",
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("Thanks. Your enquiry has been received. We will contact you shortly.");
      setForm({
        name: "",
        company: "",
        email: "",
        mobile: "",
        help: "",
        message: "",
      });
    } catch {
      setStatus("We could not submit the form right now. Please use WhatsApp or email below.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.18),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              <Sparkles size={14} />
              LekhaFlow Support & Enquiries
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              Contact <span className="text-teal-400">LekhaFlow</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Have a question, need a demo, or want to see how LekhaFlow can fit
              your accounting workflow? Tell us what you need and we will help
              you choose the right next step.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href="#enquiry"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
          >
            <PlayCircle className="mb-5 text-teal-600" size={28} />
            <h2 className="text-xl font-black">Request a Demo</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              See how LekhaFlow can fit your real accounting workflow.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-teal-700">
              Request demo <ArrowRight size={16} />
            </span>
          </Link>

          <Link
            href="/downloads"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
          >
            <ArrowRight className="mb-5 text-blue-600" size={28} />
            <h2 className="text-xl font-black">Start Free Trial</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Download the trial and experience the workflow yourself.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
              Go to Downloads <ArrowRight size={16} />
            </span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
          >
            <MessageCircle className="mb-5 text-green-600" size={28} />
            <h2 className="text-xl font-black">WhatsApp Support</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Talk directly with the LekhaFlow support team.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-green-700">
              Chat on WhatsApp <ArrowRight size={16} />
            </span>
          </a>

          <a
            href={`mailto:${emailAddress}`}
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
          >
            <Mail className="mb-5 text-amber-600" size={28} />
            <h2 className="text-xl font-black">Email Us</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Send your requirement or technical question by email.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-700">
              Send email <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section id="enquiry" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* FORM */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-600">
                Secure Intake
              </p>
              <h2 className="mt-2 text-3xl font-black">Tell us what you need</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Share a few details and our team can understand your requirement
                before getting in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  required
                  onChange={(value) => updateField("name", value)}
                />
                <Field
                  label="Business / Firm Name"
                  value={form.company}
                  onChange={(value) => updateField("company", value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  required
                  onChange={(value) => updateField("email", value)}
                />
                <Field
                  label="Phone / WhatsApp"
                  value={form.mobile}
                  onChange={(value) => updateField("mobile", value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-800">
                  What do you need help with?
                </label>
                <select
                  value={form.help}
                  onChange={(e) => updateField("help", e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                >
                  <option value="">Select an option</option>
                  <option>Request a Demo</option>
                  <option>Start Free Trial</option>
                  <option>Purchase Automation</option>
                  <option>Sales Split</option>
                  <option>Bank Statement</option>
                  <option>Tally Sync</option>
                  <option>GSTR-2B Reconciliation</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-800">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={6}
                  placeholder="Tell us about your accounting workflow or question..."
                  className="w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
              </div>

              {status && (
                <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800">
                  {status}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Enquiry"}
                {!submitting && <ArrowRight size={17} />}
              </button>
            </form>
          </div>

          {/* DIRECT CONTACT */}
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">
                Direct Contact
              </p>
              <h2 className="mt-3 text-3xl font-black">Prefer to talk directly?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Choose the channel that is most convenient for you. We can discuss
                your workflow, demo requirements, trial setup, or support query.
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 font-bold transition hover:bg-white/10"
                >
                  <MessageCircle size={20} className="text-teal-300" />
                  +91 87708 08695
                </a>

                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 font-bold transition hover:bg-white/10"
                >
                  <Mail size={20} className="text-blue-300" />
                  {emailAddress}
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 font-bold transition hover:bg-white/10"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-sky-500 text-[11px] font-black text-white">in</span>
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-black">What happens next?</h3>
              <div className="mt-6 space-y-5">
                {[
                  "We review your requirement.",
                  "We contact you through your preferred channel.",
                  "We understand your accounting workflow.",
                  "We show the relevant LekhaFlow workflow or trial path.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-teal-600" size={19} />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-8">
              <p className="text-sm font-bold leading-7 text-blue-900">
                LekhaFlow is built for practical accounting automation: Purchase,
                Sales Split, Bank Statement, Tally Sync, and reconciliation
                workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-800">
        {label}
        {required && <span className="ml-1 text-teal-600">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
      />
    </div>
  );
}

