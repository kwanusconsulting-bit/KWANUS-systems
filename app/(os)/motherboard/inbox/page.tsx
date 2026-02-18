"use client";

import React, { useEffect, useState } from "react";

interface DecisionCard {
    id: string;
    title: string;
    description: string;
    status: string;
    type: string;
    actionLabel?: string;
    actionUrl?: string;
}

export default function InboxPage() {
    const [cards, setCards] = useState<DecisionCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/decision-cards")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCards(data);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleAction = async (id: string, action: string) => {
        try {
            const res = await fetch(`/api/decision-cards/${id}/action`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });
            if (res.ok) {
                // Refresh list or update local state
                setCards((prev) =>
                    prev.map((c) =>
                        c.id === id ? { ...c, status: action === "DISMISS" ? "DISMISSED" : "ACTIONED" } : c
                    )
                );
            }
        } catch (error) {
            console.error("Action failed", error);
        }
    };

    const [running, setRunning] = useState(false);

    const handleRunMotherboard = async () => {
        setRunning(true);
        try {
            await fetch("/api/motherboard/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
            // Refresh cards
            const res = await fetch("/api/decision-cards");
            const data = await res.json();
            if (Array.isArray(data)) setCards(data);
        } catch (err) {
            console.error("Run failed", err);
        } finally {
            setRunning(false);
        }
    };

    const handleExportAudit = async () => {
        try {
            const res = await fetch("/api/audit/export");
            const data = await res.json();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `audit-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed", err);
        }
    };

    if (loading) return <div className="p-8 text-white/50">Loading Inbox...</div>;

    return (
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
            <header className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Inbox</h1>
                    <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase">Decision &amp; Action Center</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleRunMotherboard}
                        disabled={running}
                        className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 rounded-lg transition-colors border border-violet-500/20 disabled:opacity-40"
                    >
                        {running ? "Running..." : "Run Motherboard"}
                    </button>
                    <button
                        onClick={handleExportAudit}
                        className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-white/10 text-white/60 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                    >
                        Export Audit
                    </button>
                </div>
            </header>

            <div className="space-y-4">
                {cards.length === 0 && (
                    <div className="p-12 border border-white/10 rounded-2xl text-center text-white/30 font-mono text-sm">
                        NO PENDING DECISIONS
                    </div>
                )}
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all ${card.status !== "PENDING" ? "opacity-40 grayscale" : "hover:border-white/20"
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`text-[10px] font-black px-2 py-1 rounded bg-white/10 uppercase tracking-widest ${card.type === "URGENT" ? "text-rose-400" : "text-emerald-400"
                                            }`}
                                    >
                                        {card.type}
                                    </span>
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                                        {card.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                                <p className="text-white/60 text-sm max-w-xl">{card.description}</p>
                            </div>
                            {card.status === "PENDING" && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleAction(card.id, "DISMISS")}
                                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        onClick={() => handleAction(card.id, "COMPLETE")}
                                        className="px-6 py-2 text-xs font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors border border-emerald-500/20"
                                    >
                                        {card.actionLabel || "Complete"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
