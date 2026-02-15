"use client"

export const dynamic = "force-dynamic";

export default function JournalPage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">JOURNAL</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Emotional Reflection & Lineage Logs</p>
            </header>
            <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-4">
                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">New Entry</button>
                    <div className="space-y-2 opacity-40">
                        {[1, 2, 3].map(i => <div key={i} className="p-4 border border-white/5 rounded-xl text-[8px] font-bold uppercase">Nexus Day 0x{i} Log</div>)}
                    </div>
                </div>
                <div className="lg:col-span-3 k-glass-panel p-12 min-h-[500px]">
                    <div className="text-xs font-bold uppercase tracking-tight opacity-20">Select an entry to begin reflection...</div>
                </div>
            </div>
        </main>
    );
}
