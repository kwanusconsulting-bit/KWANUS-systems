# KWANUS OS — Coding Standards Specification (CodeSpec)
A complete specification of the coding standards for the KWANUS Operating System.

This document defines:
- naming conventions  
- TypeScript rules  
- component rules  
- service rules  
- API rules  
- file rules  
- import rules  
- architectural constraints  
- linting rules  
- formatting rules  
- commit rules  

It ensures the codebase remains clean, consistent, and maintainable.

---

# 1. Code Philosophy

KWANUS OS code must be:
- predictable  
- typed  
- modular  
- readable  
- maintainable  
- scalable  

The codebase reflects:
- strict TypeScript  
- server‑first architecture  
- domain‑driven structure  
- minimal client‑side logic  

---

# 2. Naming Conventions

## Files
- components: `PascalCase.tsx`
- utilities: `camelCase.ts`
- services: `camelCaseService.ts`
- API routes: `route.ts`
- types: `PascalCase.ts`

## Variables
- `camelCase`
- descriptive
- no abbreviations

## Types & Interfaces
- `PascalCase`
- suffix with `Type` or domain name

## Components
- `PascalCase`
- one component per file

---

# 3. TypeScript Rules

## Strict Mode
- always enabled

## Types
- no `any`
- no implicit `any`
- no `unknown` unless validated
- prefer `type` over `interface` unless extending

## Nullability
- avoid `null`
- prefer `undefined`
- explicit optional fields

## Enums
- avoid enums
- use union string types instead

---

# 4. Component Rules

## Server Components (default)
- no `use client`
- no event handlers
- no local state

## Client Components (only when needed)
- must include `"use client"`
- minimal logic
- no heavy computation
- no data fetching

## Props
- typed props
- no implicit `any`
- no unused props

## Structure
```typescript
export function ComponentName(props: PropsType) {
  return (...)
}
```

---

# 5. Service Rules

## Structure
- pure functions
- no side effects except DB
- no UI logic
- no request/response objects

## Naming
- `uploadService.ts`
- `reportService.ts`

## Error Handling
- throw typed errors
- no raw errors
- no console errors

---

# 6. API Route Rules

## Structure
- validate input
- call service
- return JSON

## No Business Logic
- API routes must not contain domain logic

## Error Handling
```typescript
return NextResponse.json({
  success: false,
  error: "MESSAGE"
})
```

## Methods
- GET for reads
- POST for writes

---

# 7. Import Rules

## Order
1. built‑ins  
2. third‑party  
3. internal modules  
4. components  
5. styles  

## Rules
- no absolute paths except `@/`
- no circular imports
- no unused imports

---

# 8. File Rules

## One Component Per File
- no multi‑component files

## One Service Per File
- no mixed domains

## Max File Size
- 300 lines recommended
- split when needed

---

# 9. Linting Rules

## ESLint
- required
- no warnings allowed
- no unused variables
- no console logs in production

## Prettier
- required
- consistent formatting

## Husky + lint‑staged
- required for all commits

---

# 10. Architectural Constraints

## Server‑First
- server components by default
- client components only when required

## Domain‑Driven
- services grouped by domain
- components grouped by type

## No Global State Libraries
- no Redux
- no Zustand
- no Jotai

## No Direct DB Access in Components
- DB access only in services or server components

---

# 11. Commit Rules

## Conventional Commits
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `refactor:` code change without behavior change
- `test:` test updates
- `chore:` maintenance

## Examples
- `feat: add funding score calculation`
- `fix: correct item normalization`
- `docs: update API reference`

---

# 12. Summary

The Coding Standards Specification ensures:
- consistent code quality  
- predictable structure  
- strict typing  
- clean architecture  
- long‑term maintainability  

This is the backbone of the KWANUS OS coding system.
