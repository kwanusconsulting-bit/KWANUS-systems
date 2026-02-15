// components/DocumentFeed.tsx
"use client";

import DocumentCard from "./DocumentCard";
import { DocumentRecord } from "@/lib/documents";

export default function DocumentFeed({ docs }: { docs: DocumentRecord[] }) {
    return (
        <div className="space-y-3">
            {docs.length === 0 ? (
                <div className="text-center text-sm text-slate-400 py-8">
                    No documents yet. Upload your first document to begin building your archive.
                </div>
            ) : (
                docs.map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                ))
            )}
        </div>
    );
}
