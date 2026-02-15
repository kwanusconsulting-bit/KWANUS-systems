"use client"

export const dynamic = "force-dynamic";

export default function WorkspacePage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">WORKSPACE</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Steward Launchpad & Personal Nexus</p>
                </div>
                <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Edit Layout
                </button>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* WIDGETS */}
                <div className="k-glass-panel p-8 min-h-[240px] flex flex-col justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40">Pending Motion</h3>
                    <div className="text-3xl font-black italic">4 ACTIVE</div>
                </div>
                <div className="k-glass-panel p-8 min-h-[240px] flex flex-col justify-between bg-indigo-500/5 border-indigo-500/20">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Harmonic State</h3>
                    <div className="text-3xl font-black italic text-indigo-400">THRIVING</div>
                </div>
                <div className="k-glass-panel p-8 min-h-[240px] flex flex-col justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40">Recent Pulse</h3>
                    <div className="text-xs font-bold uppercase tracking-tight opacity-60">Nexus config sealed successfully.</div>
                </div>
            </div>
        </main>
    );
}
