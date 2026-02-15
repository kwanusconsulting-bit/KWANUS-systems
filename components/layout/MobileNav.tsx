"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MOBILE_TABS = [
    { href: "/workspace", label: "Home", icon: "◈" },
    { href: "/emotions/pulse", label: "Emotions", icon: "◎" },
    { href: "/credit", label: "Hybrid", icon: "✦" },
    { href: "/tasks", label: "Tasks", icon: "◬" },
    { href: "/settings", label: "Settings", icon: "⚙" }
];

export function MobileNav() {
    const pathname = usePathname();

    // Hide for landing and auth
    if (pathname === "/" || pathname?.startsWith("/auth")) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4 lg:hidden z-50">
            {MOBILE_TABS.map((tab) => {
                const isActive = pathname === tab.href || (tab.href !== "/workspace" && pathname?.startsWith(tab.href));
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={cn(
                            "flex flex-col items-center gap-1 p-2 transition-all duration-300",
                            isActive ? "k-accent" : "text-white/30"
                        )}
                    >
                        <span className="text-xl leading-none">{tab.icon}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                        {isActive && (
                            <div className="w-1 h-1 rounded-full k-accent-bg absolute bottom-1" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
