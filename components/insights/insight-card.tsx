import React from 'react';
import { Card } from '@/components/ui/card';
import { Insight } from '@/lib/insights/types';

export const InsightCard = ({ insight }: { insight: Insight }) => {
    return (
        <Card variant="default" className="space-y-4 border-l-4 border-l-emerald-500/50">
            <div className="flex justify-between items-start">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{insight.domain}</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">{insight.type}</span>
            </div>
            <p className="text-sm font-medium leading-relaxed">{insight.message}</p>
        </Card>
    );
};
