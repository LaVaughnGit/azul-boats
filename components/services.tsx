"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "./booking-modal-provider";
import { Anchor, Map, Check } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  {
    icon: Anchor,
    color: "#FF2D78",
    title: "Boat Rentals",
    subtitle: "Self-Drive or Captained",
    description:
      "Take the helm yourself or bring along one of our licensed captains. Either way, the Crownline 235 SS is yours for the day — Bluetooth audio, swim ladder, deck shower, and a cooler packed with ice included.",
    features: [
      "Hourly rates from $80/hr",
      "Captain add-on for $50/hr",
      "Up to 12 passengers",
      "All safety equipment included",
      "No prior experience needed (self-drive)",
      "Available 7 days a week",
    ],
    image: "/images/crownline2.jpg",
    cta: "Book a Rental",
  },
  {
    icon: Map,
    color: "#00E5FF",
    title: "Guided Tours",
    subtitle: "Miami's Best Hidden Spots",
    description:
      "Let our local captains show you the real Miami from the water. Cruise past Star Island, anchor at the Sandbar, and watch the sunset over the skyline. Every tour is custom — you set the vibe.",
    features: [
      "Sunset & sunrise departures",
      "Biscayne Bay Sandbar stop",
      "Star Island celebrity homes cruise",
      "Snorkeling at Stiltsville",
      "Private & custom routes available",
      "Expert local captain narration",
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    cta: "Book a Tour",
  },
];

export default function Services() {
  const { openModal } = useBookingModal();

  return (
    <section id="services" className="py-28 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-[#00E5FF] uppercase tracking-[0.35em] mb-3">
            What We Offer
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00E5FF, #7B2FBE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            From full-day boat rentals to guided sunset tours — we have everything you
            need for an unforgettable day on the water.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="space-y-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${
                    !isEven ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isEven
                        ? "bg-gradient-to-r from-transparent to-[#06061A]/40"
                        : "bg-gradient-to-l from-transparent to-[#06061A]/40"
                    }`}
                  />
                  {/* Icon badge */}
                  <div
                    className="absolute top-5 left-5 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${service.color}20`,
                      border: `1px solid ${service.color}40`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                </div>

                {/* Content */}
                <div className={`p-8 lg:p-10 flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
                    style={{ color: service.color }}
                  >
                    {service.subtitle}
                  </p>
                  <h3
                    className="text-3xl font-black text-white mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: service.color }} />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={openModal}
                    className="self-start px-6 py-3 rounded-xl font-bold text-sm text-white transition-transform hover:scale-105 active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}, #7B2FBE)`,
                      boxShadow: `0 4px 20px ${service.color}40`,
                    }}
                  >
                    {service.cta} →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
