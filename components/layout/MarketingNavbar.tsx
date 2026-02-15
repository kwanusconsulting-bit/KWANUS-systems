"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
]

export function MarketingNavbar() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
            <Link href="/" className="text-xl font-bold tracking-tight">KWANUS OS</Link>

            <div className="hidden md:flex gap-6">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === link.href ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="flex gap-4">
                <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Login
                </Link>
                <Link
                    href="/app"
                    className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                    Enter OS
                </Link>
            </div>
        </nav>
    )
}
