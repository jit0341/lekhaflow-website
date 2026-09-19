import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authenticated =
    cookieStore.get("lekhaflow_admin_auth")?.value === "1";

  if (!authenticated) {
    redirect("/admin-login");
  }

  return <>{children}</>;
}