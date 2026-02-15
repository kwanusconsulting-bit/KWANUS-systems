"use client"

export const dynamic = "force-dynamic";;

import { useEffect, useState } from "react";
import Link from "next/link";

type Dispute = {
    id: string;
    status: string;
    emotionalState: string;
    createdAt: string;
};

export default function DisputeCenterPage() {
    const [disputes, setDisputes] = useState<Dispute[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/disputes");
            const data = await res.json();
            if (Array.isArray(data)) {
                setDisputes(data);
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="p-6 text-gray-400">
                Loading your dispute center…
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <header className="space-y-2">
                <h1 className="text-2xl font-semibold">Dispute Center</h1>
                <p className="text-gray-500">
                    Track, manage, and continue your dispute journey.
                </p>
            </header>

            <div className="flex justify-end">
                <Link
                    href="/disputes/new"
                    className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                    Start New Dispute
                </Link>
            </div>

            {disputes.length === 0 ? (
                <div className="text-gray-500 text-center py-12">
                    You haven’t started any disputes yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {disputes.map((d) => (
                        <Link
                            key={d.id}
                            href={`/disputes/${d.id}`}
                            className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-medium">Dispute #{d.id.slice(0, 6)}</h2>
                                    <p className="text-sm text-gray-500">
                                        Created {new Date(d.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-medium">{d.status}</span>
                                    <p className="text-xs text-gray-400">
                                        Emotional state: {d.emotionalState}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
