"use client";

import { ArrowRight, Home, Award, TrendingUp, Building2, ChevronLeft, ChevronRight, Smartphone, CreditCard, CalendarCheck, Search, Download } from "lucide-react";
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
      className={`relative w-full overflow-hidden ${
        current === "etosha3d" ? "min-h-[100svh] md:min-h-[640px]" : "min-h-[640px]"
      }`}
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
            className="absolute inset-0 overflow-y-auto md:overflow-hidden"
          >
            {/* Light gradient background — matches slide 1 */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,#ffffff 0%,#f9fcff 54%,#eef8ff 74%,#dff6fb 100%)" }} />

            {/* Soft blue glow — right side */}
            <div className="absolute inset-y-0 right-0 hidden w-[42%] pointer-events-none md:block" style={{ background: "radial-gradient(circle at 82% 50%,rgba(0,174,237,0.18) 0%,rgba(41,221,218,0.10) 28%,rgba(38,82,162,0.05) 48%,rgba(255,255,255,0) 72%)" }} />
            {/* Soft blue glow — left behind phone */}
            <div className="absolute inset-y-0 left-0 hidden w-[36%] pointer-events-none md:block" style={{ background: "radial-gradient(circle at 30% 55%,rgba(0,174,237,0.10) 0%,rgba(41,221,218,0.06) 30%,rgba(255,255,255,0) 60%)" }} />
            {/* Top/bottom white fade */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.96) 0%,rgba(255,255,255,0.35) 10%,rgba(255,255,255,0) 18%,rgba(255,255,255,0) 82%,rgba(255,255,255,0.35) 90%,rgba(255,255,255,0.96) 100%)" }} />
            {/* Mobile overlay */}
            <div className="absolute inset-0 pointer-events-none bg-white/40 md:hidden" />

            <div className="relative z-10 flex min-h-full w-full items-start md:min-h-[640px] md:items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-5 pb-16 pt-24 sm:gap-6 sm:pb-14 sm:pt-28 md:grid-cols-[auto_1fr_auto] md:gap-10 md:pt-36 lg:gap-14">

                  {/* ── LEFT: Phone showcase ── */}
                  <div className="relative order-2 mx-auto flex max-w-[220px] items-center justify-center sm:max-w-none md:order-1 md:mx-0 md:min-w-[280px]">

                    {/* Decorative ring */}
                    <div className="absolute hidden h-[320px] w-[320px] rounded-full border opacity-[0.07] sm:block sm:h-[400px] sm:w-[400px]" style={{ borderColor: "#2652a2", borderWidth: "2px" }} />
                    <div className="absolute hidden h-[370px] w-[370px] rounded-full border opacity-[0.04] sm:block sm:h-[460px] sm:w-[460px]" style={{ borderColor: "#00aeed", borderWidth: "1.5px" }} />

                    {/* Soft gradient glow */}
                    <div className="absolute h-[200px] w-[140px] rounded-[40px] opacity-[0.15] blur-3xl sm:h-[360px] sm:w-[260px]" style={{ background: "linear-gradient(160deg, #00aeed 0%, #2652a2 60%, #29ddda 100%)" }} />

                    {/* Main image in a styled frame */}
                    <motion.div
                      className="relative z-10 overflow-hidden rounded-[22px] border-[3px] border-white shadow-2xl sm:rounded-[32px]"
                      style={{ boxShadow: "0 25px 60px rgba(38,82,162,0.20), 0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(38,82,162,0.06)" }}
                      initial={{ y: 20, opacity: 0, scale: 0.97 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    >
                      <img
                        src="/etoshamobile.png"
                        alt="Etosha Mobile App"
                        className="h-[210px] w-auto sm:h-[340px] md:h-[400px]"
                      />
                      {/* Subtle gradient overlay on bottom edge */}
                      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(38,82,162,0.06), transparent)" }} />
                    </motion.div>

                    {/* Floating badge — top right */}
                    <motion.div
                      className="absolute -right-2 top-6 z-20 hidden items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 shadow-lg sm:flex sm:-right-5 sm:top-12"
                      style={{ borderColor: "rgba(41,221,218,0.2)" }}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg,#2652a2,#00aeed)" }}>
                        <CreditCard className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">Easy Pay</span>
                    </motion.div>

                    {/* Floating badge — bottom left */}
                    <motion.div
                      className="absolute -left-2 bottom-10 z-20 hidden items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 shadow-lg sm:flex sm:-left-4 sm:bottom-16"
                      style={{ borderColor: "rgba(41,221,218,0.2)" }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg,#00aeed,#29ddda)" }}>
                        <CalendarCheck className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">Book Now</span>
                    </motion.div>

                    {/* Live dot badge — top left */}
                    <motion.div
                      className="absolute left-1 top-3 z-20 flex items-center gap-1.5 rounded-full border bg-white/95 px-2.5 py-1 shadow-md backdrop-blur-sm sm:left-0 sm:top-6"
                      style={{ borderColor: "rgba(38,82,162,0.1)" }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
                    >
                      <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "linear-gradient(135deg,#29ddda,#00aeed)" }} />
                      <span className="text-[10px] font-semibold text-slate-500">Live</span>
                    </motion.div>

                  </div>

                  {/* ── CENTER: Content ── */}
                  <div className="order-1 text-center md:order-2 md:text-left">
                    {/* Badge */}
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm sm:mb-5 sm:px-4 sm:text-xs sm:tracking-[0.25em]" style={{ borderColor: "rgba(38,82,162,0.12)", color: "#2652a2" }}>
                      <Smartphone className="h-3.5 w-3.5" style={{ color: "#00aeed" }} />
                      Introducing Etosha Mobile
                    </div>

                    {/* Headline */}
                    <h1 className="mb-3 text-[1.85rem] font-bold leading-[1.05] text-slate-900 sm:mb-4 sm:text-4xl md:text-5xl">
                      <span className="block">Etosha at your</span>
                      <span className="block" style={{ color: "#2652a2" }}>Fingertips</span>
                    </h1>

                    <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-slate-600 sm:mb-7 sm:text-lg md:mx-0">
                      Pay plans, start new ones, browse services, and book. All via the{" "}
                      <span className="font-semibold text-slate-800">Etosha Mobile App.</span>
                      <br className="hidden sm:block" />
                      <span className="mt-1 block text-sm text-slate-400 sm:mt-0 sm:inline sm:text-base"> From the comfort of your home, everything you need is one tap away.</span>
                    </p>

                    {/* Mobile download CTA — shown before features on small screens */}
                    <a
                      href="https://online.etoshagms.co.zw/app/etosha-gardens.apk"
                      className="group mb-5 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl sm:mb-7 md:hidden"
                      style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)" }}
                    >
                      <Download className="h-4 w-4" />
                      Download Now
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>

                    {/* Feature cards */}
                    <div className="mx-auto mb-4 grid max-w-md grid-cols-2 gap-2 sm:mb-7 sm:gap-2.5 md:mx-0">
                      {[
                        { icon: CreditCard, label: "Pay Plans", desc: "Convenient payments" },
                        { icon: Search, label: "Browse Services", desc: "Explore offerings" },
                        { icon: CalendarCheck, label: "Book Services", desc: "Reserve instantly" },
                        { icon: TrendingUp, label: "Track Progress", desc: "Stay up to date" },
                      ].map((f) => {
                        const Icon = f.icon;
                        return (
                          <div key={f.label} className="flex items-center gap-2.5 rounded-2xl border bg-white/80 px-3 py-2.5 shadow-sm backdrop-blur-sm sm:gap-3 sm:px-3.5 sm:py-3" style={{ borderColor: "rgba(41,221,218,0.16)" }}>
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9" style={{ background: "linear-gradient(135deg, rgba(38,82,162,0.08), rgba(0,174,237,0.10))" }}>
                              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: "#2652a2" }} />
                            </div>
                            <div className="min-w-0 text-left">
                              <div className="truncate text-xs font-semibold text-slate-800 sm:text-sm">{f.label}</div>
                              <div className="truncate text-[10px] text-slate-400 sm:text-[11px]">{f.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Android platform badge */}
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md" style={{ background: "rgba(61,220,132,0.12)" }}>
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#3DDC84">
                          <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-slate-400">Available on Android</span>
                    </div>
                  </div>

                  {/* ── RIGHT: QR Code + Download (desktop) ── */}
                  <div className="order-3 mx-auto hidden flex-col items-center gap-4 md:mx-0 md:flex">
                    {/* Etosha logo */}
                    <img src="/etosha-logo.png" alt="Etosha" className="h-14 w-auto object-contain" />
                    {/* QR card */}
                    <div className="rounded-3xl border bg-white/80 p-5 shadow-sm backdrop-blur-md" style={{ borderColor: "rgba(38,82,162,0.10)" }}>
                      <div className="rounded-2xl border bg-white p-3" style={{ borderColor: "rgba(38,82,162,0.06)" }}>
                        <img
                          src="/etosha-gardens-apk-qr.png"
                          alt="Scan to download Etosha Mobile"
                          className="h-[150px] w-[150px] object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = "flex";
                          }}
                        />
                        <div className="hidden h-[150px] w-[150px] flex-col items-center justify-center gap-2">
                          <Download className="h-8 w-8 text-slate-300" />
                          <span className="text-[10px] font-semibold text-slate-400">QR Code</span>
                        </div>
                      </div>
                      <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-widest text-slate-400">Scan to download</p>
                    </div>

                    <a
                      href="https://online.etoshagms.co.zw/app/etosha-gardens.apk"
                      className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                      style={{ background: "linear-gradient(135deg,#2652a2,#00aeed,#29ddda)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <Download className="h-4 w-4" />
                      Download Now
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
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
