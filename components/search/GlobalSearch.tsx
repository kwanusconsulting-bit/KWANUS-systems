"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function GlobalSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Keyboard shortcut: Cmd+K / Ctrl+K
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((o) => !o);
            }
            if (e.key === "Escape") setOpen(false);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 10);
            setSelectedIndex(0);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [open]);

    // Search as you type
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.results || []);
            } catch (error) {
                console.error("Search failed");
            }
        }, 150);

        return () => clearTimeout(timeout);
    }, [query]);

    const handleSelect = (r: any) => {
        setOpen(false);
        switch (r.type) {
            case "item": router.push(`/dashboard/credit-items/${r.id}`); break;
            case "dispute": router.push(`/dashboard/disputes/${r.id}`); break;
            case "funding": router.push(`/dashboard/funding/${r.id}`); break;
            case "profile": router.push(`/dashboard/identity`); break;
            case "activity": router.push(`/dashboard/timeline`); break;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group flex items-center justify-between w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/40 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-inner"
            >
                <div className="flex items-center gap-2">
                    <span>🔎</span>
                    <span className="group-hover:text-white/60 transition-colors">Search system...</span>
                </div>
                <kbd className="hidden sm:inline-block pointer-events-none rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/30 group-hover:text-white/50 transition-colors">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="relative border-b border-white/10">
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search credit items, disputes, activity..."
                                className="w-full bg-transparent px-5 py-4 text-white focus:outline-none text-lg placeholder:text-white/20"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Global Search</span>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                            {query.trim() && results.length === 0 && (
                                <p className="text-center py-12 text-sm text-slate-500 italic">No matching results found for <span className="text-white">&quot;{query}&quot;</span></p>
                            )}

                            {!query.trim() && (
                                <div className="py-12 flex flex-col items-center justify-center text-center px-6">
                                    <p className="text-sm font-medium text-white/60 mb-1">Enter a search query to explore the OS.</p>
                                    <p className="text-xs text-slate-500">You can search for creditors, account numbers, or status updates.</p>
                                </div>
                            )}

                            {results.map((r, i) => (
                                <button
                                    key={`${r.type}-${r.id}-${i}`}
                                    onClick={() => handleSelect(r)}
                                    onMouseEnter={() => setSelectedIndex(i)}
                                    className={`w-full text-left rounded-xl p-3 flex flex-col transition-all ${i === selectedIndex ? 'bg-white/10 border-white/10' : 'bg-transparent border-transparent'} border`}
                                >
                                    <p className="font-semibold text-white">{r.title}</p>
                                    <p className="text-xs text-white/40">{r.subtitle}</p>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-t border-white/10 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                            <div className="flex gap-4">
                                <span>↑↓ Navigate</span>
                                <span>↵ Select</span>
                            </div>
                            <span>ESC to close</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
