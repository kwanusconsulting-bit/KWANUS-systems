"use client"

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Stewards", val: "1,204" },
        { label: "Active Harmonics", val: "88%" },
        { label: "Partner Node Sync", val: "42" },
        { label: "System Health", val: "99.9%" }
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving k-accent-indigo">
            <header className="border-b border-indigo-500/10 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic text-indigo-400">ADMIN CONTROL</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40 text-indigo-300">Governance & Infrastructure Management</p>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/30 px-6 py-2 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Nexus Prime Access</span>
                </div>
            </header>

            <div className="grid md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="k-glass-panel p-6 border-indigo-500/20">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{s.label}</div>
                        <div className="text-3xl font-black italic text-indigo-400">{s.val}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <section className="k-glass-panel p-8 space-y-6">
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">Operational Status</h2>
                    <div className="space-y-4">
                        {["Auth Engine", "Emotional API", "Partner Sink", "Data Vault"].map(s => (
                            <div key={s} className="flex justify-between items-center p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                                <span className="text-xs font-black uppercase tracking-widest">{s}</span>
                                <span className="text-[8px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Active</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="k-glass-panel p-8 space-y-6">
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">Recent Governance</h2>
                    <div className="space-y-4">
                        {[
                            "Config Change: Threshold 0x99 sealed",
                            "New Admin: Nexus-Alpha assigned",
                            "Job Completed: Data pruning script",
                            "Release V2.4 staged for rollout"
                        ].map((log, i) => (
                            <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                                <span>{log}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
