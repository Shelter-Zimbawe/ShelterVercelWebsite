"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const KUMBI_WHATSAPP = `https://wa.me/263719551234?text=${encodeURIComponent(
  "How are you Shelter , I wanted to inquire about KUMBI — I own a property and would like to learn more about transforming it into a passive income asset."
)}`;

const pillars = [
  {
    title: "Passive Rental Income",
    body: "Your property works for you around the clock. High-density units generate consistent monthly rental returns without requiring your daily involvement.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Property Value Activation",
    body: "Dormant land or a stalled structure is a missed opportunity. KUMBI unlocks the hidden equity in your asset through intelligent, modern densification.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 7 22 7 22 13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Retirement-Focused Investment",
    body: "Build a legacy income stream designed to sustain your retirement. KUMBI turns a single property into a long-term wealth engine for you and your family.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export default function KumbiSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="kumbi" ref={ref} className="relative overflow-hidden bg-[#03091f] py-20 sm:py-28">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2652a2 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #00aeed 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#00aeed]/30 bg-[#00aeed]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00aeed]">
            New Product — KUMBI
          </span>
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl" style={{ textShadow: "0 0 60px rgba(0,174,237,0.25)" }}>
            KUMBI
          </h2>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.25em] text-white/40">
            Highly Densified Property
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
            Your property could be worth <span className="font-semibold text-white">far more than you think.</span> Underutilised land and unfinished structures can be transformed into income-generating assets built for long-term wealth.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 0 0 1px rgba(0,174,237,0.15), 0 30px 80px rgba(0,0,0,0.5)" }}
          >
            <img
              src="/kumbi-hero.jpeg"
              alt="KUMBI Property Transformation"
              className="h-[380px] w-full object-cover sm:h-[440px]"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement;
                if (parent) {
                  parent.style.background = "linear-gradient(135deg,#0d1f4a 0%,#1a3d8a 50%,#00aeed22 100%)";
                  parent.style.minHeight = "380px";
                  parent.style.display = "flex";
                  parent.style.alignItems = "center";
                  parent.style.justifyContent = "center";
                  parent.innerHTML = `<span style="font-size:5rem;font-weight:900;color:white;letter-spacing:-0.02em;opacity:0.15">KUMBI</span>`;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03091f]/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex gap-3">
                {["Passive Income", "High Density", "Long-Term Wealth"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — pillars + CTA */}
          <div className="space-y-5">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 rounded-2xl border border-white/8 p-5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-[#00aeed]" style={{ background: "rgba(0,174,237,0.12)" }}>
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{p.body}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col gap-3 pt-2 sm:flex-row"
            >
              <a
                href={KUMBI_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)", boxShadow: "0 8px 30px rgba(0,174,237,0.3)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Inquire on WhatsApp
              </a>
              <Link
                href="/kumbi"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/15 py-3.5 text-sm font-bold text-white/80 transition hover:border-white/30 hover:text-white"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                Learn More About KUMBI
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
