// lib/gradients.ts

import { EmotionalState } from "./emotion";

export interface GradientSet {
    background: string;
    halo: string;
    card: string;
    accent: string;
}

export function getGradients(state: EmotionalState): GradientSet {
    switch (state) {
        case "worst":
            return {
                background: "from-blue-950 via-slate-900 to-slate-950",
                halo: "from-blue-700/20 via-slate-600/20 to-slate-700/20",
                card: "from-blue-600/10 via-slate-600/10 to-slate-700/10",
                accent: "text-blue-300",
            };

        case "neutral":
            return {
                background: "from-slate-800 via-slate-700 to-slate-900",
                halo: "from-slate-500/20 via-slate-400/20 to-slate-600/20",
                card: "from-slate-400/10 via-slate-500/10 to-slate-600/10",
                accent: "text-slate-300",
            };

        case "progressing":
            return {
                background: "from-amber-900 via-rose-900 to-slate-950",
                halo: "from-amber-400/20 via-orange-400/20 to-rose-500/20",
                card: "from-amber-400/10 via-orange-400/10 to-rose-500/10",
                accent: "text-amber-300",
            };

        case "thriving":
            return {
                background: "from-emerald-900 via-cyan-900 to-sky-950",
                halo: "from-emerald-400/20 via-cyan-400/20 to-sky-500/20",
                card: "from-emerald-400/10 via-cyan-400/10 to-sky-500/10",
                accent: "text-emerald-300",
            };
        default:
            return {
                background: "from-slate-800 via-slate-700 to-slate-900",
                halo: "from-slate-500/20 via-slate-400/20 to-slate-600/20",
                card: "from-slate-400/10 via-slate-500/10 to-slate-600/10",
                accent: "text-slate-300",
            };
    }
}
