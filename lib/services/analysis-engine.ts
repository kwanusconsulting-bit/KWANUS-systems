export interface AnalysisResult {
    isNegative: boolean;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    tags: string[];
}

export class AnalysisEngine {
    /**
     * Basic ruleset to analyze a credit item.
     */
    static analyze(status: string, balance?: number): AnalysisResult {
        const s = status.toUpperCase();
        const tags: string[] = [];
        let isNegative = false;
        let severity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';

        if (s.includes("COLLECTION") || s.includes("CHARGE-OFF")) {
            isNegative = true;
            severity = 'HIGH';
            tags.push("Collection", "Derogatory");
        } else if (s.includes("LATE") || s.includes("DELINQUENT")) {
            isNegative = true;
            severity = 'MEDIUM';
            tags.push("Late Payment");
        }

        if (balance && balance > 5000) {
            tags.push("High Balance");
        }

        return { isNegative, severity, tags };
    }

    /**
     * Calculates a simplified funding readiness score (1-100).
     */
    static calculateReadiness(items: { status: string; balance?: number }[]): number {
        let score = 80; // Baseline

        items.forEach(item => {
            const result = this.analyze(item.status, item.balance);
            if (result.severity === 'HIGH') score -= 15;
            if (result.severity === 'MEDIUM') score -= 5;
        });

        return Math.max(0, Math.min(100, score));
    }
}
