export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter italic">NEXUS DASHBOARD</h1>
                    <p className="text-zinc-500 font-medium">Steward Command Center</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Emotional Snapshot */}
                <Panel className="md:col-span-2">
                    <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Emotional Snapshot</h2>
                    <div className="h-48 flex items-center justify-center border border-white/5 rounded-2xl bg-white/5 italic text-zinc-500">
                        Resonance Visualization Placeholder
                    </div>
                </Panel>

                {/* Hybrid Score */}
                <Card variant="mythic" className="flex flex-col justify-center text-center">
                    <h2 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Hybrid Score</h2>
                    <div className="text-7xl font-black italic">742</div>
                    <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold mt-2">Elite Tier</div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Panel>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Harmonics</h3>
                    <div className="text-2xl font-bold">0.92</div>
                </Panel>
                <Panel>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Tasks</h3>
                    <div className="text-2xl font-bold">12 Active</div>
                </Panel>
                <Panel>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Insights</h3>
                    <div className="text-2xl font-bold">3 New</div>
                </Panel>
                <Panel>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Resilience</h3>
                    <div className="text-2xl font-bold">Stable</div>
                </Panel>
            </div>
        </div>
    );
}
