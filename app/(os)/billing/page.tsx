"use client";

import { useState } from "react";

export default function BillingPage() {
    const [loadingAction, setLoadingAction] = useState<string | null>(null);

    // In a real app, you'd fetch the current tenant plan from an API
    // For now, we'll assume it matches what the user sees or defaults
    // Here we're just wiring the buttons to the endpoints

    const handleSubscribe = async (plan: "STARTER" | "PRO") => {
        setLoadingAction(`subscribing-${plan}`);
        try {
            const res = await fetch("/api/billing/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan })
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else alert("Error: " + data.error);
        } catch (e) {
            alert("Failed to start checkout");
        } finally {
            setLoadingAction(null);
        }
    };

    const handlePortal = async () => {
        setLoadingAction("portal");
        try {
            const res = await fetch("/api/billing/portal", { method: "POST" });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else alert("Error: " + data.error);
        } catch (e) {
            alert("Failed to open portal");
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white p-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mb-2">
                Billing & Subscription
            </h1>
            <p className="text-white/40 mb-10">Manage your workspace plan.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Starter Plan */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2">Starter</h2>
                    <p className="text-white/60 mb-6 flex-grow">Essential dispute resolution tools.</p>
                    <div className="text-3xl font-bold mb-6">$49<span className="text-sm text-white/40 font-normal">/mo</span></div>
                    <button
                        onClick={() => handleSubscribe("STARTER")}
                        disabled={!!loadingAction}
                        className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium disabled:opacity-50"
                    >
                        {loadingAction === "subscribing-STARTER" ? "Processing..." : "Select Starter"}
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-xs px-3 py-1 rounded-bl-xl font-bold">RECOMMENDED</div>
                    <h2 className="text-xl font-semibold mb-2 text-indigo-300">Pro</h2>
                    <p className="text-white/60 mb-6 flex-grow">Advanced AI strategy and full automation.</p>
                    <div className="text-3xl font-bold mb-6">$99<span className="text-sm text-white/40 font-normal">/mo</span></div>
                    <button
                        onClick={() => handleSubscribe("PRO")}
                        disabled={!!loadingAction}
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium disabled:opacity-50"
                    >
                        {loadingAction === "subscribing-PRO" ? "Processing..." : "Select Pro"}
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <button
                    onClick={handlePortal}
                    disabled={!!loadingAction}
                    className="text-sm text-white/40 hover:text-white underline"
                >
                    Manage Existing Subscription via Stripe Portal
                </button>
            </div>
        </main>
    );
}
