"use client"

export const dynamic = "force-dynamic";

export default function BroadcastComposer() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving k-accent-indigo">
            <header className="border-b border-indigo-500/10 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-indigo-400">BROADCAST COMPOSER</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40 text-indigo-300">Nexus-Wide Transmission & Announcement Engine</p>
            </header>
            <div className="max-w-4xl mx-auto k-glass-panel p-12 space-y-8 border-indigo-500/10">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Announcement Content</label>
                    <textarea className="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 text-xs h-40 outline-none focus:border-indigo-500 uppercase font-bold tracking-tight" placeholder="ENTER TRANSMISSION..."></textarea>
                </div>
                <button className="w-full py-5 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.5em] hover:scale-[1.01] transition-transform">
                    TRANSMIT TO ALL STEWARDS
                </button>
            </div>
        </main>
    );
}
