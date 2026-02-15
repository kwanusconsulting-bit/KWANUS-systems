export const dynamic = "force-dynamic";
import Link from "next/link";
import { mockPartners } from "@/lib/data/mock";

export default function PartnerUniverse() {
    return (
        <main className="min-h-screen bg-background text-foreground p-8 space-y-8 k-mode-neutral">
            <header className="flex justify-between items-end pb-8 border-b border-white/5">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">PARTNER UNIVERSE</h1>
                    <p className="text-sm font-bold tracking-[0.3em] uppercase opacity-40">Cosmic Weave Navigation</p>
                </div>
                <Link href="/partners/map" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                    OPEN MAP VIEW
                </Link>
            </header>

            {/* PARTNER GRID (INTERCONNECTION) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockPartners.map((partner) => (
                    <div key={partner.id} className="k-glass-panel overflow-hidden group hover:k-accent-border transition-all">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-full border border-indigo-500/30 flex items-center justify-center font-black text-xl text-indigo-400">
                                    {partner.name[0]}
                                </div>
                                <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-black uppercase tracking-widest opacity-40">
                                    {partner.tier}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-black tracking-tighter uppercase italic">{partner.name}</h3>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400/60">{partner.state}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                                    <span>Harmonics</span>
                                    <span className="text-white">{partner.harmonic}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-4/5" />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-4">
                                {partner.capabilities.map((cap, i) => (
                                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-[8px] font-bold uppercase tracking-widest opacity-60 italic">
                                        {cap}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link
                            href={`/partners/${partner.id}`}
                            className="block w-full text-center py-4 bg-white/5 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-indigo-500/20 transition-colors"
                        >
                            VIEW LINEAGE
                        </Link>
                    </div>
                ))}
            </div>

            {/* BOTTOM WEAVE (GEOMETRY) */}
            <section className="k-glass-panel p-12 text-center space-y-4">
                <div className="text-6xl opacity-10">◈</div>
                <h2 className="text-2xl font-black tracking-tighter uppercase italic opacity-30">The Constellation is stable.</h2>
                <p className="text-xs font-bold uppercase tracking-widest opacity-20">Monitoring 48 operational threads across the KWANUS registry.</p>
            </section>
        </main>
    );
}
