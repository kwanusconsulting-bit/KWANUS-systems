"use client";

import { useState } from "react";
import { GlassCard, GlassPanel, PageHeader } from "@/components/ui";
import DocumentViewer from "./DocumentViewer";
import DocumentUpload from "./DocumentUpload";

export default function DocumentsGrid({ documents }: any) {
    const [selected, setSelected] = useState(documents[0] || null);
    const [showUpload, setShowUpload] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Ceremonial Archive"
                    subtitle="Artifact Repository"
                    emotionalState="neutral"
                />
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white border border-white/20 transition-all text-xs font-black uppercase tracking-[0.2em] text-white hover:text-slate-950"
                >
                    {showUpload ? "Close Vault" : "+ Manifest Vessel"}
                </button>
            </div>

            {showUpload && (
                <div className="max-w-xl animate-slide-up">
                    <DocumentUpload onComplete={() => setShowUpload(false)} />
                </div>
            )}

            {/* Viewer */}
            <section className="animate-fade-in delay-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 ml-2">Active Signal Vessel</h3>
                {selected ? (
                    <DocumentViewer document={selected} />
                ) : (
                    <GlassPanel className="h-[40vh] flex flex-col items-center justify-center text-center p-8 border-dashed border-white/5">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4 grayscale opacity-20">📜</div>
                        <p className="text-white/40 italic font-serif">The archive is holding its breath. Select a vessel to resonante.</p>
                    </GlassPanel>
                )}
            </section>

            {/* Grid */}
            <section className="animate-fade-in delay-200">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 ml-2">Archived Artifacts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {documents.length === 0 ? (
                        <div className="col-span-full py-20 text-center opacity-30 italic font-serif text-sm">
                            No vessels manifested in this layer.
                        </div>
                    ) : (
                        documents.map((doc: any) => (
                            <button
                                key={doc.id}
                                onClick={() => setSelected(doc)}
                                className={`
                  group p-6 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden
                  ${selected?.id === doc.id
                                        ? "bg-white/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                                        : "bg-slate-950/40 border-white/5 hover:border-white/20 hover:bg-white/5"
                                    }
                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300
                    ${selected?.id === doc.id ? "bg-emerald-500/20 text-emerald-400 scale-110 shadow-lg" : "bg-white/5 text-white/30"}
                  `}>
                                        {doc.type === 'letter' ? '✉️' : '📄'}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className={`font-bold text-sm tracking-tight truncate ${selected?.id === doc.id ? "text-white" : "text-white/60"}`}>
                                            {doc.title}
                                        </div>
                                        <div className="text-[9px] uppercase tracking-[0.2em] text-white/30 mt-1.5 font-bold">
                                            {doc.type} • {new Date(doc.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                {selected?.id === doc.id && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                )}
                            </button>
                        )
                        ))}
                </div>
            </section>
        </div>
    );
}
