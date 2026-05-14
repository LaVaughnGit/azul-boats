"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "./booking-modal-provider";
import { CalendarDays, Settings2, CreditCard, Waves } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: CalendarDays,
    color: "#FF2D78",
    title: "Pick Your Date",
    description:
      "Choose your date, start time, and how many hours you want the boat. Our calendar shows real-time availability.",
  },
  {
    number: "02",
    icon: Settings2,
    color: "#7B2FBE",
    title: "Customize Your Trip",
    description:
      "Decide if you'd like a licensed captain (+$50/hr). Add your passenger count — up to 9 self-drive or 8 with a captain.",
  },
  {
    number: "03",
    icon: CreditCard,
    color: "#00E5FF",
    title: "Pay Securely",
    description:
      "Complete checkout via Stripe — accepts all major cards and Apple/Google Pay. Your booking is instantly confirmed.",
  },
  {
    number: "04",
    icon: Waves,
    color: "#FF6B35",
    title: "Hit the Water",
    description:
      "Show up at our Miami marina. We'll go over the boat, get you oriented, and you're off. Sunscreen not included — good times are!",
  },
];

export default function HowItWorks() {
  const { openModal } = useBookingModal();

  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(123,47,190,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(123,47,190,0.5), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold text-[#7B2FBE] uppercase tracking-[0.35em] mb-3">
            The Process
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How It{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7B2FBE, #FF2D78)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Works
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From booking to boarding in four simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="relative group"
              >
                {/* Connector line (desktop) */}
                {idx < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-full w-full h-px -translate-x-6 z-0"
                    style={{
                      background: `linear-gradient(90deg, ${step.color}40, transparent)`,
                    }}
                  />
                )}

                <div
                  className="relative z-10 p-6 rounded-3xl border border-white/8 h-full transition-all duration-300 group-hover:border-white/15"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}30`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-5xl font-black opacity-10 leading-none"
                      style={{ color: step.color, fontFamily: "var(--font-heading)" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-black text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,45,120,0.12), rgba(123,47,190,0.12), rgba(0,229,255,0.08))",
            border: "1px solid rgba(255,45,120,0.2)",
          }}
        >
          {/* Decorative orbs */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #FF2D78, transparent)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #00E5FF, transparent)" }}
          />

          <div className="relative z-10">
            <h3
              className="text-3xl sm:text-4xl font-black text-white mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to set sail?
            </h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Booking takes less than 3 minutes.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
                boxShadow: "0 8px 30px rgba(255,45,120,0.4)",
              }}
            >
              Book Your Boat Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
