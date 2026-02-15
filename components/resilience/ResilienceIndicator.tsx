"use client"

import React from 'react';
import { useResilience } from '@/hooks/useResilience';
import { cn } from '@/lib/utils';

export const ResilienceIndicator = () => {
    const { status, isOffline, isDegraded } = useResilience();

    const statusColors: Record<string, string> = {
        online: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
        degraded: 'bg-amber-500 animate-pulse',
        offline: 'bg-red-500'
    };

    return (
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] transition-all hover:bg-white/5 group">
            <div className={cn("w-1.5 h-1.5 rounded-full", statusColors[status])} />
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                {isOffline ? 'OFFLINE_MODE' : isDegraded ? 'DEGRADED_SIGNAL' : 'RESONANCE_STABLE'}
            </span>
        </div>
    );
};
