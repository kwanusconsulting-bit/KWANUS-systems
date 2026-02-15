export const HYBRID_THRESHOLDS = {
    CRITICAL: 350,
    UNSTABLE: 580,
    STABLE: 670,
    ELITE: 800
};

export type HybridTier = keyof typeof HYBRID_THRESHOLDS;
