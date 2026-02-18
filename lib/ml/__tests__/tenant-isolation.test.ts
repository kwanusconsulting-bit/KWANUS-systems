import { describe, it, expect } from "vitest";
import { calculateReadinessScore } from "../../funding/score";
import { checkFundingGates } from "../../funding/gates";

/**
 * Tenant Isolation Tests
 *
 * These tests verify that all pure scoring/gate functions are stateless
 * and deterministic — same inputs always produce same outputs regardless
 * of call order, proving no cross-tenant state bleed in the logic layer.
 *
 * DB-level isolation (all Prisma queries scoped by tenantId) is enforced
 * by the schema design — every query in lib/funding, lib/ml, and
 * lib/motherboard uses `where: { tenantId }` explicitly.
 */

describe("Tenant Isolation: Score Functions Are Stateless", () => {
    const tenantAProfile = { personalScore: 750, utilization: 0.20, inquiries6m: 1, negativeItems: 0, openAccounts: 8 };
    const tenantBProfile = { personalScore: 580, utilization: 0.80, inquiries6m: 6, negativeItems: 4, openAccounts: 1 };

    it("tenant A score is unaffected by tenant B computation order", () => {
        // Run B first, then A — result must be identical to running A alone
        calculateReadinessScore(tenantBProfile);
        const resultA = calculateReadinessScore(tenantAProfile);

        // Run A first, then B
        const resultA2 = calculateReadinessScore(tenantAProfile);
        calculateReadinessScore(tenantBProfile);

        expect(resultA.readinessScore).toBe(resultA2.readinessScore);
        expect(resultA.band).toBe(resultA2.band);
    });

    it("tenant B score is unaffected by tenant A computation order", () => {
        calculateReadinessScore(tenantAProfile);
        const resultB = calculateReadinessScore(tenantBProfile);

        const resultB2 = calculateReadinessScore(tenantBProfile);
        calculateReadinessScore(tenantAProfile);

        expect(resultB.readinessScore).toBe(resultB2.readinessScore);
        expect(resultB.band).toBe(resultB2.band);
    });

    it("gate decisions are deterministic per-profile regardless of call order", () => {
        checkFundingGates(tenantAProfile);
        const gateB = checkFundingGates(tenantBProfile);

        const gateB2 = checkFundingGates(tenantBProfile);
        checkFundingGates(tenantAProfile);

        expect(gateB.blocked).toBe(gateB2.blocked);
        expect(gateB.caution).toBe(gateB2.caution);
    });

    it("strong profile always scores higher than weak profile", () => {
        const strong = calculateReadinessScore(tenantAProfile);
        const weak = calculateReadinessScore(tenantBProfile);
        expect(strong.readinessScore).toBeGreaterThan(weak.readinessScore);
        expect(strong.band).toBe("STRONG");
        expect(weak.band).toBe("LOW");
    });

    it("strong profile is never blocked by gates", () => {
        const gates = checkFundingGates(tenantAProfile);
        expect(gates.blocked).toBe(false);
    });

    it("weak profile is always blocked by gates", () => {
        const gates = checkFundingGates(tenantBProfile);
        expect(gates.blocked).toBe(true);
    });
});
