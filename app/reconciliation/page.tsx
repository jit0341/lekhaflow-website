import type { Metadata } from "next";
import ProductMarketingPage from "@/components/product/ProductMarketingPage";

export const metadata: Metadata = {
  title: "GST Reconciliation | LekhaFlow",
  description:
    "Explore the LekhaFlow reconciliation workflow for GST and accounting data.",
};

export default function ReconciliationPage() {
  return <ProductMarketingPage product="reconciliation" />;
}
