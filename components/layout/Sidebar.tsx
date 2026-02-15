"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

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

    return (
        <aside className={`w-56 border-r transition-colors duration-1000 ${theme.sidebar}`}>
            <div className="flex h-full flex-col justify-between">
                <div className="p-4">
                    <h1 className="text-lg font-semibold mb-6 tracking-tight">KWanus OS</h1>

                    <nav className="space-y-2 text-sm">
                        {navigation.map((item) => {
                            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
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
    );
}
