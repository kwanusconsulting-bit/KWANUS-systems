export const dynamic = "force-dynamic";
import React from 'react';
import { Card } from '@/components/ui/card';

export default function NotesPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter italic">NOTES SYSTEM</h1>
                    <p className="text-zinc-500 font-medium">Reflections and mental archives.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="h-64 flex flex-col justify-between">
                        <p className="text-sm text-zinc-400">Reflection entry from Sept {10 + i}, 2026. The OS feeling indicates a steady transition toward vitality.</p>
                        <div className="flex justify-between items-center text-[10px] tracking-widest font-black uppercase text-zinc-600">
                            <span>RESONANCE: STEADY</span>
                            <span>#CEREMONY</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
