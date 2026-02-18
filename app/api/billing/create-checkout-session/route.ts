import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { createRequestId, logger } from "@/lib/logger";
import { rateLimitRoute } from "@/lib/rate-limit";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover"
});

// POST /api/billing/create-checkout-session
// Body: { plan: "STARTER" | "PRO" }
export async function POST(req: Request) {
    const requestId = createRequestId();

    // Rate limit: 5/min per IP
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const allowed = rateLimitRoute(ip, "billing");
    if (!allowed) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { plan = "PRO" } = await req.json();

        // Resolve tenant from user
        const user = await prisma.user.findFirst({
            where: { clerkUserId: userId },
            include: { tenant: true }
        });

        if (!user?.tenant) {
            return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
        }

        const priceId = plan === "PRO"
            ? process.env.STRIPE_PRO_PRICE_ID
            : process.env.STRIPE_STARTER_PRICE_ID;

        if (!priceId) {
            return NextResponse.json({ error: `Price ID for ${plan} not configured` }, { status: 500 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            customer: user.tenant.stripeCustomerId ?? undefined,
            customer_email: user.tenant.stripeCustomerId ? undefined : user.email ?? undefined,
            line_items: [{ price: priceId, quantity: 1 }],
            metadata: { tenantId: user.tenant.id, plan, requestId },
            success_url: `${appUrl}/billing?success=true`,
            cancel_url: `${appUrl}/billing?canceled=true`
        });

        logger.info("Checkout session created", { requestId, tenantId: user.tenant.id, plan });

        await prisma.eventLog.create({
            data: {
                userId: user.id,
                tenantId: user.tenant.id,
                action: "BILLING_CHECKOUT_CREATED",
                resource: "Stripe",
                metadata: JSON.stringify({ plan, requestId, sessionId: session.id })
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        logger.error("Checkout session error", { requestId, error: error.message });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
