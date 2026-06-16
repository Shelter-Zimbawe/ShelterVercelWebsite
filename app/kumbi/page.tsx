"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const KUMBI_WHATSAPP = `https://wa.me/263719551234?text=${encodeURIComponent(
  "How are you Shelter , I wanted to inquire about KUMBI — I own a property and would like to learn more about transforming it into a passive income asset."
)}`;

const pillars = [
  {
    number: "01",
    title: "Passive Rental Income",
    body: "Your property works for you around the clock. KUMBI designs high-density residential units that generate consistent monthly rental returns — no daily involvement required. Transform your idle asset into a reliable income stream.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Property Value Activation",
    body: "Dormant land and stalled structures are missed opportunities. Through intelligent densification and modern construction, KUMBI unlocks the hidden equity in your asset — multiplying its value and market appeal dramatically.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 7 22 7 22 13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Retirement-Focused Investment",
    body: "Build a legacy that sustains your retirement and beyond. KUMBI turns a single property into a long-term wealth engine — creating a generational income stream for you and your family without requiring constant capital reinvestment.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const eligibleProperties = [
  { label: "Dormant land", desc: "Vacant plots sitting unused in any location" },
  { label: "Incomplete structures", desc: "Partially built homes or stalled development projects" },
  { label: "Aging properties", desc: "Old buildings that are underperforming their potential" },
  { label: "Underutilised stands", desc: "Stands with space to densify beyond current use" },
];

const steps = [
  { step: "01", title: "Get in Touch", body: "Reach out to us on WhatsApp or visit our offices at Shelter House, 95 Five Avenue, Harare. Tell us about your property." },
  { step: "02", title: "Property Assessment", body: "Our team conducts a thorough assessment of your property's current state, location, and densification potential." },
  { step: "03", title: "KUMBI Blueprint", body: "We design a tailored KUMBI plan — layout, unit count, projected rental income, and full financial projections." },
  { step: "04", title: "Transform & Earn", body: "We build. You earn. Your transformed property starts generating passive rental income on a sustainable schedule." },
];

export default function KumbiPage() {
  return (
    <div className="min-h-screen bg-[#03091f]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Background image */}
        <img
          src="/kumbi-hero.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(3,9,31,0.72) 0%, rgba(3,9,31,0.55) 50%, rgba(3,9,31,0.82) 100%)" }} />
        {/* Blue glow orbs on top of image */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[600px] w-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2652a2 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute -right-24 top-20 h-[400px] w-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #00aeed 0%, transparent 65%)" }} />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-block rounded-full border border-[#00aeed]/30 bg-[#00aeed]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00aeed]">
              New Product Launch
            </span>
            <h1 className="text-7xl font-black tracking-tight text-white sm:text-8xl lg:text-9xl" style={{ textShadow: "0 0 80px rgba(0,174,237,0.3)" }}>
              KUMBI
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.3em] text-white/40">
              Highly Densified Property
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/65 sm:text-2xl">
              Turn your property into a{" "}
              <span style={{ background: "linear-gradient(90deg,#00aeed,#29ddda)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                passive income asset.
              </span>
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white">
              Your property could be worth more than you think. With KUMBI, underutilized land and unfinished developments are transformed into income-generating assets designed for long-term value creation and sustainable wealth.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={KUMBI_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-bold text-white transition hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)", boxShadow: "0 12px 40px rgba(0,174,237,0.35)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Inquire on WhatsApp
              </a>
              <a
                href="https://www.tiktok.com/@shelterzimbabwe?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-base font-semibold text-white/75 transition hover:border-white/30 hover:text-white"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
                </svg>
                Follow 100 Days to KUMBI
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center text-3xl font-extrabold text-white sm:text-4xl">
            Why KUMBI Works
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-white/8 p-7"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-[#00aeed]" style={{ background: "rgba(0,174,237,0.12)" }}>
                    {p.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    {p.number}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who qualifies */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/8 p-8 sm:p-12" style={{ background: "rgba(255,255,255,0.03)" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="mb-3 text-center text-3xl font-extrabold text-white sm:text-4xl">
                Does Your Property Qualify?
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-center text-base text-white/50">
                Whether you own dormant land, an incomplete structure, or an aging property — KUMBI provides a smarter pathway to activate your investment potential.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {eligibleProperties.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 p-5"
                  style={{ background: "rgba(0,174,237,0.05)" }}
                >
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg,#2652a2,#00aeed)" }}>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="mt-0.5 text-sm text-white/45">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center text-3xl font-extrabold text-white sm:text-4xl">
            How It Works
          </motion.h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative rounded-3xl border border-white/8 p-7"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="mb-3 block text-4xl font-black" style={{ background: "linear-gradient(135deg,#2652a2,#00aeed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.step}</span>
                <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">KUMBI in Action</h2>
            <p className="mt-3 text-base text-white/45">A glimpse of what your property could become.</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 0 0 1px rgba(0,174,237,0.1)" }}
              >
                <img
                  src={`/kumbi/photo-${n}.jpeg`}
                  alt={`KUMBI property ${n}`}
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.parentElement!.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03091f]/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Activate Your Property?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/50">
              Talk to our team today. Tell us about your property and we'll show you exactly what KUMBI can do for it.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={KUMBI_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-bold text-white transition hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)", boxShadow: "0 12px 40px rgba(0,174,237,0.3)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get Started on WhatsApp
              </a>
              <Link
                href="/"
                className="flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-base font-semibold text-white/70 transition hover:text-white"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
