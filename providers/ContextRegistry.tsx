"use client"

import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { DeviceProvider } from './DeviceProvider';
import { RitualProvider } from './RitualProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { EmotionalIntelligenceProvider } from '@/context/EmotionalIntelligenceProvider';

interface RegistryProps {
    children: ReactNode;
}

export const ContextRegistry = ({ children }: RegistryProps) => {
    return (
        <ThemeProvider>
            <DeviceProvider>
                <RitualProvider>
                    <AuthProvider>
                        <EmotionalIntelligenceProvider>
                            {children}
                        </EmotionalIntelligenceProvider>
                    </AuthProvider>
                </RitualProvider>
            </DeviceProvider>
        </ThemeProvider>
    );
};
