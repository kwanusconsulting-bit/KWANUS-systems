"use client"

export const dynamic = "force-dynamic";

export default function ReflectionPage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">SESSION REFLECTION</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Integration & Emotional Processing</p>
            </header>
            <div className="max-w-2xl mx-auto space-y-12 py-12">
                <h2 className="text-3xl font-black tracking-tighter uppercase italic py-8 border-y border-white/5 text-center">What did you build today?</h2>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-xs h-64 outline-none focus:k-accent-border uppercase font-bold tracking-tight" placeholder="ENTER REFLECTION..."></textarea>
                <button className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:scale-[1.01] transition-transform">
                    SEAL SESSION
                </button>
            </div>
        </main>
    );
}
