import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();

export async function GET() {
    const timestamp = new Date().toISOString();

    // 1. DB connectivity check
    let dbOk = false;
    try {
        await prisma.$queryRaw`SELECT 1`;
        dbOk = true;
    } catch {
        dbOk = false;
    }

    // 2. Stripe config present (boolean only — never expose key)
    const stripeOk = Boolean(
        process.env.STRIPE_SECRET_KEY &&
        process.env.STRIPE_SECRET_KEY !== "sk_test_placeholder" &&
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );

    // 3. Last cron run from EventLog
    let lastCronRun: string | null = null;
    try {
        const lastRun = await prisma.eventLog.findFirst({
            where: { action: "CRON_MOTHERBOARD_RUN" },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true }
        });
        lastCronRun = lastRun?.createdAt.toISOString() ?? null;
    } catch {
        lastCronRun = null;
    }

    // 4. Stripe connectivity (only if configured)
    let stripeReachable = false;
    if (stripeOk) {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
                apiVersion: "2026-01-28.clover"
            });
            await stripe.balance.retrieve();
            stripeReachable = true;
        } catch {
            stripeReachable = false;
        }
    }

    const ok = dbOk;

    return NextResponse.json(
        { ok, db: dbOk, stripe: stripeOk, stripeReachable, lastCronRun, timestamp },
        { status: ok ? 200 : 503 }
    );
}
