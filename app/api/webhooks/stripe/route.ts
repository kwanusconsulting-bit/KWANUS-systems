import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const userId = session.metadata?.userId;
        if (userId) {
            await prisma.userSettings.upsert({
                where: { userId },
                create: { userId, emotionalEngineEnabled: true },
                update: { emotionalEngineEnabled: true },
            });
        }
    }

    if (event.type === "invoice.payment_succeeded") {
        // Handle successful recurring payment — extend as needed
    }

    if (event.type === "customer.subscription.updated") {
        // Handle subscription status changes (active → past_due, etc.)
    }

    return NextResponse.json({ received: true });
}
