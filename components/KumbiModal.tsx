"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KUMBI_WHATSAPP = `https://wa.me/263719551234?text=${encodeURIComponent(
  "How are you Shelter , I wanted to inquire about KUMBI — I own a property and would like to learn more about transforming it into a passive income asset."
)}`;

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
    label: "Passive Rental Income",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 7 22 7 22 13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Property Value Activation",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: "Retirement-Focused Investment",
  },
];

function track(event: string) {
  fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event }) }).catch(() => {});
}

export default function KumbiModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      track("kumbi_modal_view");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
          style={{ backgroundColor: "rgba(5, 15, 40, 0.80)", backdropFilter: "blur(8px)" }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-h-[95dvh] overflow-y-auto rounded-t-3xl bg-[#03091f] sm:max-w-lg sm:rounded-3xl"
            style={{ boxShadow: "0 0 0 1px rgba(0,174,237,0.18), 0 40px 100px rgba(0,174,237,0.22)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow orbs */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #2652a2 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute -right-12 top-10 h-40 w-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #00aeed 0%, transparent 70%)" }} />

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* Image hero — drop kumbi-hero.jpg into /public to activate */}
            <div className="relative h-44 w-full overflow-hidden sm:h-52">
              <img
                src="/kumbi-hero.jpeg"
                alt="KUMBI Property"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Dark overlay for text legibility */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(3,9,31,0.35) 0%, rgba(3,9,31,0.75) 100%)" }} />

              {/* KUMBI badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="mb-1 rounded-full border border-[#00aeed]/40 bg-[#00aeed]/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00aeed]">
                  New Product Launch
                </span>
                <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg sm:text-6xl" style={{ textShadow: "0 0 40px rgba(0,174,237,0.6)" }}>
                  KUMBI
                </h1>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                  Highly Densified Property
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="relative px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              {/* Tagline */}
              <div className="mb-5 text-center">
                <p className="text-lg font-extrabold leading-tight text-white sm:text-xl">
                  Turn Your Property Into a{" "}
                  <span style={{ background: "linear-gradient(90deg, #00aeed, #29ddda)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Passive Income Asset
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Your underutilised land or unfinished structure could be generating wealth right now. KUMBI transforms dormant properties into income-producing, high-density assets built for long-term value.
                </p>
              </div>

              {/* Features */}
              <div className="mb-5 grid grid-cols-3 gap-2">
                {features.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 p-3 text-center"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl text-[#00aeed]" style={{ background: "rgba(0,174,237,0.12)" }}>
                      {f.icon}
                    </div>
                    <span className="text-[10px] font-semibold leading-tight text-white/75">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={KUMBI_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("kumbi_inquiry")}
                className="flex w-full items-center justify-center gap-3 rounded-2xl py-3.5 text-base font-bold text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #2652a2 0%, #00aeed 60%, #29ddda 100%)", boxShadow: "0 8px 30px rgba(0,174,237,0.35)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Inquire About KUMBI on WhatsApp
              </a>

              <a
                href="https://www.tiktok.com/@shelterzimbabwe?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:text-white"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
                </svg>
                Follow{" "}
                <span style={{ background: "linear-gradient(90deg,#00aeed,#29ddda)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  100 Days to KUMBI
                </span>{" "}
                on TikTok
              </a>

              <p className="mt-3 text-center text-xs text-white/30">
                Tap anywhere outside to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
