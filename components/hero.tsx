"use client";

import { motion, type Transition } from "framer-motion";
import { useBookingModal } from "./booking-modal-provider";
import { ChevronDown, Star, Users, Clock } from "lucide-react";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease: "easeOut" } as Transition,
  };
}

const STATS = [
  { icon: Star, label: "Top Rated", value: "5.0 ★" },
  { icon: Users, label: "Passengers", value: "Up to 12" },
  { icon: Clock, label: "Starting At", value: "$80 / hr" },
];

export default function Hero() {
  const { openModal } = useBookingModal();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,45,120,0.18) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-[65vw] h-[65vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(123,47,190,0.18) 0%, transparent 70%)" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#06061A] to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        {/* Eyebrow */}
        <motion.div
          {...fadeUp(0.2)}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">
            Miami&apos;s Premier Boat Rental
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.35)}
          className="font-black uppercase leading-[0.9] mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="block text-[clamp(3.5rem,10vw,8rem)] text-white tracking-tight">
            Luxury
          </span>
          <span
            className="block text-[clamp(3.5rem,10vw,8rem)] tracking-tight"
            style={{
              background: "linear-gradient(135deg, #FF2D78 0%, #7B2FBE 50%, #00E5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Boat Rentals
          </span>
          <span className="block text-[clamp(2.5rem,7vw,6rem)] text-white/80 tracking-tight">
            in Miami, FL
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.5)}
          className="max-w-xl mx-auto text-lg text-white/50 mb-10 leading-relaxed"
        >
          Experience Miami aboard one of our 24ft Crownline Bowriders.<br />
          Self-drive or with a captain — your adventure starts here.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <button
            onClick={openModal}
            className="px-8 py-4 rounded-full font-bold text-base text-white transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
              boxShadow: "0 8px 30px rgba(255,45,120,0.45)",
            }}
          >
            Book Your Boat
          </button>
          <a
            href="#fleet"
            className="px-8 py-4 rounded-full font-bold text-base text-white border border-white/20 hover:border-[#00E5FF]/50 hover:bg-white/5 transition-all"
          >
            View Our Fleet →
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          {...fadeUp(0.8)}
          className="inline-flex flex-wrap justify-center gap-px overflow-hidden rounded-2xl border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {STATS.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-6 py-4 ${i < STATS.length - 1 ? "border-r border-white/8" : ""
                }`}
            >
              <Icon className="w-5 h-5 text-[#FF2D78] shrink-0" />
              <div className="text-left">
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                  {label}
                </p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#fleet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
