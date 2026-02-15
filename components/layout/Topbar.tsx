"use client"

import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"
import { EmotionalStateBadge } from "@/components/emotions/EmotionalStateBadge"
import { NotificationCenter } from "@/components/notifications/NotificationCenter"

export function Topbar() {
    const pathname = usePathname()
    const { user, logout } = useAuth()

    // Don't show header on the landing page or login page
    if (pathname === "/" || pathname === "/auth/login") return null

    return (
        <header className="h-20 border-b border-white/5 bg-background/30 backdrop-blur-md flex items-center justify-between px-8 z-40">
            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest uppercase opacity-40">Current Sequence</span>
                    <span className="text-sm font-black uppercase italic k-accent">Orientation — Pulse 001</span>
                </div>
            </div>

            <div className="flex items-center gap-12">
                <div className="hidden lg:flex items-center gap-6">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[10px] font-black tracking-widest uppercase opacity-40">Emotional Resonance</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black italic k-accent">STABLE HZ</span>
                        </div>
                    </div>
                    <EmotionalStateBadge state="thriving" intensity={0.88} />
                </div>

                <div className="h-10 w-px bg-white/5" />

                <NotificationCenter />

                <div className="h-10 w-px bg-white/5" />

                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="text-right flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest leading-none">{user?.name || "Steward"}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{user?.role || "KWANUS PRIME"}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="w-10 h-10 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center p-1 group-hover:k-accent-border transition-all overflow-hidden"
                    >
                        <div className="w-full h-full rounded-full bg-indigo-500/20 group-hover:bg-red-500/20 transition-colors flex items-center justify-center text-[10px] font-black opacity-0 group-hover:opacity-100 uppercase">
                            X
                        </div>
                        <div className="absolute w-full h-full rounded-full bg-indigo-500/20 group-hover:hidden" />
                    </button>
                </div>
            </div>
        </header>
    )
}
