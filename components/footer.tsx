"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "./booking-modal-provider";
import { Anchor, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.91a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1-.31z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const SOCIAL = [
  { icon: IgIcon, href: "#", label: "Instagram" },
  { icon: FbIcon, href: "#", label: "Facebook" },
  { icon: TikTokIcon, href: "#", label: "TikTok" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cancellation Policy", href: "#" },
];

export default function Footer() {
  const { openModal } = useBookingModal();

  return (
    <footer className="relative pt-20 pb-8">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,45,120,0.5), rgba(0,229,255,0.5), transparent)",
        }}
      />

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div
          className="relative overflow-hidden rounded-3xl px-8 sm:px-12 py-12 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,45,120,0.15), rgba(123,47,190,0.15))",
            border: "1px solid rgba(255,45,120,0.25)",
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #FF2D78, transparent)" }}
          />
          <div className="relative z-10">
            <h3
              className="text-2xl sm:text-3xl font-black text-white mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your perfect Miami day is one booking away.
            </h3>
            <p className="text-white/50 text-sm">
              Available 7 days a week · 8 AM – 6 PM · (305) 690-3270
            </p>
          </div>
          <button
            onClick={openModal}
            className="relative z-10 shrink-0 px-7 py-3 rounded-full font-bold text-sm text-white whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
              boxShadow: "0 4px 20px rgba(255,45,120,0.4)",
            }}
          >
            Book Now
          </button>
        </div>
      </motion.div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#7B2FBE] flex items-center justify-center shadow-lg">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className="text-[#00E5FF] font-black text-lg tracking-[0.25em] uppercase leading-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  AZUL
                </p>
                <p className="text-white/30 text-[9px] tracking-[0.35em] uppercase font-medium">
                  Boat Rentals
                </p>
              </div>
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Miami&apos;s premier luxury boat rental experience. Three 24ft Crownline
              Bowriders available for self-drive or captained adventures on Biscayne Bay.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF2D78] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Miami Marina</p>
                  <p className="text-xs text-white/30">Miami, FL 33101</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF2D78] shrink-0" />
                <a
                  href="tel:+13056903270"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  (305) 690-3270
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF2D78] shrink-0" />
                <a
                  href="mailto:hello@azulboatrentals.com"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  hello@azulboatrentals.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-5">
              Hours
            </h4>
            <ul className="space-y-2.5">
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                { day: "Saturday", hours: "7:00 AM – 7:00 PM" },
                { day: "Sunday", hours: "8:00 AM – 6:00 PM" },
                { day: "Holidays", hours: "By appointment" },
              ].map(({ day, hours }) => (
                <li key={day} className="flex justify-between text-sm gap-4">
                  <span className="text-white/40">{day}</span>
                  <span className="text-white/70 font-medium whitespace-nowrap">{hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400/80 font-medium">Available Today</span>
            </div>
          </div>
        </div>

        <Separator className="bg-white/8 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Azul Boat Rentals LLC. All rights reserved.
          </p>
          <div className="flex gap-5">
            {LEGAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
