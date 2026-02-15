"use client"

import React, { useMemo } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { InsightCard } from './InsightCard';
import { Insight } from '@/lib/analytics/engines';

interface InsightFeedProps {
    insights: Insight[];
    domainFilter?: Insight['domain'];
}

export const InsightFeed = ({ insights, domainFilter }: InsightFeedProps) => {
    const { cognitiveLoad, shouldSimplifyUI } = useAccessibility();

    const filteredInsights = useMemo(() => {
        let feed = insights;

        // 1. Domain Filtering
        if (domainFilter) {
            feed = feed.filter(i => i.domain === domainFilter);
        }

        // 2. EMOTIONAL-ADAPTIVE DELIVERY PACING
        // Worst mode → fewer insights, only high importance/essential
        if (cognitiveLoad === 'minimal') {
            feed = feed.filter((i: any) => i.importance === 'essential' || i.importance === 'high');
        }

        return feed;
    }, [insights, domainFilter, cognitiveLoad]);

    if (filteredInsights.length === 0) {
        return (
            <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl opacity-20">
                <p className="text-[10px] font-black uppercase tracking-[0.8em]">
                    {shouldSimplifyUI ? 'SYSTEM_QUIET_MODE_ACTIVE' : 'NO_INSIGHTS_DETECTED'}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-k-fade">
            {filteredInsights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
            ))}
        </div>
    );
};
