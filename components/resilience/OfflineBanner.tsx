"use client"

import React from 'react';
import { useResilience } from '@/hooks/useResilience';
import { useEI } from '@/context/EmotionalIntelligenceProvider';
import { cn } from '@/lib/utils';

export const OfflineBanner = () => {
    const { isOffline, isDegraded } = useResilience();
    const { mode } = useEI();

    if (!isOffline && !isDegraded) return null;

    return (
        <div className={cn(
            "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-8 py-4 k-glass-panel border-white/10 flex items-center gap-6 animate-bounce-subtle",
            isOffline ? "border-red-500/20 bg-red-500/5" : "border-amber-500/20 bg-amber-500/5"
        )}>
            <div className="flex flex-col">
                <h4 className="text-[10px] font-black uppercase tracking-widest leading-none">
                    {isOffline ? 'SYSTEM_STABILITY: LOCAL_ONLY' : 'SIGNAL_VOLATILITY_DETECTED'}
                </h4>
                <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest mt-1">
                    {mode === 'worst'
                        ? "Rest easy. Your progress is safe."
                        : "Connectivity is fluctuating. We'll sync as soon as resonance returns."}
                </p>
            </div>

            <div className="w-1.5 h-1.5 rounded-full k-accent-bg animate-ping" />
        </div>
    );
};
