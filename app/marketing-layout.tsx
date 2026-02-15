// app/marketing-layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            {/* Glow background */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose-500/15 blur-3xl" />
            </div>

            {/* Header */}
            <header className="w-full border-b border-white/10 backdrop-blur-md bg-slate-950/60">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-xs font-semibold tracking-[0.2em] uppercase">
                            OS
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-200">
                                KWANUS
                            </span>
                            <span className="text-[11px] text-slate-400">
                                Emotionally Intelligent Credit OS
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="hover:text-slate-50 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/sign-in"
                            className="text-sm text-slate-300 hover:text-slate-50 transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/sign-up"
                            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:bg-emerald-300 transition-colors"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1">
                <div className="mx-auto flex max-w-6xl flex-col px-4 py-10 md:py-16">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                    <span>© {new Date().getFullYear()} KWANUS Systems LLC. All rights reserved.</span>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/legal/terms" className="hover:text-slate-300">
                            Terms
                        </Link>
                        <Link href="/legal/privacy" className="hover:text-slate-300">
                            Privacy
                        </Link>
                        <Link href="/legal/disclosures" className="hover:text-slate-300">
                            Disclosures
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
