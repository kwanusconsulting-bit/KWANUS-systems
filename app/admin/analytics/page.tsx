"use client"

export const dynamic = "force-dynamic";

import React from 'react';
import { PanelLayout } from '@/components/layout/PanelLayout';
import { InsightCard } from '@/components/analytics/InsightCard';
import { systemEngine } from '@/lib/analytics/engines';

export default function AdminAnalyticsPage() {
    const systemInsights = systemEngine.getHealth();

    return (
        <PanelLayout
            title="Nexus Operations"
            subtitle="System Infrastructure & Health"
            primary={
                <div className="space-y-12">
                    <header className="space-y-2">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">Operational Status</h2>
                        <h3 className="text-4xl font-black tracking-tighter uppercase italic">SYSTEM RESONANCE</h3>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {systemInsights.map(i => <InsightCard key={i.id} insight={i} />)}
                    </div>

                    <div className="k-glass-panel p-12 text-center opacity-20 italic">
                        <p className="text-[10px] font-black uppercase tracking-[0.8em]">ADMIN_TELEMETRY_STREAM_CONNECTED</p>
                    </div>
                </div>
            }
            secondary={
                <div className="space-y-8">
                    <h4 className="text-[8px] font-black uppercase tracking-widest text-indigo-400">Node Performance</h4>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center px-4 py-2 border border-white/5 rounded-xl">
                                <span className="text-[8px] font-bold opacity-40">NODE_PRIME_00{i}</span>
                                <span className="text-[8px] font-black k-accent">ACTIVE</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        />
    );
}
