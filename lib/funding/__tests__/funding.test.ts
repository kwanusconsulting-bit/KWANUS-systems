import { describe, it, expect } from "vitest";
import { checkFundingGates } from "../../funding/gates";
import { calculateReadinessScore } from "../../funding/score";
import { simulateCapitalStack } from "../../funding/simulator";

describe("Funding Gates", () => {
    it("blocks when score < 620", () => {
        const result = checkFundingGates({ personalScore: 580 });
        expect(result.blocked).toBe(true);
        expect(result.reasons.length).toBeGreaterThan(0);
    });

    it("blocks when utilization > 70%", () => {
        const result = checkFundingGates({ utilization: 0.75 });
        expect(result.blocked).toBe(true);
    });

    it("blocks when inquiries > 5", () => {
        const result = checkFundingGates({ inquiries6m: 6 });
        expect(result.blocked).toBe(true);
    });

    it("blocks when negative items > 3", () => {
        const result = checkFundingGates({ negativeItems: 4 });
        expect(result.blocked).toBe(true);
    });

    it("returns caution (not block) when utilization 51-70%", () => {
        const result = checkFundingGates({ personalScore: 700, utilization: 0.55 });
        expect(result.blocked).toBe(false);
        expect(result.caution).toBe(true);
    });

    it("passes clean profile", () => {
        const result = checkFundingGates({ personalScore: 750, utilization: 0.20, inquiries6m: 1, negativeItems: 0 });
        expect(result.blocked).toBe(false);
        expect(result.caution).toBe(false);
    });
});

describe("Readiness Score", () => {
    it("returns LOW band for weak profile", () => {
        const result = calculateReadinessScore({ personalScore: 580, utilization: 0.8, inquiries6m: 5, negativeItems: 4, openAccounts: 1 });
        expect(result.band).toBe("LOW");
        expect(result.readinessScore).toBeLessThan(50);
    });

    it("returns STRONG band for excellent profile", () => {
        const result = calculateReadinessScore({ personalScore: 800, utilization: 0.05, inquiries6m: 0, negativeItems: 0, openAccounts: 10 });
        expect(result.band).toBe("STRONG");
        expect(result.readinessScore).toBeGreaterThanOrEqual(75);
    });

    it("returns MODERATE band for mid profile", () => {
        const result = calculateReadinessScore({ personalScore: 680, utilization: 0.35, inquiries6m: 2, negativeItems: 1, openAccounts: 5 });
        expect(result.band).toBe("MODERATE");
    });

    it("score is always 0-100", () => {
        const result = calculateReadinessScore({ personalScore: 300, utilization: 1.0, inquiries6m: 10, negativeItems: 10, openAccounts: 0 });
        expect(result.readinessScore).toBeGreaterThanOrEqual(0);
        expect(result.readinessScore).toBeLessThanOrEqual(100);
    });
});

describe("Capital Stacking Simulator", () => {
    it("LOW band returns 0-10k range", () => {
        const result = simulateCapitalStack({ readinessBand: "LOW", readinessScore: 30 });
        expect(result.estimatedCapitalLow).toBe(0);
        expect(result.estimatedCapitalHigh).toBe(10_000);
        expect(result.requiresHumanApproval).toBe(true);
    });

    it("MODERATE band returns 10k-50k range", () => {
        const result = simulateCapitalStack({ readinessBand: "MODERATE", readinessScore: 60 });
        expect(result.estimatedCapitalLow).toBe(10_000);
        expect(result.estimatedCapitalHigh).toBe(50_000);
    });

    it("STRONG band returns 50k-150k range", () => {
        const result = simulateCapitalStack({ readinessBand: "STRONG", readinessScore: 85 });
        expect(result.estimatedCapitalLow).toBe(50_000);
        expect(result.estimatedCapitalHigh).toBe(150_000);
    });

    it("always includes requiresHumanApproval: true", () => {
        const result = simulateCapitalStack({ readinessBand: "STRONG", readinessScore: 90 });
        expect(result.requiresHumanApproval).toBe(true);
    });

    it("penalizes high utilization in confidence score", () => {
        const high = simulateCapitalStack({ readinessBand: "STRONG", readinessScore: 80, utilization: 0.8 });
        const low = simulateCapitalStack({ readinessBand: "STRONG", readinessScore: 80, utilization: 0.1 });
        expect(high.confidenceScore).toBeLessThan(low.confidenceScore);
    });
});
