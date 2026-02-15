# Contributing to KWANUS OS

Welcome to the KWANUS OS codebase.  
This guide outlines the standards, workflows, and expectations for contributing to the project.

---

# 1. Branching Strategy

## Main Branch
- Always stable
- Always deployable
- No direct commits

## Feature Branches
Use the format:
`feature/<short-description>`

Examples:
- `feature/upload-endpoint`
- `feature/credititem-model`
- `feature/dispute-center-integration`

## Bugfix Branches
`bugfix/<short-description>`

---

# 2. Commit Standards

Use clear, descriptive commit messages:

Examples:
- "Add CreditReport and CreditItem models"
- "Implement /api/reports/upload endpoint"
- "Wire Dashboard to real credit data"

Avoid vague commits like:
- "fix stuff"
- "update code"

---

# 3. Pull Request Requirements

Every PR must:
- Reference at least one issue
- Link to the v1 milestone
- Include screenshots for UI changes
- Include test steps
- Pass linting and type checks
- Remove all mock data

PRs must follow the PR template.

---

# 4. Code Style

## TypeScript
- Strict mode enabled
- No `any` unless justified
- Prefer explicit types

## React / Next.js
- Use Server Components by default
- Use Client Components only when needed
- Use `async` server functions for data fetching
- No inline fetch calls inside components

## Prisma
- All schema changes require a migration
- Never edit migrations manually
- Always run `npx prisma generate` after changes

---

# 5. API Standards

All API routes must:
- Use Supabase SSR auth (`getCurrentUser()`)
- Validate input
- Return predictable JSON shapes
- Handle errors gracefully
- Never expose internal errors to the client

Response format:
```json
{
  "success": true,
  "data": { ... }
}
```
or
```json
{
  "success": false,
  "error": "Message"
}
```

---

# 6. Frontend Standards

- No mock data
- All data must come from real API routes
- Use loading and error states
- Use Suspense where appropriate
- Keep components small and composable

---

# 7. Testing Requirements

Before marking an issue as DONE:
- Run the full end-to-end flow
- Confirm no console errors
- Confirm no 500 errors
- Confirm real data appears in Dashboard and Dispute Center

---

# 8. Documentation

Every new feature must include:
- Code comments where needed
- PR summary
- Screenshots (if UI)
- Updated README if relevant

---

# 9. Review Process

- At least one reviewer required
- Reviewer checks:
  - Code quality
  - API correctness
  - Data flow
  - Error handling
  - UI behavior
  - No mock data
  - No console errors

---

# 10. Deployment Readiness

A feature is deployable when:
- All tests pass
- No mock data remains
- All API routes respond correctly
- Database migrations applied
- PR merged into main

---

Thank you for contributing to KWANUS OS.
