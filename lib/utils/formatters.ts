/**
 * KWANUS Utilities: Formatters
 * Clean, ceremonial data representation.
 */

export const formatResonance = (value: number) => {
    return (value * 100).toFixed(0) + '%';
};

export const formatDateCeremony = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).toUpperCase();
};

export const formatTimeCeremony = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
};
