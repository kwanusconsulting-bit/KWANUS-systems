"use client";

import { IdentityCard } from "./IdentityCard";
import IdentityEdit from "./IdentityEdit";
import EmotionalPreferences from "./EmotionalPreferences";
import PersonaTuning from "./PersonaTuning";
import AccountSecurity from "./AccountSecurity";
import ThemeToggle from "./ThemeToggle";
import { PageHeader } from "@/components/ui";

export default function SettingsCenter({ user }: any) {
    return (
        <div className="max-w-4xl mx-auto py-10 space-y-12 animate-fade-in px-6">
            <div className="flex justify-between items-center">
                <PageHeader
                    title="The Center"
                    subtitle="Inner Chamber • Identity Resolution"
                    emotionalState="neutral"
                />
                <ThemeToggle />
            </div>

            <div className="grid grid-cols-1 gap-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <IdentityCard user={user} />
                    <IdentityEdit user={user} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <EmotionalPreferences />
                    <PersonaTuning />
                </div>

                <AccountSecurity />
            </div>

            <footer className="pt-12 border-t border-white/5 flex items-center justify-between text-[10px] text-white/20 uppercase tracking-[0.3em] font-mono">
                <div>Kernel Build: 2026.02.15</div>
                <div>Latent Identity Encryption Enabled</div>
            </footer>
        </div>
    );
}
