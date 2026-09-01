import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loginAdmin(formData: FormData) {
  "use server";

  const entered = String(formData.get("password") || "");
  const expected = process.env.LEKHA_ADMIN_PASSWORD || "";

  if (!expected || entered !== expected) {
    redirect("/admin-login?error=1");
  }

  const cookieStore = await cookies();

  cookieStore.set("lekhaflow_admin_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const hasError = params.error === "1";

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <section className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-400">
            LekhaFlow Private Area
          </p>

          <h1 className="mt-3 text-3xl font-black">Admin Login</h1>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Private access for the LekhaFlow QR payment generator.
          </p>

          {hasError && (
            <div className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              Incorrect password or admin password is not configured.
            </div>
          )}

          <form action={loginAdmin} className="mt-7 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-300">
                Password
              </span>

              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter admin password"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-teal-500 px-5 py-3.5 text-sm font-black text-slate-950 hover:bg-teal-400"
            >
              SIGN IN TO ADMIN
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            QR generator access is restricted to the LekhaFlow administrator.
          </p>
        </section>
      </div>
    </main>
  );
}