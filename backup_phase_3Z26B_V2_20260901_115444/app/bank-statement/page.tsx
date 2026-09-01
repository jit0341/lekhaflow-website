import type { Metadata } from "next";
import ProductMarketingPage from "@/components/product/ProductMarketingPage";

export const metadata: Metadata = {
  title: "Bank Statement Intelligence | LekhaFlow",
  description:
    "Import bank statements, resolve transactions with SwiftAssign and send accounting entries to Tally.",
};

export default function BankStatementPage() {
  return <ProductMarketingPage product="bank" />;
}
