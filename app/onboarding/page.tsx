"use client"

export const dynamic = "force-dynamic";

import React, { useState } from 'react';
import { ArrivalPhase } from '@/components/onboarding/Arrival';
import { cn } from '@/lib/utils';

export default function OnboardingPage() {
    const [phase, setPhase] = useState(1);

    const nextPhase = () => setPhase(prev => prev + 1);

    return (
        <main className="min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 z-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none" />

            {/* PHASE INDICATOR */}
            <div className="mb-12 flex gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div
                        key={i}
                        className={cn(
                            "w-12 h-1 rounded-full transition-all duration-1000",
                            phase >= i ? "k-accent-bg shadow-[0_0_10px_var(--ui-glow)]" : "bg-white/5"
                        )}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full">
                {phase === 1 && <ArrivalPhase onComplete={nextPhase} />}
                {phase > 1 && (
                    <div className="text-center space-y-8 animate-pulse">
                        <h2 className="text-xs font-black uppercase tracking-[0.8em] opacity-40">Sequencing Phase {phase}...</h2>
                        <button onClick={nextPhase} className="text-[10px] k-accent font-black uppercase tracking-widest">Skip Preview (MOCK)</button>
                    </div>
                )}
            </div>
        </main>
    );
}
