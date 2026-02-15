"use client"

export const dynamic = "force-dynamic";

export default function MessagingHub() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">MESSAGING HUB</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Unified Communications & Adaptive Nudges</p>
            </header>
            <div className="flex gap-8 h-[600px]">
                <div className="w-80 k-glass-panel p-6 overflow-y-auto space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl opacity-40 hover:opacity-100 cursor-pointer transition-all">
                            <div className="text-[10px] font-black uppercase tracking-widest">Nexus Pulse 0x{i}</div>
                            <div className="text-[8px] opacity-40 uppercase truncate">Stability report pending...</div>
                        </div>
                    ))}
                </div>
                <div className="flex-1 k-glass-panel flex items-center justify-center opacity-20 text-[10px] font-black uppercase tracking-[1em]">
                    Select thread to view motion
                </div>
            </div>
        </main>
    );
}
