# KWANUS OS — Repository Structure Specification (RepoSpec)
A complete specification of the repository architecture for the KWANUS Operating System.

This document defines:
- folder layout  
- naming conventions  
- file conventions  
- domain boundaries  
- documentation placement  
- testing placement  
- CI/CD placement  
- versioning structure  

It ensures the repo remains clean, predictable, and scalable.

---

# 1. Repository Philosophy

The KWANUS OS repository must be:
- organized  
- consistent  
- discoverable  
- domain‑driven  
- scalable  
- contributor‑friendly  

The structure reflects the system architecture:
- frontend  
- services  
- API  
- database  
- documentation  
- tests  
- CI/CD  

---

# 2. Top‑Level Folder Structure

```
/
app/                     # Next.js App Router
components/              # UI + layout components
lib/                     # Services + utilities
prisma/                  # Database schema + migrations
public/                  # Static assets
tests/                   # Unit, integration, E2E tests
docs/                    # Documentation system
scripts/                 # DevOps + tooling scripts
.github/                 # CI/CD workflows
package.json
tsconfig.json
next.config.js
tailwind.config.js
README.md
```

---

# 3. `app/` Structure (Pages & Layouts)

```
app/
  layout.tsx
  dashboard/
    page.tsx
  upload/
    page.tsx
  reports/
    page.tsx
    [id]/
      page.tsx
      items/
        page.tsx
        [itemId]/
          page.tsx
  dispute-center/
    page.tsx
    recommendations/
      page.tsx
  funding/
    page.tsx
  settings/
    page.tsx
```

Rules:
- server components by default  
- minimal client components  
- domain‑driven folder structure  

---

# 4. `components/` Structure (UI System)

```
components/
  ui/            # Buttons, inputs, toggles, modals
  layout/        # PageHeader, Section, Container
  navigation/    # Sidebar, BottomNav, NavItem
  data/          # Table, Stat, ChartWrapper
  feedback/      # Alert, Toast, Skeleton
  forms/         # Form, FormField, FieldLabel
```

Rules:
- PascalCase filenames  
- one component per file  
- colocated types when needed  

---

# 5. `lib/` Structure (Service Layer)

```
lib/
  uploadService.ts
  reportService.ts
  itemService.ts
  disputeService.ts
  recommendationService.ts
  fundingService.ts
  comparisonService.ts
  bureauService.ts
  simulationService.ts
  validators/
    reportValidator.ts
    itemValidator.ts
```

Rules:
- pure functions  
- no side effects except DB  
- no UI logic  

---

# 6. `prisma/` Structure (Database Layer)

```
prisma/
  schema.prisma
  migrations/
    20260213_init/
    20260214_add_funding/
    ...
```

Rules:
- one schema  
- versioned migrations  
- no destructive changes without backup  

---

# 7. `tests/` Structure (Testing System)

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

Rules:
- Jest for unit  
- Prisma for integration  
- Playwright for E2E  

---

# 8. `docs/` Structure (Documentation System)

```
docs/
  architecture/
  design/
  operations/
  product/
  guides/
  reference/
  changelog/
```

Rules:
- markdown only  
- versioned via changelog  
- no HTML  

---

# 9. `.github/` Structure (CI/CD)

```
.github/
  workflows/
    ci.yml
    deploy.yml
    lint.yml
    test.yml
```

Rules:
- all PRs must pass CI  
- staging deploys from `develop`  
- production deploys from `main`  

---

# 10. Naming Conventions

## Files
- `camelCase` for utilities  
- `PascalCase` for components  
- `kebab-case` for config files  

## Folders
- domain‑driven  
- lowercase  

## Types
- `PascalCase`  
- suffix with `Type` or domain name  

---

# 11. Versioning Structure

## Branches
- `main` — production  
- `develop` — staging  
- `feature/*` — feature branches  

## Tags
- `v1.x.x`  
- `v2.x.x`  
- `v3.x.x`  

---

# 12. Summary

The Repository Structure Specification ensures:
- clean repo organization  
- predictable file layout  
- scalable architecture  
- contributor‑friendly structure  
- long‑term maintainability  

This is the backbone of the KWANUS OS repository.
