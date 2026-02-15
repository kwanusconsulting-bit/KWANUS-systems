"use client";

import EmotionalBackground from "../EmotionalBackground";
import { useTheme } from "@/providers/ThemeProvider";

export default function OSMobileShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen text-white relative">
            <EmotionalBackground />

            <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-40">
                <div className="text-sm font-bold tracking-tighter uppercase italic">KWANUS OS</div>
                <div className="w-8 h-8 rounded-full bg-white/10" />
            </header>

            <main className="pb-28 px-5 pt-8 space-y-10">
                {children}
            </main>

            <nav className="fixed bottom-0 left-0 w-full h-20 bg-white/5 backdrop-blur-3xl border-t border-white/10 flex items-center justify-around px-4 z-50">
                {/* Mobile Navigation Icons */}
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">🏠</div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">📊</div>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-emerald-500/50 flex items-center justify-center">🔄</div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">⚙️</div>
            </nav>
        </div>
    );
}
