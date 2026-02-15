"use client"

export const dynamic = "force-dynamic";;

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "intro" | "creditor" | "reason" | "review" | "complete";

export default function DisputeWizardPage() {
    const router = useRouter();

    const [step, setStep] = useState<Step>("intro");
    const [creditor, setCreditor] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    async function startDispute() {
        setLoading(true);

        // In a real app, userId would come from the session context or AuthProvider
        const res = await fetch("/api/disputes", {
            method: "POST",
            body: JSON.stringify({ userId: "demo-user" }),
        });

        const dispute = await res.json();

        // Create first round
        await fetch(`/api/disputes/${dispute.id}/rounds`, {
            method: "POST",
        });

        setLoading(false);
        setStep("creditor");
    }

    async function submit() {
        setLoading(true);

        // This logic follows the user request to create the full container on submit
        // Note: startDispute already created a dispute/round. For a clean wizard, 
        // we would usually update the existing one, but we'll follow the provided sequential logic.

        // Create dispute
        const res = await fetch("/api/disputes", {
            method: "POST",
            body: JSON.stringify({ userId: "demo-user" }),
        });

        const dispute = await res.json();

        // Create round
        const roundRes = await fetch(`/api/disputes/${dispute.id}/rounds`, {
            method: "POST",
        });
        const round = await roundRes.json();

        // Add item (Evidence as a note for the reason)
        await fetch("/api/evidence", {
            method: "POST",
            body: JSON.stringify({
                disputeId: dispute.id,
                url: "note://reason",
                type: "NOTE",
            }),
        });

        // Submit round
        await fetch(`/api/rounds/${round.id}/submit`, {
            method: "POST",
        });

        setLoading(false);
        setStep("complete");

        setTimeout(() => {
            router.push(`/disputes/${dispute.id}`);
        }, 1500);
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-8">
            {step === "intro" && (
                <div className="space-y-4">
                    <h1 className="text-2xl font-semibold">Start a Dispute</h1>
                    <p className="text-gray-500">
                        This guided flow will help you create your dispute with clarity and confidence.
                    </p>

                    <button
                        onClick={startDispute}
                        disabled={loading}
                        className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    >
                        {loading ? "Preparing…" : "Begin"}
                    </button>
                </div>
            )}

            {step === "creditor" && (
                <div className="space-y-4">
                    <h2 className="text-xl font-medium">Who is the creditor?</h2>

                    <input
                        value={creditor}
                        onChange={(e) => setCreditor(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
                        placeholder="e.g., Capital One"
                    />

                    <button
                        onClick={() => setStep("reason")}
                        disabled={!creditor}
                        className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === "reason" && (
                <div className="space-y-4">
                    <h2 className="text-xl font-medium">Why are you disputing this?</h2>

                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 h-32 bg-white text-black"
                        placeholder="Explain the issue clearly…"
                    />

                    <button
                        onClick={() => setStep("review")}
                        disabled={!reason}
                        className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
                    >
                        Review
                    </button>
                </div>
            )}

            {step === "review" && (
                <div className="space-y-4">
                    <h2 className="text-xl font-medium">Review Your Dispute</h2>

                    <div className="border border-gray-200 rounded-md p-4 space-y-2 bg-gray-50">
                        <p><strong>Creditor:</strong> {creditor}</p>
                        <p><strong>Reason:</strong> {reason}</p>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={() => setStep("reason")}
                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={submit}
                            disabled={loading}
                            className="flex-1 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
                        >
                            {loading ? "Submitting…" : "Submit Dispute"}
                        </button>
                    </div>
                </div>
            )}

            {step === "complete" && (
                <div className="space-y-4 text-center">
                    <h2 className="text-xl font-medium">Your dispute has been submitted</h2>
                    <p className="text-gray-500">Redirecting to your dispute timeline…</p>
                </div>
            )}
        </div>
    );
}
