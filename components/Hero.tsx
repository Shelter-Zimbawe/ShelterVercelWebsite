"use client";

import { ArrowRight, Home, Award, TrendingUp, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "./BookingForm";

const ETOSHA_URL = "https://etoshagms.co.zw";

const slides = ["shelter", "etosha", "etosha3d"] as const;
type Slide = (typeof slides)[number];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function Hero() {
  const [current, setCurrent] = useState<Slide>("shelter");
  const [direction, setDirection] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((slide: Slide) => {
    setDirection(slides.indexOf(slide) > slides.indexOf(current) ? 1 : -1);
    setCurrent(slide);
  }, [current]);

  const next = useCallback(() => {
    const idx = slides.indexOf(current);
    setDirection(1);
    setCurrent(slides[(idx + 1) % slides.length]);
  }, [current]);

  const prev = useCallback(() => {
    const idx = slides.indexOf(current);
    setDirection(-1);
    setCurrent(slides[(idx - 1 + slides.length) % slides.length]);
  }, [current]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next, paused]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "640px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >

      <AnimatePresence custom={direction} mode="sync">
        {current === "shelter" && (
          <motion.div
            key="shelter"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0"
          >
            {/* ── SHELTER ZIMBABWE SLIDE ── */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,#ffffff 0%,#f9fcff 54%,#eef8ff 74%,#dff6fb 100%)" }} />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src="/house.png"
                alt="Shelter Zimbabwe home"
                className="absolute left-0 top-0 h-full w-full object-cover md:w-[78%]"
                style={{
                  objectPosition: "left center",
                  filter: "brightness(0.98) contrast(1.04)",
                  WebkitMaskImage: "linear-gradient(to right,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 56%,rgba(0,0,0,0.92) 64%,rgba(0,0,0,0.55) 74%,rgba(0,0,0,0.16) 84%,rgba(0,0,0,0) 92%)",
                  maskImage: "linear-gradient(to right,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 56%,rgba(0,0,0,0.92) 64%,rgba(0,0,0,0.55) 74%,rgba(0,0,0,0.16) 84%,rgba(0,0,0,0) 92%)",
                }}
              />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 42%,rgba(255,255,255,0.10) 52%,rgba(255,255,255,0.28) 62%,rgba(255,255,255,0.50) 72%,rgba(255,255,255,0.22) 82%,rgba(255,255,255,0) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.96) 0%,rgba(255,255,255,0.35) 10%,rgba(255,255,255,0) 18%,rgba(255,255,255,0) 82%,rgba(255,255,255,0.35) 90%,rgba(255,255,255,0.96) 100%)" }} />
            <div className="absolute inset-y-0 right-0 hidden w-[42%] pointer-events-none md:block" style={{ background: "radial-gradient(circle at 88% 48%,rgba(0,174,237,0.34) 0%,rgba(41,221,218,0.18) 24%,rgba(38,82,162,0.08) 42%,rgba(255,255,255,0) 72%)" }} />
            <div className="absolute inset-0 pointer-events-none bg-white/50 md:hidden" />

            <div className="relative z-10 flex min-h-[640px] w-full items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-[560px] pb-14 pt-28 sm:pt-32 md:ml-auto md:pt-36">
                  <h1 className="mb-6 text-4xl font-bold leading-[0.98] text-slate-900 sm:text-5xl md:text-6xl">
                    <span className="block">Land for today.</span>
                    <span className="block" style={{ color: "#2652a2" }}>A home for tomorrow</span>
                  </h1>
                  <p className="mb-9 max-w-[520px] text-base leading-relaxed text-slate-600 sm:text-lg">
                    We don&apos;t just build homes. We cultivate legacies that span generations.
                  </p>
                  <div className="mb-5 flex w-full max-w-md items-center gap-2 rounded-2xl border bg-white/82 px-4 py-2.5 backdrop-blur-sm shadow-sm sm:w-fit sm:px-5" style={{ borderColor: "rgba(38,82,162,0.12)" }}>
                    <Home className="w-4 h-4" style={{ color: "#2652a2" }} />
                    <span className="text-sm font-medium leading-snug text-slate-700">Trusted Housing Stand Experts for 40+ years</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button
                      className="group rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl sm:px-8 sm:text-lg"
                      style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <span className="flex items-center gap-2">View Available Stands <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                    </button>
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="rounded-2xl border-2 bg-white/88 px-6 py-4 text-base font-semibold shadow-sm transition-all duration-200 hover:bg-white sm:px-8 sm:text-lg"
                      style={{ color: "#2652a2", borderColor: "rgba(38,82,162,0.26)" }}
                    >
                      Book a Site Visit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {[
                      { number: "5,000+", label: "Housing Stands Delivered", icon: Home },
                      { number: "98%", label: "Client Satisfaction", icon: TrendingUp },
                      { number: "5,000+", label: "Happy Families", icon: Building2 },
                      { number: "24/7", label: "Support Available", icon: Award },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="rounded-3xl border bg-white/80 p-5 backdrop-blur-md shadow-sm" style={{ borderColor: "rgba(41,221,218,0.16)" }}>
                          <Icon className="w-7 h-7 mb-3" style={{ color: "#2652a2" }} />
                          <div className="mb-1 text-2xl font-bold md:text-3xl" style={{ color: "#2652a2" }}>{stat.number}</div>
                          <div className="text-sm text-slate-600 font-medium leading-snug">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {current === "etosha" && (
          <motion.div
            key="etosha"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg,#ffffff 0%,#f9fcff 54%,#eef8ff 74%,#dff6fb 100%)" }}
          >
            {/* Blue glow right */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] md:block" style={{ background: "radial-gradient(circle at 88% 48%,rgba(0,174,237,0.34) 0%,rgba(41,221,218,0.18) 24%,rgba(38,82,162,0.08) 42%,rgba(255,255,255,0) 72%)" }} />
            {/* Top/bottom fade */}
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.96) 0%,rgba(255,255,255,0.35) 10%,rgba(255,255,255,0) 18%,rgba(255,255,255,0) 82%,rgba(255,255,255,0.35) 90%,rgba(255,255,255,0.96) 100%)" }} />

            <div className="relative z-10 flex min-h-[640px] w-full items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 pb-14 pt-28 sm:pt-32 md:grid-cols-2 md:pt-36">

                  {/* ── LEFT: Creative photo collage ── */}
                  <div className="relative mx-auto h-[340px] w-full max-w-[420px] md:h-[420px]">

                    {/* Card 3 — back, top-left, rotated */}
                    <div className="absolute left-0 top-4 h-[200px] w-[200px] overflow-hidden rounded-2xl border-2 border-white shadow-xl md:h-[240px] md:w-[240px]"
                      style={{ transform: "rotate(-5deg)", boxShadow: "0 20px 50px rgba(38,82,162,0.18)" }}>
                      <img src="/etosha/photo-3.jpeg" alt="Etosha memorial" className="h-full w-full object-cover"
                        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.background = "linear-gradient(135deg,#eef8ff,#dff6fb)"; e.currentTarget.style.display = "none"; }} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(38,82,162,0.08),transparent)" }} />
                    </div>

                    {/* Card 1 — front centre, large */}
                    <div className="absolute bottom-0 left-1/2 h-[260px] w-[210px] -translate-x-1/3 overflow-hidden rounded-2xl border-2 border-white shadow-2xl md:h-[310px] md:w-[250px]"
                      style={{ transform: "translateX(-33%) rotate(1.5deg)", boxShadow: "0 25px 60px rgba(38,82,162,0.22), 0 0 0 3px rgba(255,255,255,0.9)" }}>
                      <img src="/etosha/photo-1.jpeg" alt="Etosha memorial park" className="h-full w-full object-cover"
                        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.background = "linear-gradient(135deg,#eef8ff,#c8eeff)"; e.currentTarget.style.display = "none"; }} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(38,82,162,0.15),transparent 60%)" }} />
                    </div>

                    {/* Card 2 — right, overlapping */}
                    <div className="absolute right-0 top-1/2 h-[180px] w-[170px] -translate-y-1/4 overflow-hidden rounded-2xl border-2 border-white shadow-xl md:h-[210px] md:w-[200px]"
                      style={{ transform: "translateY(-25%) rotate(4deg)", boxShadow: "0 15px 40px rgba(38,82,162,0.2)" }}>
                      <img src="/etosha/photo-2.jpeg" alt="Etosha estate" className="h-full w-full object-cover"
                        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.background = "linear-gradient(135deg,#dff6fb,#eef8ff)"; e.currentTarget.style.display = "none"; }} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(0,174,237,0.1),transparent)" }} />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-2 left-6 z-10 flex items-center gap-2 rounded-full border border-white bg-white px-3 py-1.5 shadow-lg">
                      <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "linear-gradient(135deg,#2652a2,#00aeed)" }} />
                      <span className="text-xs font-bold text-slate-700">Etosha Memorial Parks</span>
                    </div>
                  </div>

                  {/* ── RIGHT: Content ── */}
                  <div className="text-left">
                    {/* Small logo tile */}
                    <div className="mb-4">
                      <img src="/etosha-logo.png" alt="Etosha" className="h-10 w-auto object-contain" />
                    </div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Memorial Parks &amp; Estate Services</p>

                    <p className="mb-7 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
                      Where life's final chapter is honoured with <span className="font-semibold text-slate-800">dignity</span>, beauty, and enduring grace. Spaces crafted for remembrance, peace, and family legacy.
                    </p>

                    {/* Pills */}
                    <div className="mb-8 flex flex-wrap gap-2">
                      {["Memorial Parks", "Family Estate Plots", "Dignified Services"].map((tag) => (
                        <span key={tag} className="rounded-full border px-4 py-1.5 text-sm font-semibold text-slate-600" style={{ borderColor: "rgba(38,82,162,0.2)", background: "rgba(38,82,162,0.05)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={ETOSHA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-2xl px-7 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                      style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)" }}
                    >
                      Visit the Etosha Website
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        )}

        {current === "etosha3d" && (
          <motion.div
            key="etosha3d"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0"
          >
            {/* Full-bleed 3D render background */}
            <img
              src="/etosha/3d-view.jpeg"
              alt="Etosha 3D masterplan"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) parent.style.background = "linear-gradient(135deg,#0d1f4a 0%,#1a3d8a 50%,#00aeed22 100%)";
              }}
            />

            {/* Layered overlays for depth + readability */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(3,9,31,0.78) 0%,rgba(3,9,31,0.45) 45%,rgba(3,9,31,0.15) 100%)" }} />

            {/* Small Etosha logo tile */}
            <div className="absolute right-6 top-24 z-20 sm:right-10">
              <img src="/etosha-logo.png" alt="Etosha" className="h-10 w-auto object-contain opacity-90" />
            </div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(3,9,31,0.6) 0%,rgba(3,9,31,0) 25%,rgba(3,9,31,0) 70%,rgba(3,9,31,0.7) 100%)" }} />
            {/* Blue glow accent */}
            <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-20" style={{ background: "radial-gradient(circle,#00aeed 0%,transparent 65%)" }} />

            <div className="relative z-10 flex min-h-[640px] w-full items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-[580px] pb-14 pt-28 sm:pt-32 md:pt-36">

                  {/* Badge */}
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]" style={{ borderColor: "rgba(0,174,237,0.4)", color: "#00aeed", background: "rgba(0,174,237,0.1)" }}>
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Etosha — 3D Masterplan View
                  </div>

                  {/* Headline */}
                  <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
                    See the Vision<br />
                    <span style={{ background: "linear-gradient(90deg,#00aeed,#29ddda)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      Before You Invest
                    </span>
                  </h1>

                  <p className="mb-8 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
                    Explore the full Etosha memorial park layout in stunning 3D detail — every plot, pathway, and green space designed with care and precision.
                  </p>

                  {/* Stats row */}
                  <div className="mb-8 flex flex-wrap gap-5">
                    {[
                      { value: "500+", label: "Landscaped Plots" },
                      { value: "24/7", label: "Peaceful Access" },
                      { value: "100%", label: "Secured Estate" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="text-2xl font-extrabold text-white sm:text-3xl" style={{ background: "linear-gradient(90deg,#fff,#29ddda)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
                        <div className="text-xs font-semibold text-white/45">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href={ETOSHA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03]"
                      style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)", boxShadow: "0 12px 40px rgba(0,174,237,0.3)" }}
                    >
                      Explore Etosha
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="inline-flex items-center justify-center rounded-2xl border-2 px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
                      style={{ borderColor: "rgba(255,255,255,0.3)" }}
                    >
                      Book a Site Visit
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LEFT ARROW ── */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/35 sm:left-5 sm:h-13 sm:w-13"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* ── RIGHT ARROW ── */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/35 sm:right-5 sm:h-13 sm:w-13"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* ── DOTS ── */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((s) => (
          <button
            key={s}
            onClick={() => goTo(s)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: current === s ? "28px" : "8px",
              background: current === s ? "#2652a2" : "rgba(38,82,162,0.25)",
            }}
            aria-label={s}
          />
        ))}
      </div>

      {/* ── BOOKING MODAL ── */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setShowBookingForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <BookingForm onClose={() => setShowBookingForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
