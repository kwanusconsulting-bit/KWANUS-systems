```javascript
"use client";

import EmotionalBackground from "../EmotionalBackground";
import Link from "next/link";
import IntelligenceRail from "../IntelligenceRail";
import PresenceBadge from "../PresenceBadge";
import EmotionalGuidance from "../../emotion/EmotionalGuidance";
import { PersonaText } from "@/components/ui";

export default function OSMobileShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
            <EmotionalBackground />

            <header className="h-16 px-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-lg sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <PersonaText className="text-lg font-bold">KWANUS</PersonaText>
                    <PresenceBadge />
                </div>
                <EmotionalGuidance />
            </header>

            <main className="pb-28 px-5 pt-4 space-y-6">
                <IntelligenceRail />
                {children}
            </main>

            {/* Mobile Nav */}
            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-2xl border-t border-white/5 px-6 flex items-center justify-between z-50">
                <Link href="/dashboard" className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                    <span className="text-xl">🏛️</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">Kernel</span>
                </Link>
                <Link href="/disputes" className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                    <span className="text-xl">⚖️</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">Disputes</span>
                </Link>
                <Link href="/funding" className="flex flex-col items-center gap-1 opacity-100">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <span className="text-xl">💰</span>
                    </div>
                </Link>
                <Link href="/documents" className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                    <span className="text-xl">📁</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">Vault</span>
                </Link>
                <Link href="/timeline" className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                    <span className="text-xl">⏳</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">History</span>
                </Link>
            </nav>
        </div>
    );
}
```
