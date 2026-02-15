export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';

export default function MessagesPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
            <header>
                <h1 className="text-4xl font-black tracking-tighter italic">MESSAGES</h1>
                <p className="text-zinc-500 font-medium">Harmonic communication with the universe.</p>
            </header>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Threads */}
                <Panel className="w-80 overflow-y-auto space-y-2 p-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all">
                            <h3 className="font-bold text-sm">System Guidance</h3>
                            <p className="text-[10px] text-zinc-500 uppercase font-black truncate">New resonance shift detected...</p>
                        </div>
                    ))}
                </Panel>

                {/* Bubble View */}
                <Panel className="flex-1 flex flex-col p-6 space-y-4">
                    <div className="flex-1 space-y-4 overflow-y-auto italic text-zinc-600 flex flex-col justify-center text-center">
                        Select a thread to view resonance history.
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5">
                        <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" placeholder="Enter resonance message..." />
                        <button className="px-6 py-3 bg-white text-black font-black uppercase tracking-widest rounded-xl text-xs">Send</button>
                    </div>
                </Panel>
            </div>
        </div>
    );
}
