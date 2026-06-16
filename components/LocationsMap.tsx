"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { MapLocation } from "./StandsLeafletMap";

const StandsLeafletMap = dynamic(() => import("./StandsLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] w-full items-center justify-center" style={{ background: "#eaf3fb" }}>
      <p className="text-sm font-medium" style={{ color: "#2652a2" }}>Loading map…</p>
    </div>
  ),
});

const locations: MapLocation[] = [
  {
    id: "rockview",
    name: "RockView Park Stands",
    area: "Epworth",
    note: "Near Sunway City, on the southern growth edge of Harare.",
    lat: -17.893,
    lng: 31.139,
  },
  {
    id: "mabvuku",
    name: "Mabvuku Chizhanje",
    area: "Mabvuku, Harare",
    note: "Off Mutare Road — between Chizhanje Mabvuku (west) and Zimre Park (east).",
    lat: -17.846,
    lng: 31.133,
  },
  {
    id: "adelaide",
    name: "Adelaide Park Stands",
    area: "Adelaide Park",
    note: "East of Harare, in the fast-growing Mutare Road corridor.",
    lat: -17.882,
    lng: 31.205,
  },
  {
    id: "lendy",
    name: "Lendy Park Marondera Stands",
    area: "Marondera",
    note: "Mutare Rd → Ruzawi Rd → First Street, near the Shelter billboard.",
    lat: -18.185,
    lng: 31.552,
  },
];

export default function LocationsMap() {
  const [active, setActive] = useState<string | null>(null);

  const inquire = (loc: MapLocation) => {
    const message = `How are you Shelter , I wanted to inquire on ${loc.name} in ${loc.area}.`;
    window.open(`https://wa.me/263719551234?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="locations" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#2652a2 1px, transparent 1px), linear-gradient(90deg, #2652a2 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#00aeed" }}>
            Where We Build
          </p>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Our Stands Across <span style={{ color: "#2652a2" }}>Zimbabwe</span>
          </h2>
          <p className="text-base text-gray-600 sm:text-lg">
            Every Shelter development sits in a carefully chosen growth corridor in and around Harare —
            explore the live map or tap a location below to zoom straight there.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-5 lg:gap-8">
          {/* ── LIVE MAP ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border shadow-xl lg:col-span-3"
            style={{ borderColor: "rgba(38,82,162,0.14)", minHeight: 420 }}
          >
            <StandsLeafletMap locations={locations} activeId={active} onSelect={setActive} />
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset"
              style={{ boxShadow: "inset 0 0 0 1px rgba(38,82,162,0.08)" }}
            />
          </motion.div>

          {/* ── LOCATION LIST ── */}
          <div className="space-y-3 lg:col-span-2">
            {locations.map((loc, index) => {
              const isActive = active === loc.id;
              return (
                <motion.button
                  key={loc.id}
                  type="button"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActive((cur) => (cur === loc.id ? null : loc.id))}
                  className="group block w-full rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5"
                  style={{
                    borderColor: isActive ? "rgba(0,174,237,0.45)" : "rgba(38,82,162,0.12)",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(38,82,162,0.06), rgba(0,174,237,0.08), rgba(41,221,218,0.07))"
                      : "#ffffff",
                    boxShadow: isActive ? "0 12px 30px rgba(38,82,162,0.12)" : "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                        style={{ background: "linear-gradient(135deg, #2652a2, #29ddda)" }}
                      >
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 sm:text-base">{loc.name}</p>
                        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#00aeed" }}>
                          {loc.area}
                        </p>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mb-3 mt-3 text-sm leading-relaxed text-gray-600">{loc.note}</p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              inquire(loc);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Inquire on WhatsApp
                          </button>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-200 hover:bg-white"
                            style={{ color: "#2652a2", borderColor: "rgba(38,82,162,0.25)" }}
                          >
                            <Navigation className="h-3.5 w-3.5" />
                            Get Directions
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
