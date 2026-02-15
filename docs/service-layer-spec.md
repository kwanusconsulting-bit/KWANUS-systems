# KWANUS OS — Service Layer Specification (SLS)
A complete specification of all service-layer functions in the KWANUS Operating System.

This document defines:
- service modules  
- function responsibilities  
- input/output contracts  
- domain boundaries  
- error rules  
- versioned evolution (v1–v3)  

It ensures the service layer remains clean, predictable, and aligned with the system architecture.

---

# 1. Service Layer Philosophy

The KWANUS OS service layer must be:
- pure  
- typed  
- deterministic  
- domain‑specific  
- side‑effect‑free (except DB calls)  
- reusable across routes  

API routes:
- validate input  
- call services  
- return JSON  

Services:
- contain all business logic  
- never return HTTP responses  
- never access request/response objects  

---

# 2. Service Modules Overview

## v1 Modules
- `uploadService`  
- `reportService`  
- `itemService`  
- `disputeService`  
- `recommendationService`  

## v2 Modules
- `fundingService`  
- `comparisonService`  

## v3 Modules
- `bureauService`  
- `simulationService`  

---

# 3. Module: uploadService (v1)

### Function: `extractText(file: File): Promise<string>`
Extract raw text from uploaded PDF.

### Function: `createReport(userId: string, rawText: string): Promise<Report>`
Store raw text and create report record.

### Function: `processReport(reportId: string): Promise<void>`
Trigger parsing pipeline.

---

# 4. Module: reportService (v1)

### Function: `getReports(userId: string): Promise<Report[]>`
Return all reports for a user.

### Function: `getReport(reportId: string, userId: string): Promise<Report>`
Return a single report.

### Function: `parseReport(rawText: string): ParsedReport`
Convert raw text into structured data.

### Function: `saveParsedReport(reportId: string, parsed: ParsedReport): Promise<void>`
Store parsed data.

---

# 5. Module: itemService (v1)

### Function: `getItems(reportId: string, userId: string): Promise<Item[]>`
Return all items for a report.

### Function: `getItem(itemId: string, userId: string): Promise<Item>`
Return a single item.

### Function: `normalizeItem(raw: any): NormalizedItem`
Normalize parsed item data.

---

# 6. Module: disputeService (v1 → v2)

### Function: `selectItem(userId: string, itemId: string): Promise<void>`
Store selected item.

### Function: `getSelectedItems(userId: string): Promise<Item[]>`
Return selected items.

### Function: `clearSelections(userId: string): Promise<void>`
Clear all selections.

---

# 7. Module: recommendationService (v1 → v2)

### Function: `generateRecommendations(items: Item[]): Promise<Recommendation[]>`
Generate recommendations for selected items.

### Function: `saveRecommendations(recs: Recommendation[]): Promise<void>`
Store recommendations.

### Function: `getRecommendations(userId: string): Promise<Recommendation[]>`
Return stored recommendations.

---

# 8. Module: fundingService (v2)

### Function: `calculateFundingScore(userId: string): Promise<number>`
Compute funding readiness score.

### Function: `getFundingScore(userId: string): Promise<FundingScore>`
Return stored score.

### Function: `generateFundingRecommendations(userId: string): Promise<FundingRecommendation[]>`
Generate lender recommendations.

---

# 9. Module: comparisonService (v2)

### Function: `compareReports(reportA: string, reportB: string, userId: string): Promise<ComparisonResult>`
Compare two reports.

### Function: `saveComparison(result: ComparisonResult): Promise<void>`
Store comparison.

---

# 10. Module: bureauService (v3)

### Function: `getBureauData(reportId: string, userId: string): Promise<BureauData>`
Return bureau‑level intelligence.

### Function: `analyzeBureauData(raw: any): BureauAnalysis`
Analyze bureau‑specific data.

---

# 11. Module: simulationService (v3)

### Function: `runSimulation(type: string, payload: any, userId: string): Promise<SimulationResult>`
Run a simulation.

### Function: `saveSimulation(result: SimulationResult): Promise<void>`
Store simulation result.

---

# 12. Error Rules

All services must:
- throw typed errors  
- never return HTTP responses  
- never expose internal errors  

Example:
```typescript
throw new ServiceError("ITEM_NOT_FOUND");
```

---

# 13. Versioned Evolution

## v1
- upload  
- reports  
- items  
- dispute  
- recommendations  

## v2
- funding  
- comparison  

## v3
- bureau intelligence  
- simulations  

---

# 14. Summary

The Service Layer Specification ensures:
- clean domain logic  
- predictable function contracts  
- scalable architecture  
- reusable logic  
- stable long‑term evolution  

This is the backbone of the KWANUS OS business logic layer.
