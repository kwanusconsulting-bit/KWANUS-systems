"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function UserInitializer() {
    const router = useRouter();

    useEffect(() => {
        // Initialize user on first dashboard visit
        fetch("/api/user/initialize", { method: "POST" })
            .then(() => {
                router.refresh();
            })
            .catch((err) => console.error("User initialization error:", err));
    }, [router]);

    return null;
}
