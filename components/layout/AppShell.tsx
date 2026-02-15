"use client";

import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { emotionalThemes, EmotionalState } from "@/lib/emotionalTheme";
import GlobalSearch from "../search/GlobalSearch";
import NotificationBell from "../notifications/NotificationBell";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [currentTheme, setTheme] = useState(emotionalThemes.NEUTRAL);

    useEffect(() => {
        async function loadTheme() {
            try {
                const [emotionRes, settingsRes] = await Promise.all([
                    fetch("/api/emotion"),
                    fetch("/api/settings")
                ]);

                const emotionData = await emotionRes.json();
                const settingsData = await settingsRes.json();

                if (settingsData.emotionalEngineEnabled === false) {
                    setTheme(emotionalThemes.NEUTRAL);
                    return;
                }

                const state = (emotionData.state as EmotionalState) || "NEUTRAL";
                setTheme((emotionalThemes as any)[state] || emotionalThemes.NEUTRAL);
            } catch (error) {
                console.error("Failed to load OS resonance");
            }
        }
        loadTheme();
        const interval = setInterval(loadTheme, 15000); // Poll every 15s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex min-h-screen transition-colors duration-1000 ${currentTheme.bg} ${currentTheme.text}`}>
            <Sidebar theme={currentTheme} />
            <main className="flex-1 overflow-y-auto relative">
                <div className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 bg-transparent pointer-events-none">
                    <div className="w-80 pointer-events-auto">
                        <GlobalSearch />
                    </div>
                    <div className="pointer-events-auto">
                        <NotificationBell />
                    </div>
                </div>
                <div className="p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
