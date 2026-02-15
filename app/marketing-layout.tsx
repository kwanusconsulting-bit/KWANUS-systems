import Link from "next/link";
import "./globals.css";

export default function MarketingLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <header className="border-b border-slate-800">
                <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 shadow-lg shadow-cyan-500/40" />
                        <span className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-200">
                            KWANUS OS
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
                        <Link href="/features" className="hover:text-cyan-300 transition">
                            Features
                        </Link>
                        <Link href="/pricing" className="hover:text-cyan-300 transition">
                            Pricing
                        </Link>
                        <Link href="/about" className="hover:text-cyan-300 transition">
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-cyan-300 transition">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/sign-in"
                            className="text-xs md:text-sm text-slate-300 hover:text-cyan-300 transition"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/sign-up"
                            className="text-xs md:text-sm rounded-full bg-cyan-400 px-4 py-1.5 font-medium text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300 transition"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-slate-800 mt-16">
                <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p>© {new Date().getFullYear()} KWANUS Systems. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-cyan-300 transition">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-cyan-300 transition">
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
