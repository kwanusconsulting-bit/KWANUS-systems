export const dynamic = "force-dynamic";
import { cn } from "@/lib/utils";

export default function TutorialsPage() {
    const tutorials = [
        { title: "Calibrating the Emotional Engine", duration: "3m", level: "Foundation", completed: true },
        { title: "Navigating the Partner Universe", duration: "5m", level: "Operational", completed: false },
        { title: "Understanding Hybrid Score Logic", duration: "4m", level: "Foundation", completed: false },
        { title: "Ritual Mastering: Threshold Seals", duration: "8m", level: "Advanced", completed: false },
        { title: "Lineage Archiving Protocols", duration: "6m", level: "Operational", completed: false },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">TUTORIALS</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Guided Interactive Pathing</p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black uppercase opacity-40">Progress Seal</div>
                    <div className="text-sm font-black italic uppercase text-indigo-400">20% Mastered</div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutorials.map((t, i) => (
                    <div key={i} className={cn(
                        "k-glass-panel p-8 space-y-8 group hover:k-accent-border transition-all cursor-pointer relative overflow-hidden",
                        t.completed && "border-emerald-500/30 bg-emerald-500/5 opacity-60 hover:opacity-100"
                    )}>
                        <div className="flex justify-between items-start relative z-10">
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 px-2 py-1 bg-white/5 rounded">
                                {t.level}
                            </span>
                            {t.completed && <span className="text-[8px] font-black uppercase text-emerald-400">Completed</span>}
                        </div>

                        <div className="space-y-2 relative z-10">
                            <h3 className="text-xl font-black tracking-tighter uppercase italic leading-tight">{t.title}</h3>
                            <div className="text-[10px] font-bold uppercase opacity-30">{t.duration} estimated duration</div>
                        </div>

                        <button className="w-full py-4 border border-white/10 group-hover:bg-white text-black bg-white/5 group-hover:text-black text-[10px] font-black uppercase tracking-[0.4em] transition-all relative z-10">
                            {t.completed ? "REVISIT PATH" : "INITIATE PATH"}
                        </button>

                        {!t.completed && <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_bottom_right,_var(--k-accent)_0%,_transparent_50%)]" />}
                    </div>
                ))}
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Learning Lineage — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
