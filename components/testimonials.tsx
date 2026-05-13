"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Sofia Ramirez",
    location: "Miami, FL",
    date: "April 2024",
    rating: 5,
    text: "Absolutely incredible experience! We rented the Crownline for a bachelorette party and it was everything we dreamed of. The captain was hilarious and took us to the best spots in Biscayne Bay. 10/10 would book again.",
    initials: "SR",
    color: "#FF2D78",
  },
  {
    name: "Marcus Johnson",
    location: "New York, NY",
    date: "March 2024",
    rating: 5,
    text: "Came down to Miami for a long weekend and this was the highlight of the trip. Rented self-drive and it was so easy — the orientation was thorough and the boat is in perfect condition. Bluetooth audio was a nice touch.",
    initials: "MJ",
    color: "#7B2FBE",
  },
  {
    name: "Chloe & James T.",
    location: "Chicago, IL",
    date: "February 2024",
    rating: 5,
    text: "We booked the sunset guided tour and it was pure magic. Our captain stopped at the sandbar and we swam for over an hour. The cooler with ice was ready for us when we got back. Seamless booking, great team.",
    initials: "CJ",
    color: "#00E5FF",
  },
  {
    name: "David Park",
    location: "Los Angeles, CA",
    date: "January 2024",
    rating: 5,
    text: "Brought 10 colleagues for a team outing and the whole experience was flawless. The Crownline comfortably fit all of us with room to spare. The captain had great music taste and knew every sandbar worth visiting.",
    initials: "DP",
    color: "#FF6B35",
  },
  {
    name: "Isabella Costa",
    location: "Miami Beach, FL",
    date: "December 2023",
    rating: 5,
    text: "Local here and I've tried every boat rental in the area — Azul is hands down the best. The boats are immaculate, the staff is warm and professional, and the pricing is fair. This is our go-to for every visitor we have.",
    initials: "IC",
    color: "#FF2D78",
  },
  {
    name: "Ryan & Kelsey O.",
    location: "Austin, TX",
    date: "November 2023",
    rating: 5,
    text: "Anniversary trip and it couldn't have been more perfect. Ordered champagne before departure (they kept it cold!), anchored at a private cove, and watched the Miami skyline light up at sunset. Magical doesn't cover it.",
    initials: "RK",
    color: "#7B2FBE",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(255,45,120,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,229,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,120,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-[#FF2D78] uppercase tracking-[0.35em] mb-3">
            Reviews
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF2D78, #FF6B35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Guests Say
            </span>
          </h2>

          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 mt-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/3">
            <StarRating count={5} />
            <span className="text-white font-bold text-sm">5.0</span>
            <span className="text-white/30 text-sm">·</span>
            <span className="text-white/50 text-sm">100+ reviews</span>
          </div>
        </motion.div>

        {/* Review grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative p-6 rounded-3xl border border-white/8 flex flex-col gap-4 group hover:border-white/15 transition-all"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-5 right-5 w-8 h-8 opacity-8"
                style={{ color: review.color }}
              />

              <StarRating count={review.rating} />

              <p className="text-white/65 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background: `${review.color}25`, border: `1px solid ${review.color}40` }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{review.name}</p>
                  <p className="text-xs text-white/35">
                    {review.location} · {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
