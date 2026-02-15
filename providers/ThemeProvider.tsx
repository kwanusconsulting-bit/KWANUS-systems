"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: any) {
    const [emotionalState, setEmotionalState] = useState("neutral");
    const [personaMode, setPersonaMode] = useState("balanced");
    const [mode, setMode] = useState("dark"); // dark | light

    return (
        <ThemeContext.Provider
            value={{
                emotionalState,
                setEmotionalState,
                personaMode,
                setPersonaMode,
                mode,
                setMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
