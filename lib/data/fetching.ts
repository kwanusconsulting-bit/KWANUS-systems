/**
 * KWANUS Data Fetching Layer (Nervous System)
 */

export async function kFetch(url: string, options: RequestInit = {}) {
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        // Default cache strategy for the OS
        next: {
            revalidate: 60, // Default 1 minute
            ...options.next,
        }
    });

    if (!res.ok) {
        throw new Error(`KWANUS_NETWORK_ERROR: ${res.statusText}`);
    }

    return res.json();
}

/**
 * Domain-specific revalidation tags
 */
export const Tags = {
    emotional: 'emotional-state',
    hybrid: 'hybrid-data',
    partners: 'partner-registry',
    productivity: 'productivity-stack'
};
