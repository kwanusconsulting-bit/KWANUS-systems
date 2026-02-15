# KWANUS OS — Extension Developer Guide (ExtDevGuide)
A complete guide for developers building extensions, plugins, and integrations for the KWANUS Operating System.

This document defines:
- extension architecture  
- plugin structure  
- manifest format  
- permissions model  
- API usage rules  
- testing requirements  
- packaging rules  
- publishing workflow  
- versioning  
- compliance requirements  

It ensures all extensions are safe, predictable, and compatible with the KWANUS OS ecosystem.

---

# 1. Extension Philosophy

Extensions must be:
- safe  
- isolated  
- predictable  
- versioned  
- permission‑bound  
- easy to build  
- easy to audit  

Extensions **cannot** modify core system behavior.  
Extensions **can** add new capabilities within approved boundaries.

---

# 2. Extension Types

## 1. UI Extensions
- add UI components  
- embed panels, widgets, or views  
- read data through approved APIs  

## 2. Data Extensions
- process user‑approved data  
- generate insights  
- export data  

## 3. Workflow Extensions
- trigger workflows  
- automate tasks  
- integrate external services  

## 4. Export Extensions
- generate PDFs, CSVs, or external formats  
- export user‑approved data  

---

# 3. Extension Structure

Every extension must include:

```
extension/
  manifest.json
  src/
    index.ts
    components/
    utils/
  tests/
  README.md
```

---

# 4. Manifest Specification

## `manifest.json`
```json
{
  "id": "com.example.myplugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Adds new capabilities to KWANUS OS.",
  "permissions": ["read:reports", "write:exports"],
  "entry": "src/index.ts",
  "compatibility": {
    "kwanus": "^1.0.0"
  }
}
```

### Required Fields
- `id` — globally unique  
- `name` — human‑readable  
- `version` — semantic version  
- `permissions` — explicit list  
- `entry` — entry file  
- `compatibility` — version range  

---

# 5. Permissions Model

## Permission Categories

### Read Permissions
- `read:reports`  
- `read:items`  
- `read:recommendations`  
- `read:funding`  

### Write Permissions
- `write:exports`  
- `write:workflows`  

### Restricted Permissions
- `read:raw-report-text` (never granted to public plugins)  
- `read:simulation-data` (partner‑only)  

## Rules
- least privilege  
- explicit declaration  
- user approval required  

---

# 6. Extension API Usage

## API Access
Extensions may call:
- public extension APIs  
- versioned endpoints  
- read/write endpoints based on permissions  

Extensions may NOT:
- call internal APIs  
- call service‑layer functions  
- access database directly  

## API Client
Extensions must use the official SDK:
```typescript
import { KwanusClient } from "@kwanus/sdk";
```

---

# 7. UI Integration Rules

## Allowed
- embed components in extension zones  
- render custom UI  
- use KWANUS UI primitives  

## Not Allowed
- override core UI  
- modify navigation  
- inject global styles  

---

# 8. Testing Requirements

## Required Tests
- unit tests  
- permission tests  
- API contract tests  

## Optional Tests
- integration tests  
- UI snapshot tests  

## Tools
- Jest  
- Playwright (optional)  

---

# 9. Packaging Rules

## Build Output
```
dist/
  index.js
  manifest.json
```

## Requirements
- no source maps in production  
- no secrets  
- no environment variables baked in  

---

# 10. Publishing Workflow

## Steps
1. validate manifest  
2. run tests  
3. build extension  
4. submit to KWANUS Extension Registry  
5. automated validation  
6. manual review (optional)  
7. publish  

## Versioning
- semantic versioning  
- no breaking changes in patch/minor releases  

---

# 11. Compliance Requirements

## Required
- no PII storage  
- no unauthorized data export  
- no long‑term caching  
- no external tracking  

## Audits
- quarterly automated audit  
- annual manual audit  

---

# 12. Summary

The Extension Developer Guide ensures:
- safe extension development  
- predictable plugin behavior  
- strict permission boundaries  
- consistent packaging  
- long‑term ecosystem health  

This is the backbone of the KWANUS OS extension developer experience.
