"use client"

import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function SignOutButton() {
    const supabase = createClient()
    const router = useRouter()

    async function handleSignOut() {
        await supabase.auth.signOut()
        router.push("/login")
        router.refresh()
    }

    return (
        <button
            onClick={handleSignOut}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
            Sign Out
        </button>
    )
}
