"use client"

import { useState, useRef } from 'react';

/**
 * usePacing - Detects rapid interaction behavior (Hyper-Interaction).
 * If clicks exceed threshold in timeframe, triggers a pacing alert.
 */
export function usePacing(threshold = 5, timeframe = 2000) {
    const [isPacingHigh, setIsPacingHigh] = useState(false);
    const clickTimes = useRef<number[]>([]);

    const trackClick = () => {
        const now = Date.now();
        clickTimes.current = clickTimes.current.filter(t => now - t < timeframe);
        clickTimes.current.push(now);

        if (clickTimes.current.length >= threshold) {
            setIsPacingHigh(true);
            console.warn("PACING ALERT: System-user resonance volatility detected.");

            // Auto-reset after a period of stillness
            setTimeout(() => {
                if (Date.now() - clickTimes.current[clickTimes.current.length - 1] > timeframe) {
                    setIsPacingHigh(false);
                }
            }, timeframe);
        }
    };

    return { isPacingHigh, trackClick };
}
