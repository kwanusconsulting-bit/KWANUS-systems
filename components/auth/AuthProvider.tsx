"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { mockUser } from "@/lib/data/mock"
import { useRouter } from "next/navigation"

interface AuthContextType {
    user: any;
    login: (name: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for "session" in localStorage
        const storedUser = localStorage.getItem("kwanus_session")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    const login = (name: string) => {
        const sessionUser = { ...mockUser, name }
        setUser(sessionUser)
        localStorage.setItem("kwanus_session", JSON.stringify(sessionUser))
        router.push("/steward")
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("kwanus_session")
        router.push("/auth/login")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
