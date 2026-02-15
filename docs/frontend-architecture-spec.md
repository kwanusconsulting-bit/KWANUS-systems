# KWANUS OS — Frontend Architecture Specification (FAS)
A complete specification of the frontend architecture for the KWANUS Operating System.

This document defines:
- component hierarchy  
- rendering strategy  
- server/client boundaries  
- page composition rules  
- data flow  
- folder structure  
- versioned evolution (v1–v3)  

It ensures the frontend remains consistent, scalable, and aligned with the system architecture.

---

# 1. Architecture Philosophy

The KWANUS OS frontend must be:
- server‑first  
- component‑driven  
- predictable  
- typed  
- modular  
- scalable  

The architecture is built on:
- Next.js App Router  
- Server Components by default  
- Client Components only when necessary  
- Strict TypeScript  
- Tailwind CSS  

---

# 2. Rendering Strategy

## Server Components (default)
Used for:
- pages  
- layouts  
- data fetching  
- static UI  
- SEO‑relevant content  

## Client Components (only when needed)
Used for:
- forms  
- uploads  
- interactive UI  
- stateful components  
- event handlers  

## Rules
- never convert a component to client unless required  
- keep client components small  
- isolate interactivity  

---

# 3. Folder Structure

```
app/
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

components/
  ui/
  layout/
  navigation/
  data/
  feedback/
  forms/

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

types/
  report.ts
  item.ts
  recommendation.ts
  funding.ts
  simulation.ts
```

---

# 4. Page Composition Rules

## Page Structure
Every page must follow:
- `PageHeader`  
- main content section  
- optional sidebar  
- consistent spacing  

## Layouts
- `app/layout.tsx` defines global shell  
- domain‑specific layouts optional  

## Data Loading
- server‑side only  
- use `async` page components  
- no client‑side fetching unless required  

---

# 5. Component Hierarchy

## Level 1 — Page Components
- server components  
- orchestrate data  
- compose sections  

## Level 2 — Section Components
- server or client  
- represent logical page sections  

## Level 3 — UI Components
- client or server  
- reusable building blocks  

## Level 4 — Primitive Components
- always client  
- buttons, inputs, toggles  

---

# 6. Data Flow Rules

## Server → Client
- pass only required props  
- no raw database objects  
- no sensitive fields  

## Client → Server
- forms submit to API routes  
- no direct DB access  
- no client‑side mutations  

## State Management
- local component state only  
- no global state library  
- no Redux, Zustand, Jotai  

---

# 7. API Integration Rules

## Server Components
- call services directly  
- no fetch to internal API  

## Client Components
- call API routes  
- handle optimistic UI (optional)  

## Error Handling
- inline UI messages  
- no console errors  

---

# 8. Styling Architecture

## Tailwind CSS
- utility‑first  
- consistent spacing scale  
- consistent typography scale  

## Component Styling
- no inline styles  
- no CSS modules  
- no global CSS except resets  

---

# 9. Accessibility Architecture

- semantic HTML  
- ARIA attributes where needed  
- visible focus states  
- keyboard navigable  
- proper labeling  

---

# 10. Versioned Evolution

## v1
- dashboard  
- upload  
- reports  
- dispute center  

## v2
- funding  
- multi‑report comparison  
- timeline  

## v3
- bureau intelligence  
- simulations  
- advanced visualizations  

---

# 11. Summary

The Frontend Architecture Specification ensures:
- predictable rendering  
- clean component hierarchy  
- consistent data flow  
- scalable structure  
- long‑term maintainability  

This is the blueprint for the KWANUS OS frontend.
