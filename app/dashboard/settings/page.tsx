export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { saveSettings } from "./actions";

export default async function SettingsPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const settings = await prisma.userSettings.findUnique({
        where: { userId }
    });

    return (
        <div className="space-y-8 max-w-xl">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">System Settings</h1>
                <p className="text-sm text-slate-400">Configure the OS behavior and visual resonance.</p>
            </div>

            <form action={saveSettings} className="space-y-8 text-sm">
                {/* Theme Override */}
                <div className="space-y-4 rounded-xl border border-white/5 bg-white/5 p-6">
                    <div className="space-y-1">
                        <h3 className="font-medium text-white">Visual Theme</h3>
                        <p className="text-xs text-slate-500">Override the emotional engine&apos;s dynamic theme selection.</p>
                    </div>
                    <select
                        name="themeOverride"
                        defaultValue={settings?.themeOverride || "SYSTEM"}
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/20"
                    >
                        <option value="SYSTEM">Emotional Engine (Dynamic)</option>
                        <option value="LIGHT">Solar (Light)</option>
                        <option value="DARK">Deep Space (Dark)</option>
                    </select>
                </div>

                {/* Intelligence Controls */}
                <div className="space-y-6 rounded-xl border border-white/5 bg-white/5 p-6">
                    <div className="space-y-1 mb-2">
                        <h3 className="font-medium text-white">OS Intelligence</h3>
                        <p className="text-xs text-slate-500">Toggle active system feedback loops.</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="font-medium text-white/80">System Notifications</label>
                            <p className="text-[10px] text-slate-500">Enable real-time event logging and alerts.</p>
                        </div>
                        <input
                            type="checkbox"
                            name="notificationsEnabled"
                            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-white"
                            defaultChecked={settings?.notificationsEnabled ?? true}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="font-medium text-white/80">Emotional UI Engine</label>
                            <p className="text-[10px] text-slate-500">Allow the OS to shift visual resonance based on state.</p>
                        </div>
                        <input
                            type="checkbox"
                            name="emotionalEngineEnabled"
                            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-white"
                            defaultChecked={settings?.emotionalEngineEnabled ?? true}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-white text-slate-950 px-4 py-2.5 font-semibold hover:bg-slate-200 transition-all duration-300"
                >
                    Commit Changes
                </button>
            </form>

            <div className="pt-8 border-t border-white/10 space-y-4">
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-widest">About KWANUS OS</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                    Version 1.0.0 (Wave 13 Integration). All systems operating within approved resonance parameters.
                    The Steward&apos;s identity is secured by Clerk.
                </p>
            </div>
        </div>
    );
}
