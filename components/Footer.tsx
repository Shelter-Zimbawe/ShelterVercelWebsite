"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

function FeedbackWidget() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async () => {
    if (!rating) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-start gap-2">
        <h4 className="text-lg font-bold text-white">Rate Us</h4>
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#2652a2]/20 px-4 py-3">
          <span className="text-2xl">⭐</span>
          <p className="text-sm font-semibold text-white">Thank you for your feedback!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-3 text-lg font-bold text-white">Rate Your Experience</h4>
      {/* Stars */}
      <div className="mb-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-3xl transition-transform hover:scale-110 focus:outline-none"
            aria-label={`${star} star`}
          >
            <span style={{ color: star <= (hovered || rating) ? "#f59e0b" : "#374151" }}>★</span>
          </button>
        ))}
      </div>
      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment (optional)..."
        rows={3}
        className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800/60 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-[#2652a2] focus:outline-none"
      />
      <button
        onClick={submit}
        disabled={!rating || status === "sending"}
        className="mt-2 w-full rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40"
        style={{ background: "linear-gradient(135deg,#2652a2,#00aeed)" }}
      >
        {status === "sending" ? "Submitting..." : "Submit Feedback"}
      </button>
      {status === "error" && <p className="mt-1 text-xs text-red-400">Something went wrong. Please try again.</p>}
    </div>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
    </svg>
  );
}

const footerLinks = {
  products: [
    "RockView Park Stands",
    "Adelaide Park Stands",
    "Mabvuku Chizhanje",
    "Lendy Park Marondera Stands",
  ],
};

const WHATSAPP_NUMBER = "263719551234";
const WHATSAPP_MESSAGE = "How are you Shelter , I wanted to inquire on ";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/shelterzim", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@shelterzimbabwe?lang=en", label: "TikTok" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/shelterzimbabwe/posts/?feedView=all", label: "LinkedIn" },
];

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-gray-300 relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-4 text-2xl font-bold sm:text-3xl" style={{ color: '#2652a2' }}>
                Shelter Zimbabwe
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(38, 82, 162, 0.2)' }}>
                    <Mail className="w-5 h-5" style={{ color: '#2652a2' }} />
                  </div>
                  <span className="break-all text-gray-300 sm:break-normal">sales@shelter.co.zw</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(38, 82, 162, 0.2)' }}>
                    <Phone className="w-5 h-5" style={{ color: '#2652a2' }} />
                  </div>
                  <span className="text-gray-300">+263 242 774 455 / 748 121</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(38, 82, 162, 0.2)' }}>
                    <MapPin className="w-5 h-5" style={{ color: '#2652a2' }} />
                  </div>
                  <span className="text-gray-300">Shelter House 95 Five Avenue, Harare</span>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(37, 211, 102, 0.15)' }}>
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <span className="text-gray-300 group-hover:text-[#25D366] transition-colors duration-200">0719 551 234</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-white font-bold mb-4 capitalize text-lg">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 transition-colors duration-200" onMouseEnter={(e) => e.currentTarget.style.color = '#2652a2'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="mb-4 text-lg font-bold text-white">Business Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between gap-6">
                <span className="text-gray-400">Monday – Friday</span>
                <span className="font-semibold text-gray-200">8:00 AM – 5:00 PM</span>
              </li>
              <li className="flex items-center justify-between gap-6">
                <span className="text-gray-400">Saturday</span>
                <span className="font-medium text-red-400">Closed</span>
              </li>
              <li className="flex items-center justify-between gap-6">
                <span className="text-gray-400">Sunday</span>
                <span className="font-medium text-red-400">Closed</span>
              </li>
            </ul>
          </motion.div>

          {/* Feedback widget — far right */}
          <motion.div
            className="sm:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-gray-700 p-5">
              <FeedbackWidget />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row md:items-center"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Shelter Zimbabwe. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="text-left text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </button>
          </div>
          <div className="mt-2 flex gap-4 md:mt-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ backgroundColor: '#1f2937' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2652a2'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-transform duration-200 hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </a>
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
