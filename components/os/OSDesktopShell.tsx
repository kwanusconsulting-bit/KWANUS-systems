"use client";

import Sidebar from "../layout/Sidebar";
import GlobalSearch from "../search/GlobalSearch";
import NotificationBell from "../notifications/NotificationBell";
import EmotionalBackground from "./EmotionalBackground";
import { useTheme } from "@/providers/ThemeProvider";

export default function OSDesktopShell({ children }: { children: React.ReactNode }) {
    const { emotionalState }: any = useTheme();

    return (
        <div className="flex h-screen overflow-hidden text-white">
            <EmotionalBackground />
            <Sidebar theme={{ sidebar: "bg-white/5 backdrop-blur-2xl border-white/10" }} />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-40">
                    <div className="w-80">
                        <GlobalSearch />
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationBell />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-12 py-10">
                    <div className="max-w-5xl mx-auto space-y-12">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
