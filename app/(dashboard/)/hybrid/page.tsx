export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';
import { Card } from '@/components/ui/card';

export default function HybridPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header>
                <h1 className="text-4xl font-black tracking-tighter italic">HYBRID OVERVIEW</h1>
                <p className="text-zinc-500 font-medium">Financial power fused with emotional resonance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="mythic" className="p-12 text-center">
                    <h2 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Total Hybrid Score</h2>
                    <div className="text-9xl font-black italic">742</div>
                    <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest">
                        Elite Tier Intelligence Active
                    </div>
                </Card>

                <div className="space-y-6">
                    <Panel>
                        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Threshold Analysis</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest font-black">
                                <span className="text-zinc-500">Stability Limit</span>
                                <span className="text-white">450</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-3/4" />
                            </div>
                        </div>
                    </Panel>

                    <Panel>
                        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Hybrid Risks</h2>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 italic text-sm text-blue-400">
                            Low intensity resonance may currently impact funding revalidation.
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    );
}
