"use client"

export const dynamic = "force-dynamic";

import React from 'react';
import { PanelLayout } from '@/components/layout/PanelLayout';
import { InsightCard } from '@/components/analytics/InsightCard';
import { emotionalInsightEngine, hybridEngine, partnerEngine } from '@/lib/analytics/engines';

export default function AnalyticsPage() {
    // Mock Data Fetching for Initial Demonstration
    const insights = [
        emotionalInsightEngine.analyzeTrend([]),
        hybridEngine.getTopOpportunity({}),
        partnerEngine.getHarmonicShift([])
    ].filter(Boolean) as any[];

    return (
        <PanelLayout
            title="Understanding Nexus"
            subtitle="Analytics & Pattern Recognition"
            primary={
                <div className="space-y-8">
                    <header className="border-b border-white/5 pb-8 space-y-2">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">System Insights</h2>
                        <h3 className="text-4xl font-black tracking-tighter uppercase italic">RESIDENCE FREQUENCY</h3>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {insights.map(i => <InsightCard key={i.id} insight={i} />)}
                    </div>
                </div>
            }
            secondary={
                <div className="space-y-12">
                    <section className="space-y-6">
                        <h4 className="text-[8px] font-black uppercase tracking-widest k-accent">Emotional Trends</h4>
                        <div className="h-48 rounded-3xl bg-black border border-white/5 flex items-center justify-center opacity-20 italic text-[10px]">
                            [Trend_Line_Mapping_Active]
                        </div>
                    </section>
                </div>
            }
        />
    );
}
