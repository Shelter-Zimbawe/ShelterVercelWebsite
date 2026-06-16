"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ETOSHA_URL = "https://etoshagms.co.zw"; // ← replace with the real Etosha website URL

const pillars = [
  {
    title: "Memorial Parks",
    body: "Beautifully landscaped grounds designed as spaces of peace, reflection, and lasting tribute.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22V12" strokeLinecap="round" />
        <path d="M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z" />
      </svg>
    ),
  },
  {
    title: "Family Estate Plots",
    body: "Dedicated family burial estates — reserved, dignified, and preserved for generations to come.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Dignified Services",
    body: "From preparation to ceremony, Etosha provides compassionate end-to-end memorial services.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function EtoshaSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Wave separator — transitions from white to dark */}
      <div className="relative z-10 h-16 bg-white">
        <svg
          viewBox="0 0 1440 64"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z" fill="#0a0f0a" />
        </svg>
      </div>

      {/* Main dark body */}
      <div className="relative bg-[#0a0f0a]">
        {/* Parallax background texture */}
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
        >
          <div className="h-full w-full bg-[repeating-linear-gradient(45deg,#c9a84c_0px,#c9a84c_1px,transparent_1px,transparent_24px)]" />
        </motion.div>

        {/* Gold glow orbs */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-10" style={{ background: "radial-gradient(circle,#c9a84c 0%,transparent 70%)" }} />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] translate-x-1/2 rounded-full opacity-8" style={{ background: "radial-gradient(circle,#5a7a4a 0%,transparent 70%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col items-center text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em]" style={{ borderColor: "rgba(201,168,76,0.3)", color: "#c9a84c", background: "rgba(201,168,76,0.07)" }}>
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              A Shelter Zimbabwe Division
            </span>

            {/* ETOSHA wordmark */}
            <h2
              className="text-[4rem] font-black uppercase leading-none tracking-[0.15em] text-white sm:text-[5.5rem] lg:text-[7rem]"
              style={{ textShadow: "0 0 80px rgba(201,168,76,0.18)" }}
            >
              <span style={{ background: "linear-gradient(135deg,#e8d5a3 0%,#c9a84c 40%,#a07830 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ETOSHA
              </span>
            </h2>

            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/30">
              Memorial Parks &amp; Estate Services
            </p>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Where life's final chapter is honoured with dignity, beauty, and enduring grace.
              Etosha provides Zimbabwe's most distinguished memorial parks and family estate plots.
            </p>
          </motion.div>

          {/* Divider line with leaf */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 flex items-center gap-4"
          >
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.4))" }} />
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#c9a84c" strokeWidth="1.4" style={{ opacity: 0.7 }}>
              <path d="M12 22V12" strokeLinecap="round" />
              <path d="M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z" />
            </svg>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left,transparent,rgba(201,168,76,0.4))" }} />
          </motion.div>

          {/* Pillars */}
          <div className="mb-14 grid gap-5 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.1 }}
                className="rounded-2xl border p-6 text-center"
                style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)" }}
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "rgba(201,168,76,0.12)", color: "#c9a84c" }}>
                  {p.icon}
                </div>
                <h3 className="mb-2 font-bold text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/45">{p.body}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-center"
          >
            <a
              href={ETOSHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03]"
              style={{
                borderColor: "rgba(201,168,76,0.5)",
                background: "linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.06))",
                boxShadow: "0 0 40px rgba(201,168,76,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 60px rgba(201,168,76,0.2)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.08)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
              }}
            >
              <span style={{ background: "linear-gradient(90deg,#e8d5a3,#c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Visit the Etosha Website
              </span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="#c9a84c" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="mt-3 text-xs text-white/25">Opens the dedicated Etosha memorial services website</p>
          </motion.div>

        </div>

        {/* Bottom wave back to footer */}
        <div className="relative h-12">
          <svg
            viewBox="0 0 1440 48"
            className="absolute bottom-0 left-0 w-full"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path d="M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z" fill="#0a0f0a" />
          </svg>
          <div className="h-full bg-slate-900" />
        </div>
      </div>
    </section>
  );
}
