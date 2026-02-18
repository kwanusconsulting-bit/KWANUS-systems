import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { logger } from "@/lib/logger";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover"
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
        logger.error("Stripe webhook signature failed", { error: err.message });
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Idempotency: Check if this event ID was already processed
    const processed = await prisma.eventLog.findFirst({
        where: {
            resource: "Stripe",
            action: "WEBHOOK_PROCESSED",
            metadata: { contains: event.id }
        }
    });

    if (processed) {
        logger.info("Stripe event already processed", { eventId: event.id });
        return NextResponse.json({ received: true });
    }

    // Log receipt immediately (acts as lock/record)
    await prisma.eventLog.create({
        data: {
            action: "WEBHOOK_PROCESSED",
            resource: "Stripe",
            metadata: JSON.stringify({ eventId: event.id, type: event.type })
        }
    });

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const tenantId = session.metadata?.tenantId;
            const plan = session.metadata?.plan ?? "STARTER";

            if (tenantId && session.customer && session.subscription) {
                await prisma.tenant.update({
                    where: { id: tenantId },
                    data: {
                        stripeCustomerId: session.customer as string,
                        stripeSubscriptionId: session.subscription as string,
                        billingStatus: "ACTIVE",
                        plan: plan.toUpperCase(),
                        billingUpdatedAt: new Date()
                    }
                });

                await prisma.eventLog.create({
                    data: {
                        tenantId,
                        action: "BILLING_SUBSCRIPTION_ACTIVATED",
                        resource: "Stripe",
                        metadata: JSON.stringify({ plan, customerId: session.customer, subscriptionId: session.subscription })
                    }
                });

                logger.info("Subscription activated", { tenantId, plan });
            }
        }

        if (event.type === "customer.subscription.updated") {
            const subscription = event.data.object as Stripe.Subscription;
            const tenant = await prisma.tenant.findFirst({
                where: { stripeSubscriptionId: subscription.id }
            });

            if (tenant) {
                const status = subscription.status === "active" ? "ACTIVE"
                    : subscription.status === "past_due" ? "PAST_DUE"
                        : subscription.status === "canceled" ? "CANCELED"
                            : "ACTIVE";

                // Derive plan from price metadata if available
                const priceId = subscription.items.data[0]?.price?.id;
                const plan = priceId === process.env.STRIPE_PRO_PRICE_ID ? "PRO" : "STARTER";

                await prisma.tenant.update({
                    where: { id: tenant.id },
                    data: { billingStatus: status, plan, billingUpdatedAt: new Date() }
                });

                await prisma.eventLog.create({
                    data: {
                        tenantId: tenant.id,
                        action: "BILLING_SUBSCRIPTION_UPDATED",
                        resource: "Stripe",
                        metadata: JSON.stringify({ status, plan, subscriptionId: subscription.id })
                    }
                });

                logger.info("Subscription updated", { tenantId: tenant.id, status, plan });
            }
        }

        if (event.type === "customer.subscription.deleted") {
            const subscription = event.data.object as Stripe.Subscription;
            const tenant = await prisma.tenant.findFirst({
                where: { stripeSubscriptionId: subscription.id }
            });

            if (tenant) {
                await prisma.tenant.update({
                    where: { id: tenant.id },
                    data: {
                        billingStatus: "CANCELED",
                        plan: "STARTER",
                        billingUpdatedAt: new Date()
                    }
                });

                await prisma.eventLog.create({
                    data: {
                        tenantId: tenant.id,
                        action: "BILLING_SUBSCRIPTION_CANCELED",
                        resource: "Stripe",
                        metadata: JSON.stringify({ subscriptionId: subscription.id })
                    }
                });

                logger.info("Subscription canceled", { tenantId: tenant.id });
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        logger.error("Webhook handler error", { error: error.message, eventType: event.type });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
