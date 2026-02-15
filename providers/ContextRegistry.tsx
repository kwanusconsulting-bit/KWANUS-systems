"use client"

import React, { ReactNode } from 'react';
import { EmotionalIntelligenceProvider } from '@/context/EmotionalIntelligenceProvider';
import { ThemeProvider } from './ThemeProvider';
import { LanguageProvider } from '@/context/LanguageProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';

/**
 * KWANUS Context Registry
 * The central point of awareness for all OS providers.
 */

interface RegistryProps {
    children: ReactNode;
}

export const ContextRegistry = ({ children }: RegistryProps) => {
    return (
        <AuthProvider>
            <LanguageProvider>
                <ThemeProvider>
                    <EmotionalIntelligenceProvider>
                        {children}
                    </EmotionalIntelligenceProvider>
                </ThemeProvider>
            </LanguageProvider>
        </AuthProvider>
    );
};

export function useNexus() {
    return {
        resonance: 1.0
    };
}
