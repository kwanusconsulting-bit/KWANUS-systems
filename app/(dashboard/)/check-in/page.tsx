export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';
import { Button } from '@/components/ui/button';

export default function CheckInPage() {
    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-black tracking-tighter italic">CHECK-IN CEREMONY</h1>
                <p className="text-zinc-500 font-medium">Align your resonance with the OS.</p>
            </header>

            <Panel className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Resonance Intensity</h2>
                    <input
                        type="range"
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        min="0" max="100"
                    />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-zinc-600">
                        <span>Muted</span>
                        <span>Baseline</span>
                        <span>Vibrant</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Emotional Archetype</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="secondary" className="border-emerald-500/20 text-emerald-500">Thriving</Button>
                        <Button variant="secondary">Steady</Button>
                        <Button variant="secondary">Reflective</Button>
                        <Button variant="secondary" className="border-blue-500/20 text-blue-500">Protective</Button>
                    </div>
                </div>

                <Button className="w-full py-6">Submit Ceremony</Button>
            </Panel>
        </div>
    );
}
