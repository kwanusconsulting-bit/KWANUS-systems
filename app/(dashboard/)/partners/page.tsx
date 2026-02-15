export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';
import { Card } from '@/components/ui/card';

export default function PartnersPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header>
                <h1 className="text-4xl font-black tracking-tighter italic">PARTNER UNIVERSE</h1>
                <p className="text-zinc-500 font-medium">The harmonics of your external connections.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} variant="mythic" className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto border border-white/10" />
                        <div>
                            <h3 className="text-xl font-black italic">Partner {i}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Resonance Harmony</p>
                        </div>
                        <div className="text-2xl font-black text-emerald-500">0.95</div>
                    </Card>
                ))}
            </div>

            <Panel>
                <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Relational Insights</h2>
                <p className="text-sm text-zinc-400 italic font-medium">Your collective alignment has increased 12% since the last sync event.</p>
            </Panel>
        </div>
    );
}
