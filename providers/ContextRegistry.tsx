"use client"

import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { DeviceProvider } from './DeviceProvider';
import { RitualProvider } from './RitualProvider';

interface RegistryProps {
    children: ReactNode;
}

export const ContextRegistry = ({ children }: RegistryProps) => {
    return (
        <ThemeProvider>
            <DeviceProvider>
                <RitualProvider>
                    {children}
                </RitualProvider>
            </DeviceProvider>
        </ThemeProvider>
    );
};
