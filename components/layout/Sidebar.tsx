"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

const navigation = [
    { name: "Overview", href: "/dashboard" },
    { name: "Credit Items", href: "/dashboard/credit-items" },
    { name: "Disputes", href: "/dashboard/disputes" },
    { name: "Funding", href: "/dashboard/funding" },
    { name: "Identity", href: "/dashboard/identity" },
    { name: "Timeline", href: "/dashboard/timeline" },
    { name: "Notifications", href: "/dashboard/notifications" },
    { name: "Settings", href: "/dashboard/settings" }
];

export default function Sidebar({ theme }: { theme: any }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-xl"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40
                w-64 md:w-56 border-r transition-all duration-300
                ${theme.sidebar}
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex h-full flex-col justify-between">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-lg font-semibold tracking-tight">Kwanus OS</h1>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="md:hidden p-1 rounded hover:bg-white/10"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <nav className="space-y-1 text-sm">
                            {navigation.map((item) => {
                                const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block rounded-md px-3 py-2 transition-all ${active
                                            ? "bg-white/10 text-white font-medium shadow-sm"
                                            : `hover:bg-white/5 ${theme.accent} hover:text-white`
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="p-4 border-t border-white/5 flex items-center gap-3">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-8 w-8"
                                }
                            }}
                        />
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-white">Steward</span>
                            <span className="text-[10px] text-white/40 uppercase tracking-tighter">Verified</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
