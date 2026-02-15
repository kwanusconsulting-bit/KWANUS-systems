"use client"

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react"
import Link from "next/link"
import { apiGet } from "@/lib/client/api"

export default function DisputeDashboard() {
    const [disputes, setDisputes] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchDisputes() {
            try {
                const data = await apiGet("/api/disputes") as any[]
                setDisputes(data || [])
            } catch (error) {
                console.error("Failed to fetch disputes:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchDisputes()
    }, [])

    if (isLoading) return <div className="p-8 text-white/50 animate-pulse">Scanning dispute records...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Dispute Center</h1>
                {disputes.length > 0 && (
                    <Link
                        href="/disputes/new"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                        + New Dispute
                    </Link>
                )}
            </div>

            {disputes.length === 0 ? (
                <div className="p-12 border border-white/10 rounded-2xl bg-white/5 text-center">
                    <h2 className="text-lg font-medium mb-2">No Active Disputes</h2>
                    <p className="text-sm text-white/40 mb-6">
                        Your credit horizon is clear, or you haven&apos;t started your first journey yet.
                    </p>
                    <Link
                        href="/disputes/new"
                        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all font-medium"
                    >
                        Initialize First Dispute
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 shadow-sm">
                        <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Active Disputes</div>
                        <div className="text-3xl font-bold">{disputes.filter(d => d.status === 'ACTIVE').length}</div>
                    </div>
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 shadow-sm">
                        <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Total Rounds</div>
                        <div className="text-3xl font-bold">
                            {disputes.reduce((acc, d) => acc + (d.rounds?.length || 0), 0)}
                        </div>
                    </div>
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 shadow-sm">
                        <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Real Records</div>
                        <div className="text-3xl font-bold">{disputes.length}</div>
                    </div>
                </div>
            )}
        </div>
    )
}
