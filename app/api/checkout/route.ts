import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

const BOAT_RATE = 80;
const CAPTAIN_RATE = 50;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      date,
      time,
      duration,
      withCaptain,
      passengers,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
    } = body;

    // Validate required fields
    if (!date || !time || !duration || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required booking fields." },
        { status: 400 }
      );
    }

    const boatTotal = BOAT_RATE * Number(duration);
    const captainTotal = withCaptain ? CAPTAIN_RATE * Number(duration) : 0;
    const total = boatTotal + captainTotal;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Azul Boat Rental — ${duration}h Crownline 235 SS`,
            description: `${date} at ${time} | ${passengers} passengers${withCaptain ? " | With Captain" : " | Self-Drive"}`,
            images: [
              `${process.env.NEXT_PUBLIC_BASE_URL}/images/crownline1.jpg`,
            ],
          },
          unit_amount: boatTotal * 100,
        },
        quantity: 1,
      },
    ];

    if (withCaptain) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Licensed Captain — ${duration}h`,
            description: "Professional licensed captain for your rental",
            images: [],
          },
          unit_amount: captainTotal * 100,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      metadata: {
        date,
        time,
        duration: String(duration),
        withCaptain: String(withCaptain),
        passengers: String(passengers),
        firstName,
        lastName,
        phone,
        specialRequests: specialRequests || "",
        totalAmount: String(total),
      },
      success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: baseUrl,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Stripe checkout error:", message);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      { error: isDev ? message : "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
