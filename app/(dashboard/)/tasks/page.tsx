export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';
import { Button } from '@/components/ui/button';

export default function TasksPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter italic">TASKS SYSTEM</h1>
                    <p className="text-zinc-500 font-medium">Operational grounding and productivity rituals.</p>
                </div>
                <Button variant="secondary" size="sm">New Task</Button>
            </header>

            <div className="space-y-4">
                {[
                    { title: 'Update Credit Profile', tag: 'FINANCIAL', status: 'TODO' },
                    { title: 'Complete Emotional Sync', tag: 'CEREMONIAL', status: 'ACTIVE' },
                    { title: 'Harmonize with Partner 1', tag: 'RELATIONAL', status: 'TODO' }
                ].map((task, i) => (
                    <Panel key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                task.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-white/20'
                            )} />
                            <div>
                                <h3 className="font-bold text-sm">{task.title}</h3>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">{task.tag}</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[10px]">Mark Complete</Button>
                    </Panel>
                ))}
            </div>
        </div>
    );
}

// Inline helper for task page since utils might be changing
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
