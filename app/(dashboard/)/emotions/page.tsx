export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';

export default function EmotionsPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header>
                <h1 className="text-4xl font-black tracking-tighter italic">EMOTIONAL TIMELINE</h1>
                <p className="text-zinc-500 font-medium">The historical resonance of your journey.</p>
            </header>

            <Panel className="h-[400px] flex items-center justify-center">
                <div className="text-zinc-500 italic">Timeline Graph Visualization Placeholder</div>
            </Panel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Panel>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Top Resonance Markers</h2>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                            <span className="text-xs font-bold font-display">THRIVING</span>
                            <span className="text-[10px] text-zinc-600">Sept 12, 2026</span>
                        </li>
                        <li className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-blue-500/10">
                            <span className="text-xs font-bold font-display text-blue-400">PROTECTIVE</span>
                            <span className="text-[10px] text-zinc-600">Sept 10, 2026</span>
                        </li>
                    </ul>
                </Panel>

                <Panel>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Ceremonial Insights</h2>
                    <p className="text-sm text-zinc-400">Your resonance has stabilized significantly in the last 72 hours following the Partner Alignment ceremony.</p>
                </Panel>
            </div>
        </div>
    );
}
