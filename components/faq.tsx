"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "./booking-modal-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Do I need a boating license to rent?",
    a: "In Florida, boaters born on or after January 1, 1988 must have a boating safety education card or pass a simple online course ($9.95). We can walk you through the details when you book. Alternatively, add one of our licensed captains for a completely worry-free experience.",
  },
  {
    q: "What is the minimum rental duration?",
    a: "Our minimum rental is 4 hours. We offer 4–12 hour blocks with pricing starting at $80/hr for the boat. Longer adventures are always welcome — just select your preferred duration during checkout.",
  },
  {
    q: "How many passengers can the boat hold?",
    a: "The 24ft Crownline 235 XS holds up to 12 passengers when you self-drive, or up to 11 passengers when a captain is on board (the captain counts as one of the 12).",
  },
  {
    q: "What is included in the rental price?",
    a: "Your rental includes the boat, all required safety equipment (life jackets for every passenger, flares, fire extinguisher), a Bimini top for shade, deck shower, swim ladder, cooler with ice, and Bluetooth stereo. Fuel is included for standard cruising in Biscayne Bay.",
  },
  {
    q: "What's your cancellation policy?",
    a: "We offer a full refund for cancellations made 72+ hours before your booking start time. Cancellations within 72 hours receive a 50% refund or a full credit toward a future booking. No-shows are non-refundable.",
  },
  {
    q: "Where do we depart from?",
    a: "All departures are from our private slip at [Marina Name], Miami, FL. Full address and parking instructions will be included in your booking confirmation email.",
  },
  {
    q: "Can we bring our own food and drinks?",
    a: "Absolutely! We encourage it. The boat comes with a large cooler and we provide the ice. Please note that glass containers are not allowed on board — cans and plastic are fine. You're responsible for any trash, which we make very easy with the bins on board.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Safety is our top priority. If conditions are deemed unsafe (sustained winds over 20 knots, lightning, or rough seas), we will proactively reach out to reschedule or issue a full refund. We monitor weather 24 hours in advance and will notify you by 8 AM on the day of your booking.",
  },
  {
    q: "Do you offer private events or custom charters?",
    a: "Yes! We love hosting bachelorette parties, birthdays, corporate outings, and anniversaries. Contact us at hello@azulboatrentals.com for custom packages and group discounts for 3+ hour bookings.",
  },
];

export default function FAQ() {
  const { openModal } = useBookingModal();

  return (
    <section id="faq" className="py-28 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold text-[#00E5FF] uppercase tracking-[0.35em] mb-3">
            FAQ
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Frequently Asked{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00E5FF, #7B2FBE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions
            </span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Everything you need to know before your booking. Still have questions?{" "}
            <a
              href="mailto:hello@azulboatrentals.com"
              className="text-[#00E5FF] hover:underline"
            >
              Reach out anytime.
            </a>
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Accordion className="space-y-3">
            {FAQS.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="rounded-2xl border border-white/8 overflow-hidden data-[state=open]:border-[#00E5FF]/20 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <AccordionTrigger className="px-6 py-4 text-sm font-semibold text-white/80 hover:text-white hover:no-underline text-left [&[data-state=open]]:text-[#00E5FF]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-sm text-white/50 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Ready to book? It only takes 3 minutes.</p>
          <button
            onClick={openModal}
            className="px-8 py-3 rounded-full font-bold text-sm text-white transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
              boxShadow: "0 4px 20px rgba(255,45,120,0.35)",
            }}
          >
            Book Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
