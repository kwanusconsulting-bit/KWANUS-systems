export const dynamic = "force-dynamic";
export default function ContactPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-16 space-y-16">
            <header className="space-y-4">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-300/80">
                    REACHING OUT
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
                    Connect with the Stewards.
                </h1>
                <p className="text-slate-400">
                    Whether you have a question about the OS or need assistance with your journey, we are here.
                </p>
            </header>

            <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                        <input
                            type="email"
                            placeholder="steward@example.com"
                            className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                        <textarea
                            rows={5}
                            placeholder="How can we support your journey?"
                            className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-full bg-cyan-400 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300 transition"
                    >
                        Send Message
                    </button>
                </form>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <h3 className="text-slate-100 font-semibold">Direct Email</h3>
                        <p className="text-sm text-slate-400">steward@kwanus.com</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-slate-100 font-semibold">Stewardship Hours</h3>
                        <p className="text-sm text-slate-400">Monday — Friday<br />9:00 AM — 5:00 PM EST</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                        <p className="text-xs text-indigo-300 italic leading-relaxed">
                            &quot;The fastest way forward is often a single, clear question.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
