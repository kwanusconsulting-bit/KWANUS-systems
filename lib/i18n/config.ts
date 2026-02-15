/**
 * KWANUS i18n Configuration
 * Defining the cultural and linguistic boundaries of the OS.
 */

export const I18N_CONFIG = {
    defaultLocale: 'en-US',
    locales: ['en-US', 'es-ES', 'ar-SA'],
    fallbacks: {
        'es': 'en-US',
        'ar': 'en-US'
    }
};

export type Locale = 'en-US' | 'es-ES' | 'ar-SA';
