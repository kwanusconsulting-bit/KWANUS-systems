"use client"

import React from 'react';
import { Button } from '@/components/ui/button';

export const ArrivalPhase = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <div className="space-y-12 max-w-2xl mx-auto text-center animate-k-fade">
            <header className="space-y-6">
                <div className="w-16 h-16 k-accent-bg rounded-full mx-auto flex items-center justify-center text-2xl font-black italic shadow-[0_0_30px_var(--ui-glow)]">K</div>
                <h1 className="text-6xl font-black tracking-tighter uppercase italic">WELCOME TO KWANUS</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">The Steward&apos;s Arrival Sequence</p>
            </header>

            <div className="k-glass-panel p-8 text-left space-y-6 border-white/10">
                <h2 className="text-xs font-black uppercase tracking-widest k-accent">Emotional Safety Statement</h2>
                <p className="text-[10px] font-medium opacity-60 leading-relaxed uppercase">
                    KWANUS is a tool for self-reflection and structural sovereignty. By entering, you understand that the OS will utilize emotional-adaptive logic to support your pacing, grounding, and productivity. Your data is your own.
                </p>

                <div className="pt-4 border-t border-white/5 space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <input type="checkbox" className="mt-1 accent-indigo-500" required />
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                            I accept the emotional safety guidelines and system-user resonance protocols.
                        </span>
                    </label>
                </div>
            </div>

            <Button onClick={onComplete} size="lg" className="w-full">Initialize Session</Button>
        </div>
    );
};
