import { describe, it, expect } from "vitest";
import { checkFundingGates } from "../../funding/gates";
import { calculateReadinessScore } from "../../funding/score";

// Pure function tests for ML probability logic (no DB)
describe("ML Probability Logic (pure)", () => {
    it("readiness score feeds probability correctly", () => {
        const strong = calculateReadinessScore({ personalScore: 800, utilization: 0.05, inquiries6m: 0, negativeItems: 0, openAccounts: 10 });
        const weak = calculateReadinessScore({ personalScore: 580, utilization: 0.8, inquiries6m: 5, negativeItems: 4, openAccounts: 1 });
        expect(strong.readinessScore).toBeGreaterThan(weak.readinessScore);
    });

    it("gates and score are consistent — blocked profiles score LOW", () => {
        const input = { personalScore: 580, utilization: 0.8, inquiries6m: 6, negativeItems: 4 };
        const gates = checkFundingGates(input);
        const score = calculateReadinessScore({ ...input, openAccounts: 0 });
        expect(gates.blocked).toBe(true);
        expect(score.band).toBe("LOW");
    });
});

describe("Strategy Determinism", () => {
    it("same inputs always produce same score band", () => {
        const a = calculateReadinessScore({ personalScore: 700, utilization: 0.30, inquiries6m: 2, negativeItems: 0, openAccounts: 6 });
        const b = calculateReadinessScore({ personalScore: 700, utilization: 0.30, inquiries6m: 2, negativeItems: 0, openAccounts: 6 });
        expect(a.readinessScore).toBe(b.readinessScore);
        expect(a.band).toBe(b.band);
    });
});
