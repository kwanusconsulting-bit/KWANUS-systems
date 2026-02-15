"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EmotionalState } from '@/lib/emotionalState';

type Theme = 'light' | 'dark' | 'mythic';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    emotionalState: EmotionalState;
    setEmotionalState: (state: EmotionalState) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('mythic');
    const [emotionalState, setEmotionalState] = useState<EmotionalState>('neutral');

    return (
        <ThemeContext.Provider value={{ theme, setTheme, emotionalState, setEmotionalState }}>
            <div className={`k-theme-${theme} contents`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
