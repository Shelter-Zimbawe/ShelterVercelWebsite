"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, MapPin, X, AlertTriangle } from "lucide-react";
import BookingForm from "./BookingForm";

interface PlotOption {
  id: number;
  size: number;
  price: number;
  deposit30: number;
  installment24: number;
  installment36: number;
  isGatedCommunity?: boolean;
}

interface Stand {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
  direction: string;
  completionStatus: string;
  minimumPrice: number;
  plots: PlotOption[];
  price: string;
  features: string[];
  available?: boolean;
  size?: string;
  created_at?: string;
  updated_at?: string;
}

const completionClasses: Record<string, string> = {
  Serviced: "bg-green-100 text-green-700 border-green-200",
  Servicing: "bg-amber-100 text-amber-700 border-amber-200",
  Ready: "bg-blue-100 text-blue-700 border-blue-200",
};

function formatCurrency(value: number) {
  return `From $${value.toLocaleString()}`;
}

function formatMoney(value: number) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function truncateDescription(value: string) {
  return value.length > 120 ? `${value.slice(0, 117)}...` : value;
}

function isOutOfStock(stand: Stand) {
  return stand.available === false;
}

function OutOfStockStamp({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scale =
    size === "lg" ? "min-w-[200px] px-5 py-3 text-base sm:text-lg" : size === "sm" ? "min-w-[140px] px-3 py-2 text-[11px]" : "min-w-[168px] px-4 py-2.5 text-sm";

  return (
    <div
      className={`pointer-events-none select-none rounded-md border-[3px] border-double text-center font-black uppercase tracking-[0.18em] shadow-lg ${scale}`}
      style={{
        color: "#2652a2",
        borderColor: "#2652a2",
        background: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(41,221,218,0.22))",
        boxShadow: "0 8px 24px rgba(38, 82, 162, 0.28), inset 0 0 0 1px rgba(0, 174, 237, 0.45)",
        transform: "rotate(-12deg)",
      }}
      aria-hidden
    >
      <span
        className="block leading-tight"
        style={{
          backgroundImage: "linear-gradient(90deg, #2652a2, #00aeed, #2652a2)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Out Of Stock
      </span>
    </div>
  );
}

export default function ProductGallery() {
  const [standProducts, setStandProducts] = useState<Stand[]>([]);
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
  const [bookingStand, setBookingStand] = useState<Stand | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchStands();
  }, []);

  const fetchStands = async () => {
    try {
      const response = await fetch('/api/stands');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setStandProducts(data);
          setFetchError(null);
        } else {
          setStandProducts([]);
          setFetchError("No stands are available at the moment.");
        }
      } else {
        setFetchError('Unable to load stands right now.');
        console.error('Failed to fetch stands');
      }
    } catch (error) {
      setFetchError("Stand data is temporarily unavailable.");
      console.error('Error fetching stands:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (stand: Stand) => {
    if (isOutOfStock(stand)) return;
    setSelectedStand(stand);
  };

  const closeModal = () => {
    setSelectedStand(null);
  };

  const openBookingModal = (stand: Stand) => {
    if (isOutOfStock(stand)) return;
    setBookingStand(stand);
    setShowBookingForm(true);
    setSelectedStand(null);
  };

  const startPurchase = (stand: Stand) => {
    if (isOutOfStock(stand)) return;
    const message = `How are you Shelter , I wanted to inquire on ${stand.name} in ${stand.location} (starting from ${formatCurrency(stand.minimumPrice)}).`;
    window.open(`https://wa.me/263719551234?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="products" className="relative bg-white py-12 sm:py-14">
      {/* Simple background */}
      <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(135deg, rgba(38, 82, 162, 0.14), rgba(0, 174, 237, 0.12), rgba(41, 221, 218, 0.12))' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span style={{ color: '#2652a2' }}>Stands</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Own your stand with a 30% deposit and flexible payments of up to 36 months. Browse our catalogue and get started today
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-lg text-gray-600">Loading stands...</div>
          </div>
        ) : fetchError ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-xl rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700"
            >
              <AlertTriangle className="h-7 w-7" />
            </motion.div>
            <h3 className="text-xl font-semibold text-amber-900">Stand data unavailable</h3>
            <p className="mt-2 text-sm text-amber-800">{fetchError}</p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-max gap-6 pr-2">
              {standProducts.map((product, index) => {
                const outOfStock = isOutOfStock(product);
                return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={outOfStock ? undefined : { y: -8 }}
                  className={`group relative w-[300px] flex-shrink-0 overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 sm:w-[340px] lg:w-[360px] ${
                    outOfStock
                      ? "border-slate-200"
                      : "border-slate-200 hover:border-[#2652a2] hover:shadow-xl"
                  }`}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1 rounded-t-3xl"
                    style={{ background: "linear-gradient(90deg, #2652a2, #00aeed, #29ddda)" }}
                  />

                  <div className="relative mb-5 h-52 overflow-hidden rounded-2xl">
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition duration-300 ${
                        outOfStock ? "scale-105 blur-[2.5px] saturate-75" : ""
                      }`}
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    {outOfStock && (
                      <>
                        <div className="absolute inset-0 bg-white/35" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <OutOfStockStamp />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-slate-900">{product.name}</h3>
                      <p className={`max-w-md text-sm leading-6 text-slate-600 ${outOfStock ? "opacity-80" : ""}`}>
                        {truncateDescription(product.description)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        outOfStock
                          ? "border-[#2652a2]/30 bg-[#2652a2]/10 text-[#2652a2]"
                          : completionClasses[product.completionStatus] || completionClasses.Ready
                      }`}
                    >
                      {outOfStock ? "Out Of Stock" : product.completionStatus}
                    </span>
                  </div>

                  <div className="mb-5 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                      <MapPin className="h-4 w-4 shrink-0 text-[#2652a2]" />
                      <span>
                        {product.location} ({product.direction})
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm text-slate-600 ${outOfStock ? "opacity-75" : ""}`}>
                      <CheckCircle2 className="h-4 w-4 text-[#2652a2]" />
                      <span>Completion: {product.completionStatus}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                      Starting Price
                    </div>
                    <div
                      className={`mt-1 text-3xl font-bold text-[#2652a2] ${
                        outOfStock ? "select-none blur-[6px] opacity-60" : ""
                      }`}
                      aria-hidden={outOfStock}
                    >
                      {formatCurrency(product.minimumPrice)}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {outOfStock ? (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 opacity-50" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openModal(product)}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
                        style={{ background: "linear-gradient(135deg, #2652a2, #00aeed, #29ddda)" }}
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedStand && !isOutOfStock(selectedStand) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={closeModal}
        >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <div className="grid gap-6 p-4 sm:gap-8 sm:p-6 md:p-8 xl:grid-cols-[320px_minmax(0,1fr)]">
              <div className="space-y-6">
                <div className="relative h-52 overflow-hidden rounded-2xl sm:h-64 sm:rounded-3xl">
                  <div
                    className={`absolute inset-0 bg-cover bg-center ${
                      isOutOfStock(selectedStand) ? "scale-105 blur-[2.5px] saturate-75" : ""
                    }`}
                    style={{ backgroundImage: `url(${selectedStand.image})` }}
                  />
                  {isOutOfStock(selectedStand) && (
                    <>
                      <div className="absolute inset-0 bg-white/35" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <OutOfStockStamp size="lg" />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <span
                    className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                      isOutOfStock(selectedStand)
                        ? "border-[#2652a2]/30 bg-[#2652a2]/10 text-[#2652a2]"
                        : completionClasses[selectedStand.completionStatus] || completionClasses.Ready
                    }`}
                  >
                    {isOutOfStock(selectedStand) ? "Out Of Stock" : selectedStand.completionStatus}
                  </span>
                  <h3 className="mb-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                    {selectedStand.name}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    {selectedStand.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Location Info
                  </div>
                  <div className="text-base font-medium text-slate-800">
                    {selectedStand.location} ({selectedStand.direction})
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between">
                <div>
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Starting Price
                      </div>
                      <div className="mt-1 text-3xl font-bold text-[#2652a2] sm:text-4xl">
                        {formatCurrency(selectedStand.minimumPrice)}
                      </div>
                    </div>
                    <div className="w-fit rounded-2xl bg-[#2652a2]/10 px-4 py-3 text-sm font-medium text-[#2652a2]">
                      {selectedStand.location}
                    </div>
                  </div>

                  <div className={`space-y-4 ${isOutOfStock(selectedStand) ? "opacity-80" : ""}`}>
                    {selectedStand.plots.map((plot) => (
                      <div
                        key={plot.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                      >
                        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                              Stand Size
                            </span>
                            <div className="mt-1 text-lg font-bold text-slate-900">{plot.size} sqm</div>
                            {plot.isGatedCommunity && (
                              <div className="mt-2 inline-flex rounded-full border border-[#2652a2]/20 bg-[#2652a2]/10 px-3 py-1 text-xs font-semibold text-[#2652a2]">
                                Gated Community Section
                              </div>
                            )}
                          </div>
                          <div className="rounded-2xl bg-[#2652a2]/5 px-4 py-3 sm:min-w-[180px]">
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              Price in USD
                            </div>
                            <div className="mt-1 text-xl font-bold text-[#2652a2]">{formatMoney(plot.price)}</div>
                          </div>
                        </div>
                        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
                          <div className="rounded-xl bg-slate-50 px-4 py-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                              30% Deposit
                            </div>
                            <div className="mt-1 font-semibold text-slate-900">{formatMoney(plot.deposit30)}</div>
                          </div>
                          <div className="rounded-xl bg-slate-50 px-4 py-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                              24 Months
                            </div>
                            <div className="mt-1 font-semibold text-slate-900">{formatMoney(plot.installment24)}/mo</div>
                          </div>
                          <div className="rounded-xl bg-slate-50 px-4 py-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                              36 Months
                            </div>
                            <div className="mt-1 font-semibold text-slate-900">{formatMoney(plot.installment36)}/mo</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#2652a2]/10 bg-[#f8fbff] px-4 py-3 text-sm leading-6 text-slate-600">
                    <p>Option 1 - Cash.</p>
                    <p>Option 2 - 30% deposit with installments over 24 months or 36 months.</p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#29ddda]/30 bg-gradient-to-r from-[#2652a2]/10 via-[#00aeed]/10 to-[#29ddda]/10 px-4 py-4 text-sm text-slate-700 shadow-sm">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2652a2]">
                      Important Pricing Notes
                    </div>
                    <p>1. Prices are inclusive of VAT.</p>
                    <p>2. An administration charge of 15% is applied on the balance per annum.</p>
                  </div>
                </div>

                {isOutOfStock(selectedStand) ? (
                  <div className="mt-8 rounded-2xl border border-[#2652a2]/20 bg-[#2652a2]/5 px-6 py-5 text-center">
                    <p className="text-base font-semibold text-[#2652a2]">This stand is currently out of stock</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedStand.name} in {selectedStand.location} is not available for booking right now.
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <button
                      onClick={() => startPurchase(selectedStand)}
                      className="flex-1 rounded-2xl border border-[#2652a2]/20 bg-white px-6 py-4 font-semibold text-[#2652a2] transition hover:bg-[#2652a2]/5"
                    >
                      Get in Touch with Sales
                    </button>
                    <button
                      onClick={() => openBookingModal(selectedStand)}
                      className="flex-1 rounded-2xl px-6 py-4 font-semibold text-white transition hover:shadow-lg"
                      style={{ background: "linear-gradient(135deg, #2652a2, #00aeed, #29ddda)" }}
                    >
                      Book a Visit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && bookingStand && !isOutOfStock(bookingStand) && (
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
              className="relative"
            >
              <BookingForm 
                onClose={() => setShowBookingForm(false)} 
                standId={bookingStand?.id}
                standName={bookingStand?.name}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
