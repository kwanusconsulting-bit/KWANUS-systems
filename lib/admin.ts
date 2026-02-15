export const ADMIN_EMAILS = [
    "admin@kwanus.com", // Replace with real admin email
    "kwanus@example.com"
]

export function isAdmin(email?: string | null) {
    if (!email) return false
    return ADMIN_EMAILS.includes(email)
}
