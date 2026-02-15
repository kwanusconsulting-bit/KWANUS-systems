import Link from "next/link"

export function Footer() {
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
            <div className="mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} KWANUS Systems LLC — A calm, emotionally intelligent financial OS.
            </div>
            <div className="flex gap-6">
                <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
                <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                <Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                <Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
        </div>
    )
}
