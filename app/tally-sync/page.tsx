import type { Metadata } from "next";
import ProductMarketingPage from "@/components/product/ProductMarketingPage";

export const metadata: Metadata = {
  title: "Tally Sync | LekhaFlow",
  description:
    "Detect Tally companies, select the working company, fetch masters and sync accounting results.",
};

export default function TallySyncPage() {
  return <ProductMarketingPage product="tally" />;
}
