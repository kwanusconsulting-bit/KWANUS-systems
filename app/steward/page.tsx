export const dynamic = "force-dynamic";
import Link from "next/link";
import { mockEmotionalState, mockPartners, mockCreditItems } from "@/lib/data/mock";

export default function StewardConsole() {
    return (
        <main className="min-h-screen bg-background text-foreground p-8 space-y-8 k-mode-thriving">
            {/* HEADER (STILLNESS) */}
            <header className="flex justify-between items-end pb-8 border-b border-white/5">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic k-accent">STEWARD CONSOLE</h1>
                    <p className="text-sm font-bold tracking-[0.3em] uppercase opacity-40">System Active — Sequence 001</p>
                </div>
                <div className="text-right">
                    <div className="text-xs font-bold tracking-widest uppercase opacity-40">Emotional Frequency</div>
                    <div className="text-xl font-black uppercase italic text-indigo-400">{mockEmotionalState.tone} — {mockEmotionalState.harmonic}</div>
                </div>
            </header>

            {/* QUICK ACTIONS (MOMENTUM) */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "New Dispute", icon: "✦", path: "/dispute-center" },
                    { label: "Partner Map", icon: "◈", path: "/partners/map" },
                    { label: "Funding Check", icon: "✧", path: "/credit/overview" },
                    { label: "Ritual Sequence", icon: "◎", path: "/steward/rituals" }
                ].map((action, i) => (
                    <Link key={i} href={action.path} className="k-glass-panel p-6 flex flex-col items-center gap-3 hover:k-accent-border transition-all transform hover:-translate-y-1">
                        <span className="text-3xl opacity-50">{action.icon}</span>
                        <span className="text-xs font-black tracking-widest uppercase">{action.label}</span>
                    </Link>
                ))}
            </section>

            {/* SNAPSHOTS (INTERCONNECTION) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* EMOTIONAL SNAPSHOT */}
                <div className="k-glass-panel p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-black tracking-tighter uppercase italic">Emotional State</h2>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                            <span>Tone</span>
                            <span className="text-white">{mockEmotionalState.tone}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                            <span>Force</span>
                            <span className="text-white">{mockEmotionalState.force}</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-3/4" />
                        </div>
                    </div>
                </div>

                {/* CREDIT SNAPSHOT */}
                <div className="k-glass-panel p-8 space-y-6">
                    <h2 className="text-lg font-black tracking-tighter uppercase italic">Credit Health</h2>
                    <div className="flex items-end gap-2">
                        <span className="text-5xl font-black tracking-tighter italic k-accent">742</span>
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Steady</span>
                    </div>
                    <div className="space-y-2">
                        {mockCreditItems.map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded">
                                <span className="text-[10px] font-bold uppercase tracking-widest">{item.type}</span>
                                <span className="text-[10px] font-black uppercase text-indigo-400">{item.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PARTNER SNAPSHOT */}
                <div className="k-glass-panel p-8 space-y-6 lg:col-span-1 md:col-span-2">
                    <h2 className="text-lg font-black tracking-tighter uppercase italic">Partner Universe</h2>
                    <div className="flex -space-x-3">
                        {mockPartners.map((p, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-background flex items-center justify-center text-xs font-black">
                                {p.name[0]}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs font-medium text-white/40 italic">
                        {mockPartners.length} active threads in the cosmic weave.
                    </p>
                    <Link href="/partners" className="block text-center text-[10px] font-black uppercase tracking-[0.3em] py-2 border border-white/5 rounded hover:bg-white/5 transition-colors">
                        NAVIGATE UNIVERSE
                    </Link>
                </div>
            </div>
        </main>
    );
}
