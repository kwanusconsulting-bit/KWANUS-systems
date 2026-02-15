"use client"

import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { DeviceProvider } from './DeviceProvider';

interface RegistryProps {
    children: ReactNode;
}

export const ContextRegistry = ({ children }: RegistryProps) => {
    return (
        <ThemeProvider>
            <DeviceProvider>
                {children}
            </DeviceProvider>
        </ThemeProvider>
    );
};
