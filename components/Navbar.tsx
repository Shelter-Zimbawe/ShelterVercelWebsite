"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const WHATSAPP_URL = `https://wa.me/263719551234?text=${encodeURIComponent("How are you Shelter , I wanted to inquire on ")}`;

const steps = [
  {
    number: "01",
    title: "Schedule Your Discovery Visit",
    body: "Book a guided site visit or walk straight into our offices at Shelter House, 95 Five Avenue, Harare. Our dedicated property consultants will personally walk you through every available stand and answer every question you have.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Claim Your Perfect Stand",
    body: "Survey the landscape, explore the options, and select the stand that speaks to your vision. Whether you're crafting your dream home or securing a high-value investment, we'll ensure you find the one that fits.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Seal the Deal — It's Yours",
    body: "Lock in your stand with your first deposit and make it officially, undeniably yours. Enjoy flexible payment plans crafted to fit your pace because your property journey should feel exciting, not stressful.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z" />
        <path d="M2 20c0-4 4.5-7 10-7s10 3 10 7" strokeLinecap="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isGuideOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isGuideOpen]);

  const navItems = [
    { name: "Home", href: isHome ? "#home" : "/#home" },
    { name: "Features", href: isHome ? "#features" : "/#features" },
    { name: "Products", href: isHome ? "#products" : "/#products" },
    { name: "Locations", href: isHome ? "#locations" : "/#locations" },
    { name: "Superstructures", href: isHome ? "#superstructures" : "/#superstructures" },
    { name: "About", href: isHome ? "#about" : "/#about" },
    { name: "Testimonials", href: isHome ? "#testimonials" : "/#testimonials" },
    { name: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
              <a href="#home" className="block whitespace-nowrap text-base font-bold sm:text-xl lg:text-2xl" style={{ color: '#2652a2' }}>
                Shelter Zimbabwe
              </a>
            </motion.div>

            <div className="hidden xl:block">
              <div className="ml-8 flex items-baseline space-x-4 2xl:space-x-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-3 py-2 text-sm font-semibold transition-colors duration-200 ${isScrolled ? "text-gray-700" : "text-gray-800"}`}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2652a2'}
                    onMouseLeave={(e) => e.currentTarget.style.color = isScrolled ? '#374151' : '#1f2937'}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/kumbi"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition hover:scale-[1.04]"
                style={{ background: "linear-gradient(135deg,#03091f,#0d1f4a)", border: "1px solid rgba(0,174,237,0.4)", color: "#00aeed" }}
              >
                <span style={{ background: "linear-gradient(90deg,#00aeed,#29ddda)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KUMBI</span>
                <span className="rounded-full bg-[#00aeed]/15 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#00aeed]">New</span>
              </Link>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsGuideOpen(true)}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:shadow-md lg:px-5 lg:text-sm"
                style={{ background: 'linear-gradient(135deg, #2652a2, #00aeed, #29ddda)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #1f468d, #2652a2, #00aeed)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #2652a2, #00aeed, #29ddda)'}
              >
                Complete Buying Guide
              </motion.button>
            </div>

            <button
              className={`rounded-lg p-2 focus:outline-none sm:ml-3 xl:hidden ${isScrolled ? "text-gray-700" : "text-gray-800"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden w-full border-t bg-white shadow-xl"
            >
              <div className="mx-auto w-full max-w-7xl space-y-1 px-4 pb-4 pt-2 sm:px-6 lg:px-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:opacity-80"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(38, 82, 162, 0.1)'; e.currentTarget.style.color = '#2652a2'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#374151'; }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Link
                  href="/kumbi"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#03091f,#0d1f4a)", border: "1px solid rgba(0,174,237,0.35)", color: "#00aeed" }}
                >
                  KUMBI <span className="rounded-full bg-[#00aeed]/15 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider">New</span>
                </Link>
                <button
                  className="mt-2 w-full rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 sm:hidden"
                  style={{ background: 'linear-gradient(135deg, #2652a2, #00aeed, #29ddda)' }}
                  onClick={() => { setIsMobileMenuOpen(false); setIsGuideOpen(true); }}
                >
                  Complete Buying Guide
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Buying Guide Modal */}
      <AnimatePresence>
        {isGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
            style={{ backgroundColor: 'rgba(10, 20, 50, 0.72)', backdropFilter: 'blur(6px)' }}
            onClick={() => setIsGuideOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex w-full max-h-[92dvh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_32px_80px_rgba(38,82,162,0.28)] sm:max-w-2xl sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header — fixed, never scrolls away */}
              <div className="relative flex-shrink-0 overflow-hidden px-5 pb-6 pt-8 text-white sm:px-8 sm:pb-8 sm:pt-10" style={{ background: 'linear-gradient(135deg, #1a3d8a 0%, #2652a2 40%, #00aeed 80%, #29ddda 100%)' }}>
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
                <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #29ddda 0%, transparent 70%)' }} />

                <button
                  onClick={() => setIsGuideOpen(false)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/35 sm:right-5 sm:top-5 sm:h-9 sm:w-9"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>

                <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:mb-2 sm:text-sm">Your Path to Ownership</p>
                <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Acquire Your Stand<br />in 3 Easy Steps
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/85 sm:mt-3 sm:text-base">
                  Owning a piece of Zimbabwe's finest land has never been this straightforward. Here's exactly how it works.
                </p>
              </div>

              {/* Steps — scrollable on small screens */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-3 px-4 py-5 sm:space-y-4 sm:px-8 sm:py-7">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-gradient-to-r from-[#f4f8ff] to-white p-4 shadow-sm sm:gap-5 sm:p-5"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md sm:h-14 sm:w-14 sm:rounded-2xl" style={{ background: 'linear-gradient(135deg, #2652a2, #00aeed)' }}>
                          {step.icon}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00aeed' }}>Step {step.number}</span>
                        <h3 className="mt-0.5 text-sm font-bold text-slate-900 sm:text-base md:text-lg">{step.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{step.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
                  <p className="text-sm text-slate-500">Ready to take the first step?</p>
                  <div className="flex gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.03] sm:flex-none sm:px-5"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat With Us
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setIsGuideOpen(false)}
                      className="flex flex-1 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:scale-[1.03] sm:flex-none sm:px-5"
                      style={{ borderColor: '#2652a2', color: '#2652a2' }}
                    >
                      Book a Visit
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
