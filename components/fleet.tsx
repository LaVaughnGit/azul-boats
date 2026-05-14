"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBookingModal } from "./booking-modal-provider";
import { Music, Droplets, Waves, IceCream, Anchor, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const FEATURES = [
  { icon: Music, label: "Bluetooth Stereo" },
  { icon: Droplets, label: "Deck Shower" },
  { icon: Waves, label: "Swim Ladder" },
  { icon: IceCream, label: "Cooler Included" },
];

const SPECS = [
  { label: "Length", value: "24 ft" },
  { label: "Model", value: "Crownline 235 XS" },
  { label: "Engine", value: "MerCruiser 4.3L" },
  { label: "Fuel", value: "Gasoline" },
];

const INCLUDED = [
  "Life jackets for all passengers",
  "Safety equipment & flares",
  "Bimini top for shade",
  "Navigation lights",
  "Complimentary orientation",
];

export default function Fleet() {
  const { openModal } = useBookingModal();
  const [withCaptain, setWithCaptain] = useState(false);

  const boatRate = 80;
  const captainRate = 50;
  const maxPassengers = withCaptain ? 8 : 9;
  const displayRate = withCaptain ? boatRate + captainRate : boatRate;

  return (
    <section id="fleet" className="py-28 relative">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,120,0.4), transparent)" }}
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
          <p className="text-xs font-bold text-[#FF2D78] uppercase tracking-[0.35em] mb-3">
            Our Fleet
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF2D78, #00E5FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Crownline 235 XS
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Three identical luxury 24ft bowriders — all meticulously maintained and
            ready for your perfect day on the water.
          </p>
        </motion.div>

        {/* Boat card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {/* Image panel */}
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <Image
              src="/images/boats/crownline1.jpg"
              alt="24ft Crownline 235 XS Bowrider"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06061A]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#06061A]/30" />

            {/* Fleet badge */}
            <div className="absolute top-4 left-4">
              <Badge
                className="px-3 py-1.5 rounded-full border-0 text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #FF2D78, #7B2FBE)" }}
              >
                Fleet of 3 Available
              </Badge>
            </div>

            {/* Specs overlay */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
              {SPECS.map(({ label, value }) => (
                <div
                  key={label}
                  className="px-3 py-2 rounded-xl text-xs"
                  style={{ background: "rgba(6,6,26,0.75)", backdropFilter: "blur(8px)" }}
                >
                  <p className="text-white/40 uppercase tracking-widest text-[10px]">{label}</p>
                  <p className="text-white font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details panel */}
          <div className="p-8 flex flex-col justify-between gap-8">
            <div>
              <h3
                className="text-2xl font-black text-white mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                24ft Crownline Bowrider
              </h3>
              <p className="text-white/40 text-sm mb-6">
                Premium luxury bowrider — perfect for cruising, swimming, and entertaining
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {FEATURES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FF2D78]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#FF2D78]" />
                    </div>
                    <span className="text-sm text-white/70 font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Included list */}
              <div className="space-y-2">
                {INCLUDED.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                    <span className="text-xs text-white/50">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5 text-[#FF2D78] shrink-0" />
                  <span className="text-xs text-white/50">Fuel not included</span>
                </div>
              </div>
            </div>

            {/* Pricing + toggle */}
            <div className="space-y-4">
              {/* Captain toggle */}
              <div
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/10"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <Anchor className="w-5 h-5 text-[#00E5FF] shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Add a Captain</p>
                  <p className="text-xs text-white/40">+$50/hr · max 8 passengers</p>
                </div>
                <button
                  onClick={() => setWithCaptain(!withCaptain)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    withCaptain ? "bg-[#FF2D78]" : "bg-white/15"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                      withCaptain ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Price display */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-end gap-1">
                    <span
                      className="text-4xl font-black"
                      style={{
                        background: "linear-gradient(135deg, #FF2D78, #00E5FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ${displayRate}
                    </span>
                    <span className="text-white/40 text-sm mb-1">/hr</span>
                  </div>
                  <p className="text-xs text-white/30">
                    {withCaptain
                      ? `$80 boat + $50 captain · max ${maxPassengers} passengers`
                      : `Self-drive · max ${maxPassengers} pax`}
                  </p>
                </div>
                <button
                  onClick={openModal}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-transform hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
                    boxShadow: "0 4px 20px rgba(255,45,120,0.35)",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-white/30 mt-6"
        >
          All three boats are identical — available 7 days a week, 8 AM – 9 PM
        </motion.p>
      </div>
    </section>
  );
}
