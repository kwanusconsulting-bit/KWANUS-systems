import { createServerSupabase } from "@/lib/supabase-server"

export async function getCurrentUserId(): Promise<string> {
    const supabase = await createServerSupabase()
    const { data } = await supabase.auth.getUser()

    // If no user is logged in, return a demo/guest ID or throw error
    // For now, we keep "demo-user" as fallback if auth fails to avoid breaking dev, 
    // but in Prod this should redirect.
    return data.user?.id || "demo-user"
}
