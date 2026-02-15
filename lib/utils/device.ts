/**
 * KWANUS OS: Device Intelligence
 * Adapting the universe to the machine.
 */

export const getDeviceIdentity = () => {
    if (typeof window === 'undefined') return 'nexus-core';

    const width = window.innerWidth;
    if (width < 640) return 'mobile-node';
    if (width < 1024) return 'tablet-node';
    return 'prime-node';
};

export const getPlatformResonance = () => {
    if (typeof window === 'undefined') return 1.0;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isTouch ? 0.88 : 1.0; // Touch devices feel slightly different
};
