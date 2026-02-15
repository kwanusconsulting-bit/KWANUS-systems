// app/contact/page.tsx
import MarketingLayout from "../marketing-layout";

export default function ContactPage() {
    return (
        <MarketingLayout>
            <section className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div className="space-y-4">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                        Reach out when you&apos;re ready to move.
                    </h1>
                    <p className="text-sm text-slate-300">
                        KWANUS is a living OS, not a faceless portal. If you&apos;re a
                        founder, practitioner, or steward who wants to bring this universe
                        into your ecosystem, we&apos;d love to hear from you.
                    </p>
                </div>
                <form className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl">
                    <div className="space-y-1">
                        <label className="text-xs text-slate-300">Name</label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400/70"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-300">Email</label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400/70"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-300">What are you stewarding?</label>
                        <textarea
                            rows={4}
                            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400/70"
                            placeholder="Tell us about your work, your people, and what you want this OS to hold."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:bg-emerald-300 transition-colors"
                    >
                        Send message
                    </button>
                </form>
            </section>
        </MarketingLayout>
    );
}
