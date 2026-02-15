"use client";

import { useState } from "react";
import DocumentViewer from "./DocumentViewer";
import { GlassCard, GlassPanel } from "@/components/ui";
import DocumentUpload from "./DocumentUpload";

export default function DocumentsGrid({ documents }: any) {
    const [selected, setSelected] = useState(documents[0] || null);
    const [showUpload, setShowUpload] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight text-white">Ceremonial Archive</h1>
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition text-sm font-medium text-white"
                >
                    {showUpload ? "Close Vault" : "+ Manifest Document"}
                </button>
            </div>

            {showUpload && (
                <div className="max-w-xl">
                    <DocumentUpload onComplete={() => setShowUpload(false)} />
                </div>
            )}

            {/* Viewer */}
            <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-4 ml-2">Active Vessel</h3>
                {selected ? (
                    <DocumentViewer document={selected} />
                ) : (
                    <GlassPanel className="h-[40vh] flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4">📜</div>
                        <p className="text-white/60">The archive is waiting for a selection.</p>
                    </GlassPanel>
                )}
            </section>

            {/* Grid */}
            <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-4 ml-2">Archived Vessels</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {documents.length === 0 ? (
                        <div className="col-span-full py-10 text-center opacity-40 italic text-sm">
                            No vessels manifested in this layer.
                        </div>
                    ) : (
                        documents.map((doc: any) => (
                            <button
                                key={doc.id}
                                onClick={() => setSelected(doc)}
                                className={`
                  group p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden
                  ${selected?.id === doc.id
                                        ? "bg-white/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                        : "bg-slate-950/40 border-white/10 hover:border-white/20 hover:bg-white/5"
                                    }
                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center text-xl
                    ${selected?.id === doc.id ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/40"}
                  `}>
                                        {doc.type === 'letter' ? '✉️' : '📄'}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className={`font-semibold text-sm truncate ${selected?.id === doc.id ? "text-white" : "text-white/70"}`}>
                                            {doc.title}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">
                                            {doc.type} • {new Date(doc.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                {selected?.id === doc.id && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />
                                )}
                            </button>
                        )
                        ))}
                </div>
            </section>
        </div>
    );
}
