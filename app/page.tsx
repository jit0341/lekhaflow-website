'use client'
export default function LekhaFlowHomepage() {
  const products = [
    {
      name: 'LekhaFlow Lite',
      price5k: '₹8,000 / Year',
      price10k: '₹15,000 / Year',
      desc: 'Excel Summary + AI Invoice Analysis + Universal Template Mapper'
    },
    {
      name: 'LekhaFlow Standard',
      price5k: '₹15,000 / Year',
      price10k: '₹25,000 / Year',
      desc: 'Tally XML Automation + Master Creation + GST Smart Processing'
    },
    {
      name: 'LekhaFlow Premium',
      price5k: '₹18,000 / Year',
      price10k: '₹35,000 / Year',
      desc: 'Full Automation + GSTR-2B + Auto Split + Priority Support'
    },
    {
      name: 'LekhaFlow BUSY',
      price5k: '₹15,000 / Year',
      price10k: '₹25,000 / Year',
      desc: 'Dedicated BUSY Software Automation Environment'
    }
  ]

  const features = [
    'AI-Powered Invoice OCR',
    'Tally XML Automation',
    'BUSY Import Automation',
    'Bank Statement Automation',
    'GSTR-2B Reconciliation',
    'Machine ID License Security',
    'Concurrent Multi-Thread Processing',
    'Auto Master Creation',
    'Universal Template Mapper',
    'Smart Cache (No API Wastage)',
    'One Click Installer',
    'Live Usage Monitoring'
  ]

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-3xl font-black tracking-wide text-yellow-400">
              Lekha<span className="text-white">Flow</span>
            </h1>
            <p className="text-xs text-slate-400">
              AI Accounting Automation by Nexoriva Systems
            </p>
          </div>

          <div className="hidden gap-8 text-sm md:flex">
            <a href="#features" className="hover:text-yellow-400">Features</a>
            <a href="#products" className="hover:text-yellow-400">Products</a>
            <a href="#pricing" className="hover:text-yellow-400">Pricing</a>
            <a href="#contact" className="hover:text-yellow-400">Contact</a>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl border border-yellow-400 px-4 py-2 text-sm font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black">
              Client Login
            </button>
            <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:scale-105 transition-transform">
              Download Trial
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.15),transparent_40%)]"></div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300">
              MSME Registered AI Automation Platform
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              AI Accounting
              <span className="block text-yellow-400">Automation</span>
              for Tally & BUSY
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              LekhaFlow transforms invoice processing, Tally entry,
              BUSY imports, GST reconciliation, and bank statement
              automation into a one-click AI workflow.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-yellow-400 px-7 py-4 text-lg font-black text-black hover:scale-105 transition-transform">
                Request Live Demo
              </button>

              <button className="rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-lg font-semibold hover:bg-white/10">
                Watch Product Video
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
              <div>✔ AI OCR Engine</div>
              <div>✔ Tally XML</div>
              <div>✔ BUSY Automation</div>
              <div>✔ GSTR-2B</div>
            </div>
          </div>

          <div>
            <div className="rounded-[32px] border border-yellow-400/20 bg-gradient-to-br from-[#132238] to-[#09131f] p-8 shadow-2xl shadow-yellow-500/10">
              <div className="rounded-3xl bg-black/30 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Live AI Processing</p>
                    <h3 className="text-2xl font-bold text-yellow-400">
                      LekhaFlow Dashboard
                    </h3>
                  </div>

                  <div className="rounded-xl bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
                    ACTIVE
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Invoices Processed</span>
                      <span className="font-bold text-yellow-400">12,845</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="flex justify-between text-sm">
                      <span>AI Cost Saved via Cache</span>
                      <span className="font-bold text-green-400">₹8,420</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="flex justify-between text-sm">
                      <span>Concurrent Processing</span>
                      <span className="font-bold text-cyan-400">20 Threads</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="flex justify-between text-sm">
                      <span>License Security</span>
                      <span className="font-bold text-pink-400">Machine Locked</span>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-black text-black hover:opacity-90">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Powerful Features
            </p>
            <h2 className="mt-4 text-5xl font-black">
              Built For Real Accountants
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:border-yellow-400/40 hover:bg-white/10 transition-all"
              >
                <div className="mb-4 text-4xl">⚡</div>
                <h3 className="text-xl font-bold">{feature}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Enterprise-grade automation designed for Indian accounting workflows.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-[#0b1727] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Product Plans
            </p>
            <h2 className="mt-4 text-5xl font-black">
              Choose Your Automation Engine
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 hover:border-yellow-400/40 hover:scale-[1.02] transition-all"
              >
                <div className="mb-6">
                  <h3 className="text-3xl font-black text-yellow-400">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {product.desc}
                  </p>
                </div>

                <div className="space-y-4 rounded-2xl bg-black/30 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      5K Invoice Plan
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      {product.price5k}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      10K Invoice Plan
                    </p>
                    <p className="mt-1 text-2xl font-black text-yellow-400">
                      {product.price10k}
                    </p>
                  </div>
                </div>

                <button className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-black text-black hover:opacity-90">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Live Demonstration
            </p>

            <h2 className="mt-5 text-5xl font-black leading-tight">
              From Invoice PDF
              <span className="block text-yellow-400">To Tally Entry</span>
              in Seconds
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-300">
              Process purchase invoices, sales invoices, bank statements,
              GST reconciliation, and BUSY imports with AI-powered automation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-green-500 px-7 py-4 text-lg font-black text-white">
                WhatsApp Demo
              </button>

              <button className="rounded-2xl border border-white/20 px-7 py-4 text-lg font-bold">
                Download Installer
              </button>
            </div>
          </div>

          <div>
            <div className="aspect-video rounded-[32px] border border-yellow-400/20 bg-gradient-to-br from-[#132238] to-black p-6 shadow-2xl shadow-yellow-500/10">
              <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/20 text-center">
                <div>
                  <div className="text-7xl">▶</div>
                  <h3 className="mt-6 text-3xl font-black">
                    Product Demo Video
                  </h3>
                  <p className="mt-4 text-slate-400">
                    Upload your official demo video here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT SECTION */}
      <section id="pricing" className="bg-[#0b1727] px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[40px] border border-yellow-400/20 bg-gradient-to-br from-[#132238] to-[#09131f] p-12 text-center shadow-2xl shadow-yellow-500/10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Secure Subscription
          </p>

          <h2 className="mt-6 text-5xl font-black">
            Razorpay Payment Integration Ready
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Annual subscription plans with invoice-based licensing,
            cloud updates, WhatsApp support, and Machine ID protection.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <button className="rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-black text-black hover:scale-105 transition-transform">
              Pay With Razorpay
            </button>

            <button className="rounded-2xl border border-white/20 bg-white/5 px-8 py-5 text-lg font-bold hover:bg-white/10">
              Generate Quotation
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-white/5 p-12 backdrop-blur">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                Nexoriva Systems
              </p>

              <h2 className="mt-5 text-5xl font-black">
                Let’s Build Your
                <span className="block text-yellow-400">Accounting Automation</span>
              </h2>

              <div className="mt-10 space-y-5 text-lg text-slate-300">
                <p>📍 Surajpur, Chhattisgarh, India</p>
                <p>📞 +91-8770808695</p>
                <p>✉ Nexoriva.systems@gmail.com</p>
                <p>🌐 lekhaflow.in</p>
              </div>
            </div>

            <div className="rounded-3xl bg-black/20 p-8">
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-yellow-400"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-yellow-400"
                />

                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-yellow-400"
                />

                <textarea
                  rows={5}
                  placeholder="Tell us about your accounting workflow"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-yellow-400"
                ></textarea>

                <button className="w-full rounded-2xl bg-yellow-400 py-4 text-lg font-black text-black hover:opacity-90">
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-slate-500">
        <p>
          © 2026 LekhaFlow • AI Accounting Automation • Developed by Nexoriva Systems
        </p>
        <p className="mt-3">
          MSME Registered | Built in Surajpur, Chhattisgarh
        </p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/918770808695"
        className="fixed bottom-6 right-6 rounded-full bg-green-500 p-5 text-2xl shadow-2xl shadow-green-500/30 hover:scale-110 transition-transform"
      >
        💬
      </a>
    </div>
  )
}
