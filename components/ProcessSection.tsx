"use client";

import Image from "next/image";
import {
  Upload,
  Cpu,
  FileCode2,
  Database,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";

type Props = {
  isHindi: boolean;
};

const processSteps = [
  {
    no: "01",
    titleEn: "Open LekhaFlow",
    titleHi: "LekhaFlow खोलें",
    descEn: "Launch the application",
    descHi: "सॉफ्टवेयर शुरू करें",
    icon: CheckCircle2,
    image: "/images/process/step1.png",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    no: "02",
    titleEn: "Select Invoice Folder",
    titleHi: "Invoice Folder चुनें",
    descEn: "PDF / Image / Excel",
    descHi: "PDF / Image / Excel",
    icon: Upload,
    image: "/images/process/step2.png",
    color: "from-teal-500/20 to-teal-600/10",
  },
  {
    no: "03",
    titleEn: "AI Reads Invoice",
    titleHi: "AI Invoice पढ़ता है",
    descEn: "Automatic Data Extraction",
    descHi: "Automatic Data Extraction",
    icon: Cpu,
    image: "/images/process/step3.png",
    color: "from-violet-500/20 to-violet-600/10",
  },
  {
    no: "04",
    titleEn: "Generate XML",
    titleHi: "XML तैयार करें",
    descEn: "Ready for Import",
    descHi: "Import के लिए तैयार",
    icon: FileCode2,
    image: "/images/process/step4.png",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    no: "05",
    titleEn: "Import into Tally",
    titleHi: "Tally में Import करें",
    descEn: "One Click Import",
    descHi: "One Click Import",
    icon: Database,
    image: "/images/process/step5.png",
    color: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    no: "06",
    titleEn: "Voucher Created",
    titleHi: "Voucher तैयार",
    descEn: "Accounting Completed",
    descHi: "Accounting Completed",
    icon: CheckCircle2,
    image: "/images/process/step6.png",
    color: "from-orange-500/20 to-orange-600/10",
  },
];

export default function ProcessSection({ isHindi }: Props) {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white py-24 border-y border-slate-200"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex rounded-full border border-teal-300 bg-teal-50 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-[3px] text-teal-800">
              {isHindi ? "प्रोसेस" : "How It Works"}
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-black uppercase italic text-slate-900">
            {isHindi ? "केवल 6 आसान स्टेप" : "Only 6 Simple Steps"}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            {isHindi
              ? "Invoice से Tally तक पूरा Accounting Process केवल कुछ मिनटों में पूरा हो जाता है।"
              : "Convert Invoice into Tally XML automatically using AI in just a few simple steps."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.no}
                className="group relative rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-400 hover:shadow-lg"
              >
                <div className="absolute left-6 top-6 z-10 text-5xl font-black text-slate-200">
                  {step.no}
                </div>

                <div className="relative overflow-hidden rounded-t-3xl bg-slate-50">
                  <Image
                    src={step.image}
                    alt={step.titleEn}
                    width={700}
                    height={420}
                    className="w-full h-[260px] object-contain bg-slate-50 p-2 transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-30`}
                  />
                </div>

                <div className="p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {isHindi ? step.titleHi : step.titleEn}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-700">
                    {isHindi ? step.descHi : step.descEn}
                  </p>
                </div>

                {index !== processSteps.length - 1 && (
                  <div className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 xl:block">
                    <ArrowDown size={26} className="text-teal-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
