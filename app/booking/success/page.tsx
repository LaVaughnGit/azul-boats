import Link from "next/link";
import { CheckCircle, Anchor, Calendar, Mail } from "lucide-react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export default async function BookingSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let customerEmail: string | null = null;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      customerEmail = session.customer_email;
    } catch {
      // If retrieval fails, fall back to generic text
    }
  }
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "#06061A" }}
    >
      {/* Glow bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,45,120,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#7B2FBE] flex items-center justify-center">
            <Anchor className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-[#00E5FF] font-black text-xl tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            AZUL
          </span>
        </div>

        {/* Check circle */}
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,45,120,0.2), rgba(0,229,255,0.2))",
            border: "2px solid rgba(255,45,120,0.4)",
          }}
        >
          <CheckCircle className="w-10 h-10 text-[#FF2D78]" />
        </div>

        <h1
          className="text-4xl font-black text-white mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Booking Confirmed!
        </h1>
        <p className="text-white/50 text-base mb-8 leading-relaxed">
          Your reservation is locked in. Check your email for the full confirmation
          details including marina location and what to bring.
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          <div
            className="p-4 rounded-2xl text-left border border-white/8"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <Calendar className="w-5 h-5 text-[#FF2D78] mb-2" />
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
              Confirmation
            </p>
            <p className="text-sm font-semibold text-white">
              Sent to your email:
            </p>
            {customerEmail && (
              <p className="text-xs text-white/50 mt-0.5 break-all">{customerEmail}</p>
            )}
          </div>
          <div
            className="p-4 rounded-2xl text-left border border-white/8"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <Mail className="w-5 h-5 text-[#00E5FF] mb-2" />
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
              Questions?
            </p>
            <a
              href="mailto:hello@azulboatrentals.com"
              className="text-sm font-semibold text-[#00E5FF] hover:underline"
            >
              Email us
            </a>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm text-white transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
            boxShadow: "0 4px 20px rgba(255,45,120,0.35)",
          }}
        >
          ← Back to Azul Boat Rentals
        </Link>

        <p className="mt-6 text-xs text-white/20">
          Need to change your booking? Call us at (305) 690-3270
        </p>
      </div>
    </main>
  );
}
