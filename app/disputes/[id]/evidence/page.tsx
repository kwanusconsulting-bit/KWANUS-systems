"use client"

export const dynamic = "force-dynamic";;

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Evidence = {
    id: string;
    url: string;
    type: string;
    createdAt: string;
};

export default function EvidenceManagerPage() {
    const params = useParams();
    const disputeId = params?.id as string;

    const [evidence, setEvidence] = useState<Evidence[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function load() {
            if (!disputeId) return;
            try {
                const res = await fetch(`/api/disputes/${disputeId}`);
                const data = await res.json();
                setEvidence(data.evidence || []);
            } catch (error) {
                console.error("Failed to load evidence:", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [disputeId]);

    async function uploadEvidence() {
        if (!file || !disputeId) return;

        setUploading(true);

        // In a real system, you'd upload to S3 or Supabase storage.
        // For now, we simulate a URL.
        const fakeUrl = `file://${file.name}`;

        try {
            await fetch("/api/evidence", {
                method: "POST",
                body: JSON.stringify({
                    disputeId,
                    url: fakeUrl,
                    type: "DOCUMENT",
                }),
            });

            setFile(null);

            // Reload evidence
            const res = await fetch(`/api/disputes/${disputeId}`);
            const data = await res.json();
            setEvidence(data.evidence || []);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    }

    if (loading) {
        return (
            <div className="p-6 text-gray-400">
                Loading evidence…
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-8">
            <header className="space-y-2">
                <h1 className="text-2xl font-semibold">Evidence Manager</h1>
                <p className="text-gray-500">
                    Upload documents, images, and notes to support your dispute.
                </p>
            </header>

            <div className="space-y-4">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
                />

                <button
                    onClick={uploadEvidence}
                    disabled={!file || uploading}
                    className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
                >
                    {uploading ? "Uploading…" : "Upload Evidence"}
                </button>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Uploaded Evidence</h2>

                {evidence.length === 0 ? (
                    <p className="text-gray-500">No evidence uploaded yet.</p>
                ) : (
                    <div className="space-y-3">
                        {evidence.map((ev) => (
                            <div
                                key={ev.id}
                                className="border border-gray-200 rounded-md p-4 bg-gray-50"
                            >
                                <p className="font-medium">{ev.type}</p>
                                <p className="text-sm text-gray-600 truncate">{ev.url}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Uploaded {new Date(ev.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
