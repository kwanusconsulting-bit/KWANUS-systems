"use client"

import { useState, useEffect } from 'react';
import { ConnectivityStatus, checkServerHealth } from '@/lib/resilience/offline';

export function useResilience() {
    const [status, setStatus] = useState<ConnectivityStatus>('online');
    const [latency, setLatency] = useState(0);

    useEffect(() => {
        const updateStatus = () => setStatus(navigator.onLine ? 'online' : 'offline');

        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);

        const healthInterval = setInterval(async () => {
            if (navigator.onLine) {
                const l = await checkServerHealth();
                setLatency(l);
                if (l > 300 || l === -1) setStatus('degraded');
                else setStatus('online');
            }
        }, 30000); // Check every 30s

        return () => {
            window.removeEventListener('online', updateStatus);
            window.removeEventListener('offline', updateStatus);
            clearInterval(healthInterval);
        };
    }, []);

    return {
        status,
        latency,
        isOffline: status === 'offline',
        isDegraded: status === 'degraded',
        isOnline: status === 'online'
    };
}
