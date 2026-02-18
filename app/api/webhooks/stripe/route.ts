import { NextResponse } from "next/server";

// TODO: Install `stripe` package and configure STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET
// to activate this webhook handler.
// npm install stripe

export async function POST(_req: Request) {
    return NextResponse.json(
        { error: "Stripe webhook not configured. Install stripe package and set env vars." },
        { status: 501 }
    );
}
