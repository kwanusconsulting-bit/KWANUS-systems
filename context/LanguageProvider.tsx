"use client"

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type Locale = 'en-US' | 'es-ES' | 'ar-SA' | 'zh-CN';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
    locale: Locale;
    direction: Direction;
    setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>('en-US');

    const direction = useMemo((): Direction =>
        locale.startsWith('ar') ? 'rtl' : 'ltr',
        [locale]);

    return (
        <LanguageContext.Provider value={{ locale, direction, setLocale }}>
            <div dir={direction} className={direction === 'rtl' ? 'rtl' : 'ltr'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
