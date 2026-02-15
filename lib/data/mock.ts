import { Partner, EmotionalState, CreditItem, User } from "@/lib/types";

export const mockPartners: Partner[] = [
    {
        id: "aether",
        name: "Aether Dynamics",
        tier: "Flame",
        state: "Activated",
        harmonic: "High",
        lineage: "Creation -> Alignment -> Activation",
        capabilities: ["Quantum Compute", "Neural Mapping"],
        permissions: ["Sub-system Alpha", "Meta-data Read"],
        workflows: ["Optimization Alpha", "Sync Omega"]
    },
    {
        id: "loom",
        name: "Loom Weavers",
        tier: "Loom",
        state: "Evolving",
        harmonic: "Stable",
        lineage: "Creation -> Alignment",
        capabilities: ["Pattern Recognition"],
        permissions: ["Registry Read"],
        workflows: ["Weave Beta"]
    },
    {
        id: "sentinel",
        name: "Sentinel Eye",
        tier: "Eye",
        state: "Aligned",
        harmonic: "Moderate",
        lineage: "Declaration -> Alignment",
        capabilities: ["Observational Logic"],
        permissions: ["Log Read"],
        workflows: ["Visual Delta"]
    }
];

export const mockEmotionalState: EmotionalState = {
    id: "state-001",
    tone: "Thriving",
    force: "Momentum",
    harmonic: "Perfect",
    timestamp: new Date().toISOString()
};

export const mockCreditItems: CreditItem[] = [
    {
        id: "cr-1",
        type: "Verification",
        status: "Resolution",
        emotionalImpact: "Positive",
        timestamp: new Date().toISOString()
    },
    {
        id: "cr-2",
        type: "Dispute",
        status: "Analysis",
        emotionalImpact: "Neutral",
        timestamp: new Date().toISOString()
    }
];

export const mockUser: User = {
    id: "steward-1",
    name: "The Steward",
    role: "KWANUS PRIME",
    emotionalProfile: "Resonant"
};
