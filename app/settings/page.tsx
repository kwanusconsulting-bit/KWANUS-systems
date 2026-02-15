"use client"

export const dynamic = "force-dynamic";

import React, { useState } from 'react';
import { SettingsLayout } from '@/components/layout/SettingsLayout';
import { EmotionalSafetySettings } from '@/components/settings/EmotionalSafetySettings';

const SETTINGS_CATEGORIES = [
    { id: 'profile', label: 'Profile', icon: '⚓' },
    { id: 'safety', label: 'Emotional Safety', icon: '◎' },
    { id: 'personalization', label: 'Personalization', icon: '🎨' },
    { id: 'hybrid', label: 'Hybrid Strategy', icon: '✦' },
    { id: 'notifications', label: 'Notifications', icon: '⚑' },
    { id: 'privacy', label: 'Privacy & Data', icon: '🛡' },
    { id: 'devices', label: 'Devices', icon: '📱' }
];

export default function SettingsPage() {
    const [activeCategory, setActiveCategory] = useState('safety');

    return (
        <SettingsLayout
            categories={SETTINGS_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
        >
            {activeCategory === 'safety' && <EmotionalSafetySettings />}
            {activeCategory !== 'safety' && (
                <div className="h-64 flex items-center justify-center border border-dashed border-white/5 rounded-3xl opacity-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.8em]">CALIBRATING_MODULE_{activeCategory.toUpperCase()}...</span>
                </div>
            )}
        </SettingsLayout>
    );
}
