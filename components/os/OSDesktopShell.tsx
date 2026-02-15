"use client";

import Sidebar from "../layout/Sidebar";
import GlobalSearch from "../search/GlobalSearch";
import NotificationBell from "../notifications/NotificationBell";
import EmotionalBackground from "./EmotionalBackground";
import IntelligenceRail from "./IntelligenceRail";
import PresenceBadge from "./PresenceBadge";
import EmotionalGuidance from "../emotion/EmotionalGuidance";
import { useTheme } from "@/providers/ThemeProvider";
import { PersonaText } from "@/components/ui"; // Added PersonaText import

export default function OSDesktopShell({ children }: { children: React.ReactNode }) {
    const { emotionalState }: any = useTheme();

    return (
        <div className="flex h-screen overflow-hidden text-white">
            <EmotionalBackground />
            <Sidebar theme={{ sidebar: "bg-white/5 backdrop-blur-2xl border-white/10" }} />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <PersonaText className="text-xl font-bold tracking-tighter">KWANUS</PersonaText>
                        <PresenceBadge />
                    </div>
                    <div className="flex items-center gap-6">
                        <EmotionalGuidance />
                        <nav className="flex items-center gap-4">
                            <GlobalSearch /> {/* Assuming GlobalSearch should still be present */}
                            <NotificationBell />
                        </nav>
                    </div>
                </header>

                <div className="pt-6">
                    <IntelligenceRail />
                </div>

                <div className="flex-1 overflow-y-auto px-12 py-4">
                    <div className="max-w-5xl mx-auto space-y-12">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
