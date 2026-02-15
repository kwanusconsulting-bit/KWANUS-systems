export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { saveProfile } from "./actions";

export default async function IdentityPage() {
    const profile = await prisma.userProfile.findFirst();

    return (
        <div className="space-y-6">
            <header className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight">
                    Identity & Emotional Field
                </h1>
                <p className="text-xs text-slate-400">
                    Hold the user&apos;s story, safety, and emotional pacing as a living center.
                </p>
            </header>

            <div className="max-w-2xl space-y-8">
                <form action={saveProfile} className="space-y-6 text-sm">
                    <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-6">
                        <h2 className="text-sm font-medium border-b border-white/10 pb-2">Operational State</h2>

                        <div className="space-y-1">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Emotional State</label>
                            <select
                                name="emotionalState"
                                defaultValue={profile?.emotionalState || "NEUTRAL"}
                                className="w-full rounded-md bg-slate-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                            >
                                <option value="WORST">Worst (Cool Blue)</option>
                                <option value="NEUTRAL">Neutral (Slate)</option>
                                <option value="PROGRESSING">Progressing (Warm Coral)</option>
                                <option value="THRIVING">Thriving (Emerald)</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Emotional Note</label>
                            <input
                                name="emotionalNote"
                                defaultValue={profile?.emotionalNote || ""}
                                placeholder="Current pacing or state note..."
                                className="w-full rounded-md bg-slate-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-6">
                        <h2 className="text-sm font-medium border-b border-white/10 pb-2">The Story</h2>

                        <div className="space-y-1">
                            <label className="text-xs text-white/50 uppercase tracking-wider">User Narrative</label>
                            <textarea
                                name="story"
                                defaultValue={profile?.story || ""}
                                placeholder="Capture the user's background, journey, and identity story..."
                                className="w-full rounded-md bg-slate-900 border border-white/10 px-3 py-2 text-white h-48 focus:outline-none focus:ring-1 focus:ring-white/20"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-white text-slate-950 px-4 py-2 font-medium hover:bg-slate-200 transition"
                    >
                        Save Identity Field
                    </button>
                </form>
            </div>
        </div>
    );
}
