"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Crown, Building2 } from "lucide-react";

const lekhaflowPlans = [
  {
    name: "LekhaFlow Lite Standard",
    price: "₹15,000",
    link: "https://rzp.io/rzp/SkJTqlgi",
    description: "For small firms starting with automation.",
    icon: <Zap className="text-teal-500" />,
    features: ["500 Invoices/yr", "Standard Support", "Excel Export", "Email Support"],
    highlight: false,
  },
  {
    name: "LekhaFlow Lite Premium",
    price: "₹25,000",
    link: "https://rzp.io/rzp/oVwLNxHT",
    description: "Best for growing accounting practices.",
    icon: <Zap className="text-blue-600" fill="currentColor" />,
    features: ["Unlimited Invoices", "Tally Integration", "Priority Email", "Multi-client support"],
    highlight: false,
  },
  {
    name: "LekhaFlow ERP9 Standard",
    price: "₹25,000",
    link: "https://rzp.io/rzp/AZMi622y",
    description: "Specifically tuned for Tally.ERP 9 users.",
    icon: <Building2 className="text-slate-600" />,
    features: ["ERP 9 Optimized", "Voucher Automation", "Bank Statement Parser", "Direct XML Export"],
    highlight: false,
  },
  {
    name: "LekhaFlow Busy Edition",
    price: "₹25,000",
    link: "https://rzp.io/rzp/AEKdBeqc",
    description: "Full automation for Busy Accounting Software.",
    icon: <Zap className="text-orange-500" />,
    features: ["Busy Data Export", "GST Compliant", "Inventory Mapping", "Dedicated Support"],
    highlight: false,
  },
  {
    name: "LekhaFlow Premium",
    price: "₹35,000",
    link: "https://rzp.io/rzp/9HGERapH",
    description: "Our flagship AI engine for Tally Prime.",
    icon: <Crown className="text-yellow-500" />,
    features: ["Full AI Hybrid Model", "Unlimited Tally Import", "White-glove Onboarding", "24/7 Priority Support"],
    highlight: true,
  },
  {
    name: "LekhaFlow Gold",
    price: "₹35,000",
    link: "https://rzp.io/rzp/sQg7LGy",
    description: "Maximum efficiency for large CA firms.",
    icon: <Crown className="text-blue-600" />,
    features: ["Everything in Premium", "Multi-user Access", "Custom Template Creation", "API Access"],
    highlight: true,
  },
  {
    name: "LekhaFlow ERP9 Premium",
    price: "₹35,000",
    link: "https://rzp.io/rzp/BLZgsWB",
    description: "Enterprise level automation for ERP 9.",
    icon: <Building2 className="text-teal-600" />,
    features: ["Advanced ERP 9 Sync", "Consolidated Reports", "Auto-Master Creation", "Audit Trails"],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4"
          >
            Invest in <span className="text-blue-600">Efficiency</span>
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the specific LekhaFlow edition that fits your firm's workflow. 
            Direct Tally import with 100% AI accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lekhaflowPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 border ${
                plan.highlight 
                ? 'bg-white border-blue-600 shadow-2xl ring-2 ring-blue-600/20' 
                : 'bg-white border-slate-200 shadow-sm hover:shadow-xl'
              } transition-all duration-300 flex flex-col justify-between`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    {plan.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-slate-900">{plan.price}</p>
                    <p className="text-sm text-slate-500 italic">/year + GST</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 px-6 rounded-2xl text-center font-bold text-sm transition-all ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                Purchase Edition
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-blue-600 rounded-[3rem] p-12 text-center text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
            <h2 className="text-3xl font-bold mb-4 relative z-10">Need a custom enterprise solution?</h2>
            <p className="mb-8 opacity-90 relative z-10">If you have more than 10 users, contact our team for a custom quote.</p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors relative z-10">
                Contact Sales
            </button>
        </div>
      </div>
    </div>
  );
}