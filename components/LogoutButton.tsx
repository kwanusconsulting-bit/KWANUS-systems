"use client";

export function LogoutButton() {
    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    }

    return (
        <button
            onClick={logout}
            className="text-white/60 hover:text-white text-sm transition-colors"
        >
            Logout
        </button>
    );
}
