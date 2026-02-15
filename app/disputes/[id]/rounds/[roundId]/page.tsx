"use client"

export const dynamic = "force-dynamic";;

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BureauResponse = {
    id: string;
    bureau: string;
    status: string;
    message?: string;
    receivedAt: string;
};

type Round = {
    id: string;
    roundNumber: number;
    status: string;
    submittedAt?: string;
    bureauResponses: BureauResponse[];
};

export default function RoundStatusPage() {
    const params = useParams();
    const disputeId = params?.id as string;
    const roundId = params?.roundId as string;

    const [round, setRound] = useState<Round | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!disputeId || !roundId) return;
            try {
                const res = await fetch(`/api/disputes/${disputeId}`);
                const data = await res.json();

                const found = data.rounds?.find((r: Round) => r.id === roundId);
                setRound(found || null);
            } catch (error) {
                console.error("Failed to load round status:", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [disputeId, roundId]);

    if (loading) {
        return (
            <div className="p-6 text-gray-400">
                Loading round status…
            </div>
        );
    }

    if (!round) {
        return (
            <div className="p-6 text-red-500">
                Round not found.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-8">
            <header className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <span className="cursor-pointer hover:underline" onClick={() => window.history.back()}>Back to Timeline</span>
                    <span>/</span>
                    <span>Round {round.roundNumber}</span>
                </div>
                <h1 className="text-2xl font-semibold">
                    Round {round.roundNumber}
                </h1>
                <p className="text-gray-500">
                    Tracking the status and bureau responses for this round.
                </p>

                <div className="mt-4 p-4 border rounded-md bg-gray-50 flex justify-between items-center">
                    <div>
                        <p><strong>Status:</strong> {round.status}</p>
                        {round.submittedAt && (
                            <p>
                                <strong>Submitted:</strong>{" "}
                                {new Date(round.submittedAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                    <div className="text-xs font-mono text-gray-400">
                        ID: {round.id}
                    </div>
                </div>
            </header>

            <section className="space-y-6">
                <h2 className="text-xl font-medium">Bureau Responses</h2>

                {(!round.bureauResponses || round.bureauResponses.length === 0) ? (
                    <p className="text-gray-500">No responses yet.</p>
                ) : (
                    <div className="space-y-4">
                        {round.bureauResponses.map((resp) => (
                            <div
                                key={resp.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-900">{resp.bureau}</p>
                                        <p className="text-sm text-emerald-600 font-medium">{resp.status}</p>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {new Date(resp.receivedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {resp.message && (
                                    <p className="text-sm mt-3 text-gray-700 leading-relaxed border-t pt-3">
                                        {resp.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Next Steps</h2>
                <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
                    {round.status === "DRAFT" && (
                        <p className="text-blue-800">
                            This round is still in draft. Ensure all evidence is uploaded before submitting for bureau review.
                        </p>
                    )}

                    {round.status === "SUBMITTED" && (
                        <p className="text-blue-800">
                            Your dispute has been submitted. The bureaus have 30 days to complete their investigation. Check back for updates.
                        </p>
                    )}

                    {round.status === "RESPONDED" && (
                        <p className="text-blue-800">
                            Responses have been received. Review the status of each item to determine if a follow-up round is required.
                        </p>
                    )}

                    {round.status === "COMPLETED" && (
                        <p className="text-blue-800">
                            This round&apos;s lifecycle is complete. Results have been memorialized in your Credit Profile.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
