"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function UserInitializer() {
    const router = useRouter();
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        // Only run once
        if (hasInitialized) return;

        // Initialize user on first dashboard visit
        fetch("/api/user/initialize", { method: "POST" })
            .then((res) => res.json())
            .then((data) => {
                setHasInitialized(true);
                // Only refresh if user was actually initialized (not if already existed)
                if (data.message === "User initialized successfully") {
                    router.refresh();
                }
            })
            .catch((err) => {
                console.error("User initialization error:", err);
                setHasInitialized(true); // Prevent retry loop on error
            });
    }, [router, hasInitialized]);

    return null;
}
