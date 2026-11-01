import { redirect } from "next/navigation";

export default function SupportRedirect(): never {
  redirect("/contact");
}
