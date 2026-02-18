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

// POST /api/billing/portal
// Opens Stripe Customer Portal for the authenticated tenant
export async function POST(req: Request) {
    const requestId = createRequestId();

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
        const user = await prisma.user.findFirst({
            where: { clerkUserId: userId },
            include: { tenant: true }
        });

        if (!user?.tenant) {
            return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
        }

        if (!user.tenant.stripeCustomerId) {
            return NextResponse.json(
                { error: "No active subscription found. Please subscribe first." },
                { status: 400 }
            );
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

        const session = await stripe.billingPortal.sessions.create({
            customer: user.tenant.stripeCustomerId,
            return_url: `${appUrl}/billing`
        });

        logger.info("Portal session created", { requestId, tenantId: user.tenant.id });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        logger.error("Portal session error", { requestId, error: error.message });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
