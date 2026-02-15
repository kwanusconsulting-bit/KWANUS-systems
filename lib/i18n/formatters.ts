/**
 * KWANUS I18n Formatters
 * Handling cultural adaptation for dates, numbers, and currencies.
 */

export const formatters = {
    /**
     * Formats a date according to the user's locale.
     */
    date: (date: Date, locale: string, options?: Intl.DateTimeFormatOptions) => {
        return new Intl.DateTimeFormat(locale, {
            dateStyle: 'medium',
            ...options
        }).format(date);
    },

    /**
     * Formats a number with proper decimal and grouping separators.
     */
    number: (num: number, locale: string, options?: Intl.NumberFormatOptions) => {
        return new Intl.NumberFormat(locale, options).format(num);
    },

    /**
     * Formats currency according to local conventions.
     */
    currency: (amount: number, locale: string, currency: string = 'USD') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(amount);
    }
};
