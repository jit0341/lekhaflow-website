import { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ | LekhaFlow",
  description: "Frequently asked questions about LekhaFlow invoice automation, pricing, licensing, free trial, refund policy, and Tally integration.",
  keywords: ["LekhaFlow FAQ", "Tally automation questions", "Invoice software India FAQ", "GST software support"],
};

export default function FAQPage() {
  return <FAQClient />;
}