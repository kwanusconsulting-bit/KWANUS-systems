"use client"

export const dynamic = "force-dynamic";;

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type TimelineEvent = {
    id: string;
    type: string;
    message: string;
    createdAt: string;
};

type Round = {
    id: string;
    roundNumber: number;
    status: string;
    submittedAt?: string;
    bureauResponses: {
        id: string;
        bureau: string;
        status: string;
        message?: string;
        receivedAt: string;
    }[];
};

type Dispute = {
    id: string;
    status: string;
    emotionalState: string;
    createdAt: string;
    rounds: Round[];
    timeline: TimelineEvent[];
};

export default function DisputeTimelinePage() {
    const params = useParams();
    const disputeId = params?.id as string;

    const [dispute, setDispute] = useState<Dispute | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!disputeId) return;
            try {
                const res = await fetch(`/api/disputes/${disputeId}`);
                const data = await res.json();
                setDispute(data);
            } catch (error) {
                console.error("Failed to load dispute:", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [disputeId]);

    if (loading) {
        return (
            <div className="p-6 text-gray-400">
                Loading your dispute timeline…
            </div>
        );
    }

    if (!dispute) {
        return (
            <div className="p-6 text-red-500">
                Dispute not found.
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 max-w-3xl mx-auto">
            <header className="space-y-2">
                <h1 className="text-2xl font-semibold">Dispute Timeline</h1>
                <p className="text-gray-500">
                    Tracking your dispute from creation to completion.
                </p>

                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <p><strong>Status:</strong> {dispute.status}</p>
                    <p><strong>Emotional State:</strong> {dispute.emotionalState}</p>
                    <p><strong>Created:</strong> {new Date(dispute.createdAt).toLocaleDateString()}</p>
                </div>
            </header>

            <section className="space-y-6">
                <h2 className="text-xl font-medium">Rounds</h2>

                {dispute.rounds?.length === 0 ? (
                    <p className="text-gray-500">No rounds yet.</p>
                ) : (
                    dispute.rounds?.map((round) => (
                        <div
                            key={round.id}
                            className="border border-gray-200 rounded-lg p-4 space-y-4"
                        >
                            <div className="flex justify-between">
                                <h3 className="font-medium">Round {round.roundNumber}</h3>
                                <span className="text-sm text-gray-500">{round.status}</span>
                            </div>

                            {round.submittedAt && (
                                <p className="text-sm text-gray-500">
                                    Submitted {new Date(round.submittedAt).toLocaleDateString()}
                                </p>
                            )}

                            {round.bureauResponses?.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm text-gray-700">Bureau Responses</h4>
                                    {round.bureauResponses.map((resp) => (
                                        <div
                                            key={resp.id}
                                            className="border border-gray-100 rounded-md p-3 bg-white shadow-sm"
                                        >
                                            <p><strong>{resp.bureau}</strong></p>
                                            <p className="text-sm text-gray-500">{resp.status}</p>
                                            {resp.message && (
                                                <p className="text-sm mt-1">{resp.message}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1">
                                                Received {new Date(resp.receivedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-medium">Timeline Events</h2>

                {dispute.timeline?.length === 0 ? (
                    <p className="text-gray-500">No events yet.</p>
                ) : (
                    <div className="space-y-4">
                        {dispute.timeline?.map((event) => (
                            <div
                                key={event.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white"
                            >
                                <p className="font-medium">{event.type}</p>
                                <p className="text-sm text-gray-600">{event.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(event.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
