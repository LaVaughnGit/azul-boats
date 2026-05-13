import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendCustomerConfirmation, sendBusinessNotification } from "@/lib/emails";
import type { BookingDetails } from "@/lib/emails";
import { supabaseServer } from "@/lib/supabase";

function timeToHour(time: string): number {
  const [timePart, period] = time.split(" ");
  const hours = Number(timePart.split(":")[0]);
  if (period === "AM") return hours === 12 ? 0 : hours;
  return hours === 12 ? 12 : hours + 12;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

// Required so Next.js doesn't buffer the body — Stripe signature needs the raw bytes
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Signature verification failed";
    console.error("Webhook signature error:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata ?? {};

    const booking: BookingDetails = {
      date: meta.date ?? "",
      time: meta.time ?? "",
      duration: Number(meta.duration ?? 1),
      withCaptain: meta.withCaptain === "true",
      passengers: Number(meta.passengers ?? 1),
      firstName: meta.firstName ?? "",
      lastName: meta.lastName ?? "",
      email: session.customer_email ?? meta.email ?? "",
      phone: meta.phone ?? "",
      totalAmount: Number(meta.totalAmount ?? 0),
      specialRequests: meta.specialRequests ?? "",
    };

    const startHour = timeToHour(booking.time);
    const endHour = startHour + booking.duration;

    await supabaseServer.from("bookings").insert({
      stripe_session_id: session.id,
      date: booking.date,
      start_hour: startHour,
      end_hour: endHour,
      duration_hours: booking.duration,
    });

    try {
      await Promise.all([
        sendCustomerConfirmation(booking),
        sendBusinessNotification(booking),
      ]);
      console.log(`Confirmation emails sent for booking: ${booking.firstName} ${booking.lastName} on ${booking.date}`);
    } catch (emailErr) {
      // Log email failure but still return 200 so Stripe doesn't retry the webhook
      console.error("Email send error:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
