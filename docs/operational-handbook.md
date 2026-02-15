# KWANUS OS — Operational Handbook
A practical guide for how the KWANUS OS engineering team operates day‑to‑day.

This handbook defines:
- workflows  
- rituals  
- cadence  
- communication patterns  
- engineering expectations  
- review processes  
- operational culture  

It ensures the OS evolves with clarity, coherence, and emotional intelligence.

---

# 1. Operating Principles

## 1. Emotional Intelligence First
Every interaction, decision, and workflow must:
- reduce overwhelm  
- increase clarity  
- maintain emotional safety  
- support grounded pacing  

## 2. Clarity Over Speed
We move quickly, but never chaotically.  
Every step is intentional.

## 3. Consistency Over Novelty
We follow established patterns unless there is a clear reason to evolve them.

## 4. Stewardship Over Execution
The OS is a living system — we guide it, not just build it.

---

# 2. Daily Workflow

## Morning (or start of work session)
- Review open issues  
- Check the project board  
- Move tasks into **In Progress**  
- Confirm environment is running  
- Run migrations if needed  
- Review PRs waiting for feedback  

## During Work
- Work on one issue at a time  
- Keep PRs small and focused  
- Follow the folder structure  
- Follow the service‑first architecture  
- Write clean, typed, documented code  

## End of Work Session
- Push branch  
- Open PR if ready  
- Update project board  
- Leave notes for next session  

---

# 3. Weekly Cadence

## Monday (or start of week)
- Review milestone progress  
- Prioritize issues  
- Assign tasks  
- Identify blockers  

## Mid‑Week
- Merge completed PRs  
- Run QA tests  
- Update documentation  

## End of Week
- Review what shipped  
- Update roadmap if needed  
- Prepare next week’s tasks  

---

# 4. Rituals (Operational, Not Emotional)

These are engineering rituals — not user rituals.

## Ritual 1 — The “One Source of Truth” Ritual
Before coding:
- check the issue  
- check the milestone  
- check the architecture doc  
- check the folder structure  

## Ritual 2 — The “Thin PR” Ritual
PRs must be:
- small  
- focused  
- reviewable  
- testable  

## Ritual 3 — The “End‑to‑End Validation” Ritual
Before marking an issue DONE:
- run the full flow  
- confirm no mock data  
- confirm no console errors  
- confirm no 500s  

## Ritual 4 — The “Documentation Touch” Ritual
Every feature must update:
- README  
- architecture docs  
- roadmap (if relevant)  

---

# 5. Communication Standards

## PR Communication
- clear summary  
- screenshots for UI  
- test steps  
- link to issue  
- link to milestone  

## Issue Communication
- clear description  
- acceptance criteria  
- dependencies  
- no ambiguity  

## Team Communication
- concise  
- respectful  
- emotionally intelligent  
- no overwhelm  

---

# 6. Engineering Expectations

## Code Expectations
- strict TypeScript  
- no `any`  
- no mock data  
- no console errors  
- no unused imports  
- no dead code  

## API Expectations
- consistent JSON shapes  
- proper error handling  
- SSR auth only  
- no leaking internal errors  

## Database Expectations
- migrations for every schema change  
- no manual edits to migrations  
- schema must match frontend needs  

---

# 7. Review Process

## Step 1 — Developer Review
Developer checks:
- code quality  
- correctness  
- tests  
- documentation  

## Step 2 — Engineering Lead Review
Lead checks:
- architecture alignment  
- emotional‑intelligent design  
- performance  
- security  

## Step 3 — Steward Review (if needed)
Steward checks:
- narrative alignment  
- emotional coherence  
- long‑term vision  

## Step 4 — Merge
PR merged into main.

---

# 8. Deployment Workflow

## Pre‑Deployment
- run full QA suite  
- confirm no mock data  
- confirm migrations applied  
- confirm all PRs merged  

## Deployment
- deploy via Vercel  
- verify environment variables  
- verify Supabase migrations  

## Post‑Deployment
- smoke test  
- update release notes  
- update roadmap  

---

# 9. Operational Culture

KWANUS OS is built with:
- clarity  
- emotional intelligence  
- architectural coherence  
- long‑term vision  
- grounded pacing  
- respect for the user’s emotional experience  

This culture must be preserved as the system grows.

---

# 10. Summary

The Operational Handbook ensures:
- predictable workflows  
- aligned contributions  
- emotionally intelligent engineering  
- stable evolution  
- long‑term coherence  

This is how the KWANUS OS team moves as one.
