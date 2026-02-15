# KWANUS OS — Navigation Specification (NavSpec)
A complete specification for navigation behavior, structure, and interaction patterns across the KWANUS Operating System.

This document defines:
- navigation hierarchy  
- mobile vs desktop patterns  
- active state rules  
- transitions  
- accessibility requirements  
- component usage  
- scaling logic  

It ensures the OS remains predictable, coherent, and easy to navigate.

---

# 1. Navigation Philosophy

Navigation must be:
- simple  
- predictable  
- consistent  
- unobtrusive  
- structurally clear  

Users should always know:
- where they are  
- where they can go  
- how to return  

---

# 2. Navigation Modes

KWANUS OS uses two navigation modes:

## 1. Desktop Navigation
- left sidebar  
- persistent  
- icon + label  
- collapsible (optional)  

## 2. Mobile Navigation
- bottom navigation bar  
- floating upload action  
- simplified structure  
- icon‑only or icon + label  

---

# 3. Primary Navigation Structure

## Desktop Sidebar
- Dashboard
- Upload
- Reports
- Dispute Center
- Funding
- Settings

## Mobile Bottom Nav
- Dashboard
- Reports
- Dispute Center
- Settings

Upload appears as a floating action button (FAB) on mobile.

---

# 4. Navigation Hierarchy

## Level 1 — Primary Sections
- Dashboard  
- Upload  
- Reports  
- Dispute Center  
- Funding  
- Settings  

## Level 2 — Subsections
- Reports → Report Detail  
- Reports → Item List  
- Dispute Center → Recommendations  
- Funding → Recommendations  
- Settings → Profile / Account / Security  

## Level 3 — Detail Views
- Item Detail  
- Report Comparison (v2+)  
- Funding Score Breakdown  

---

# 5. Navigation Behavior Rules

## 1. Active State Rules
- active item must be visually distinct  
- only one active item at a time  
- active state persists across reloads  
- active state follows the URL  

## 2. Hover & Focus Rules
- hover: subtle highlight  
- focus: visible outline  
- no motion‑heavy transitions  

## 3. Collapsible Sidebar (Desktop)
- optional  
- collapsed state shows icons only  
- expanded state shows icons + labels  
- collapse state persists  

---

# 6. Mobile Navigation Rules

## Bottom Navigation
- max 4 items  
- icons must be consistent  
- labels optional but recommended  
- active state uses color + underline  

## Floating Action Button (FAB)
- used for Upload only  
- positioned bottom‑center  
- circular shape  
- high contrast  
- no text label  

---

# 7. Navigation Transitions

## Page Transitions
- fade or slide (subtle)  
- no bounce  
- no overshoot  

## Sidebar Transitions
- smooth expand/collapse  
- no animation longer than 200ms  

## Modal Transitions
- fade in/out  
- no scale pop  

---

# 8. Navigation Components

## 1. Sidebar
- vertical list  
- icons + labels  
- active highlight  
- scrollable if needed  

## 2. BottomNav
- fixed to bottom  
- equal spacing  
- active indicator  
- safe‑area padding  

## 3. NavItem
Props:
```typescript
{
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}
```

## 4. Breadcrumbs (Optional)
Used for:
- deep report navigation  
- multi‑step flows  

---

# 9. Accessibility Requirements

- keyboard navigable  
- focus states visible  
- ARIA labels for icons  
- semantic `<nav>` elements  
- skip‑to‑content link on desktop  

---

# 10. Scaling Logic

Navigation must scale to support:

## v2 Additions
- Timeline  
- Multi‑report comparison  
- Ritual progression  

## v3 Additions
- Identity  
- Simulation  
- Multi‑bureau views  

Rules:
- no more than 6 primary items  
- new items must fit into existing domains  
- avoid adding new top‑level sections unless necessary  

---

# 11. Summary

The Navigation Specification ensures:
- predictable movement  
- consistent structure  
- scalable architecture  
- clear hierarchy  
- unified experience  

This is the structural logic that guides users through the KWANUS OS universe.
