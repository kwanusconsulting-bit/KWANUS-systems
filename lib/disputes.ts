import { AnalysisEngine } from "@/lib/report";

export interface Recommendation {
    itemTitle: string;
    reason: string;
    strategy: 'FACTUAL' | 'PROCEDURAL' | 'TIMING';
    templateId: string;
}

export class RecommendationEngine {
    /**
     * Generates a recommendation for a single credit item.
     */
    static recommend(creditorName: string, status: string): Recommendation {
        const analysis = AnalysisEngine.analyze(status);

        let reason = "Inaccurate reporting of account status.";
        let strategy: 'FACTUAL' | 'PROCEDURAL' | 'TIMING' = 'FACTUAL';

        if (analysis.severity === 'HIGH') {
            reason = "Please provide proof of the alleged debt and original contract.";
            strategy = 'PROCEDURAL';
        } else if (analysis.tags.includes("Late Payment")) {
            reason = "Internal records show this account was paid as agreed.";
            strategy = 'FACTUAL';
        }

        return {
            itemTitle: creditorName,
            reason,
            strategy,
            templateId: "round-1-v1"
        };
    }

    /**
     * Generates a list of recommendations for multiple items.
     */
    static recommendMany(items: { creditorName: string; status: string }[]): Recommendation[] {
        return items.map(item => this.recommend(item.creditorName, item.status));
    }
}
export function recommendDisputes(items: any[]): Recommendation[] {
    return RecommendationEngine.recommendMany(items);
}
