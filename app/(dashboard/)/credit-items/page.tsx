export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';

export default function CreditItemsPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter italic">CREDIT ITEMS</h1>
                    <p className="text-zinc-500 font-medium">Managing the components of your financial resonance.</p>
                </div>
                <button className="px-6 py-4 bg-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-colors text-xs border border-white/10">
                    Upload Report
                </button>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map((i) => (
                    <Panel key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs">
                                CH
                            </div>
                            <div>
                                <h3 className="font-bold">CHASE BANK</h3>
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Account Ending in 4291</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-12">
                            <div className="text-right">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Impact</div>
                                <div className="text-emerald-500 font-black">+12 PTS</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Status</div>
                                <div className="text-white font-black">VERIFIED</div>
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    );
}
