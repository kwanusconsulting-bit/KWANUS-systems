/**
 * KWANUS Caching Strategy (Efficiency Mind)
 * Rules for memory and revalidation.
 */

export const CACHE_KEYS = {
    EMOTIONAL_STATE: 'kwanus:emotion:current',
    HYBRID_SCORE: 'kwanus:hybrid:current',
    PARTNER_HARMONICS: 'kwanus:partner:harmonics'
};

export interface CacheStrategy {
    ttl: number; // in seconds
    revalidateOn: ('navigation' | 'event' | 'timer')[];
}

export const INTELLIGENCE_CACHE_STRATEGY: CacheStrategy = {
    ttl: 3600, // 1 hour
    revalidateOn: ['event', 'navigation']
};
