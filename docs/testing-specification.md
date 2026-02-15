# KWANUS OS — Testing Specification (TestSpec)
A complete specification of the testing architecture for the KWANUS Operating System.

This document defines:
- testing layers  
- test types  
- folder structure  
- mocking strategy  
- coverage rules  
- CI integration  
- versioned evolution (v1–v3)  

It ensures the system remains stable, predictable, and regression‑resistant.

---

# 1. Testing Philosophy

KWANUS OS testing must be:
- layered  
- deterministic  
- isolated  
- fast  
- reproducible  
- CI‑friendly  

The testing stack includes:
- **Jest** for unit tests  
- **Playwright** for E2E tests  
- **Prisma test environment** for integration tests  

---

# 2. Testing Layers

## 1. Unit Tests (Jest)
Test:
- pure functions  
- service logic  
- utilities  
- data transformations  

Do NOT test:
- API routes  
- database queries  
- UI rendering  

## 2. Integration Tests
Test:
- service + database interactions  
- Prisma queries  
- parsing pipelines  

Do NOT test:
- UI  
- navigation  

## 3. End‑to‑End Tests (Playwright)
Test:
- full user flows  
- navigation  
- form submission  
- upload flow  
- dispute flow  
- funding flow  

Do NOT test:
- internal logic  
- database structure  

---

# 3. Folder Structure

```
tests/
  unit/
    services/
    utils/
  integration/
    prisma/
    pipelines/
  e2e/
    dashboard.spec.ts
    upload.spec.ts
    reports.spec.ts
    dispute.spec.ts
    funding.spec.ts
```

---

# 4. Unit Test Specification (Jest)

## Naming
`*.test.ts`

## Structure
```typescript
describe("functionName", () => {
  it("does X", () => {
    expect(...).toBe(...)
  })
})
```

## Mocking Rules
- mock Prisma client  
- mock external services  
- mock file uploads  
- no network calls  

## Coverage Targets
- 90%+ for services  
- 95%+ for utilities  

---

# 5. Integration Test Specification

## Environment
- isolated test database  
- seeded data  
- reset between tests  

## What to Test
- parsing pipeline  
- report creation  
- item normalization  
- dispute selection  
- recommendation generation  

## What NOT to Test
- UI  
- navigation  
- styling  

---

# 6. End‑to‑End Test Specification (Playwright)

## Naming
`*.spec.ts`

## Required Flows
- Dashboard loads  
- Upload flow works  
- Reports list loads  
- Report detail loads  
- Item detail loads  
- Dispute selection works  
- Recommendations generate  
- Funding page loads  

## Assertions
- visible elements  
- correct navigation  
- correct data rendering  
- no console errors  

## Browser Matrix
- Chromium  
- WebKit  
- Firefox  

---

# 7. Mocking Strategy

## Unit Tests
- mock Prisma  
- mock file system  
- mock external APIs  

## Integration Tests
- real Prisma  
- real database  
- no external APIs  

## E2E Tests
- real API  
- real database  
- mock external services only  

---

# 8. CI Integration (GitHub Actions)

## Required Steps
- install dependencies  
- run type check  
- run lint  
- run unit tests  
- run integration tests  
- run E2E tests  
- upload coverage  

## Required Conditions
- all tests must pass  
- coverage thresholds must be met  
- no console errors in E2E  

---

# 9. Versioned Evolution

## v1
- upload flow tests  
- parsing tests  
- report tests  
- dispute tests  

## v2
- funding tests  
- comparison tests  
- timeline tests  

## v3
- bureau intelligence tests  
- simulation tests  
- advanced visualization tests  

---

# 10. Summary

The Testing Specification ensures:
- stable releases  
- regression protection  
- predictable behavior  
- scalable test architecture  
- long‑term maintainability  

This is the backbone of the KWANUS OS quality system.
