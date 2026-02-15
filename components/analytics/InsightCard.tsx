"use client"

import React from 'react';
import { Insight } from '@/lib/analytics/engines';

export const InsightCard = ({ insight }: { insight: Insight }) => {
    const domainColors = {
        emotional: 'k-accent',
        hybrid: 'text-indigo-400',
        partner: 'text-purple-400',
        productivity: 'text-emerald-400',
        system: 'text-white/40'
    };

    return (
        <div className="k-glass-panel p-6 space-y-4 border-white/5 hover:border-white/10 transition-all k-hover-lift group">
            <header className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em]">
                <span className={domainColors[insight.domain]}>{insight.domain}</span>
                <span className="opacity-20">{insight.type}</span>
            </header>

            <p className="text-xs font-bold leading-relaxed tracking-wide text-white/80 italic">
                &quot;{insight.message}&quot;
            </p>

            <footer className="pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full k-accent-bg"
                        style={{ width: `${insight.intensity * 100}%` }}
                    />
                </div>
                <span className="text-[6px] font-black opacity-40 uppercase tracking-widest">{new Date(insight.createdAt).toLocaleTimeString()}</span>
            </footer>
        </div>
    );
};
