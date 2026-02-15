"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'mythic';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('mythic');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
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
