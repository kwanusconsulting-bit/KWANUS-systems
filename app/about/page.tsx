// app/about/page.tsx
import MarketingLayout from "../marketing-layout";

export default function AboutPage() {
    return (
        <MarketingLayout>
            <section className="space-y-6 max-w-3xl">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                    KWANUS is a stewarded OS, not a tool.
                </h1>
                <p className="text-sm text-slate-300">
                    KWANUS was built from the belief that credit systems should not punish
                    nervous systems. Instead of forcing you to perform stability while
                    juggling disputes, funding, and identity, the OS holds the story with
                    you—emotionally and operationally.
                </p>
                <p className="text-sm text-slate-300">
                    Every surface is designed to reduce shame, collapse chaos, and bring
                    you back into relationship with your own timeline. The OS doesn&apos;t
                    just track what happened; it remembers how it felt, and what you were
                    moving toward.
                </p>
            </section>
        </MarketingLayout>
    );
}
