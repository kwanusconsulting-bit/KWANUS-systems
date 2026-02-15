"use client"

export const dynamic = "force-dynamic";

export default function ChatInterface() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">REAL-TIME CHAT</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Direct Connection & Guidance Streams</p>
            </header>
            <div className="k-glass-panel max-w-4xl mx-auto h-[500px] flex flex-col justify-end p-8 space-y-8 relative overflow-hidden">
                <div className="space-y-4 opacity-20 text-[10px] font-black uppercase tracking-widest text-center">
                    Initializing secure nexus link...
                </div>
                <div className="h-px bg-white/5 w-full" />
                <input type="text" placeholder="SEND PULSE..." className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:k-accent-border" />
            </div>
        </main>
    );
}
