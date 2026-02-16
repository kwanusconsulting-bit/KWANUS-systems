# SAFE AGENT EXECUTION FRAMEWORK
**Status:** Safe | Human-Controlled | Deterministic
**Goal:** Finish KWANUS OS Tonight.

This framework is the absolute source of truth for the developer (or human-guided agent) executing the final sprint.

## 1. THE DEVELOPER EXECUTION PLAN

### PHASE 1 — Environment
- [ ] Confirm `.env` variables (Clerk, Stripe, Database, App URL).
- [ ] Confirm Database connection (Prisma Studio or connectivity check).
- [ ] Confirm Clerk keys are valid and active.
- [ ] Confirm Stripe Test keys are valid.
- [ ] Confirm Staging (Vercel Preview) and Production environments exist.

### PHASE 2 — Core Flows
- [ ] **File Upload**: Verify PDF/Image ingestion, storage, and retrieval.
- [ ] **Data Extraction**: Verify OCR coverage (>99%) and field mapping.
- [ ] **Letter Generation**: Verify template rendering and placeholder filling.
- [ ] **Signature**: Verify interaction, save, and PDF embedding.
- [ ] **Stripe Payment**: Verify checkout flow, webhook receipt, and DB sync.
- [ ] **Dashboard**: Verify user data loading and UI state.

### PHASE 3 — Stability
- [ ] **Routing**: Verify auth guards, redirects, and 404 handling.
- [ ] **API**: Verify endpoint responses (200 OK / error handling).
- [ ] **Database**: Verify CRUD integrity and relation coherence.

### PHASE 4 — Verification
- [ ] **Staging**: Full end-to-end testing on the live deployment.
- [ ] **Production**: Deployment and final health check.

### PHASE 5 — Delivery
- [ ] Final visual check.
- [ ] Handoff confirmation.

---

## 2. THE DEVELOPER TASK BOARD

**Columns:**
`BACKLOG` -> `READY` -> `IN PROGRESS` -> `TESTING` -> `STAGING` -> `PRODUCTION` -> `DONE`

**Tasks (Move these across the board):**
- [ ] Environment verification
- [ ] File upload verification
- [ ] Extraction verification
- [ ] Letter generation verification
- [ ] Signature verification
- [ ] Stripe payment verification
- [ ] Dashboard verification
- [ ] Routing verification
- [ ] API verification
- [ ] Database verification
- [ ] Staging verification
- [ ] Production deployment
- [ ] Production verification

---

## 3. VERIFICATION CHECKLISTS

### Core Flows
- [ ] **Login/Signup**: Auth works, session persists.
- [ ] **Dashboard**: Loads correctly with user data.
- [ ] **File Upload**: Accepts valid files, rejects invalid ones.
- [ ] **Extraction**: Returns structured data accurately.
- [ ] **Letters**: Generates correct PDF with dynamic data.
- [ ] **Signature**: Captures and embeds signature in PDF.
- [ ] **Payment**: Completes checkout and updates subscription status.
- [ ] **PDF Export**: Downloads correctly formatted document.

### System Checks
- [ ] **Console**: Zero errors during navigation/actions.
- [ ] **Network**: Zero 500 status codes.
- [ ] **Routes**: All pages load sucessfully.
- [ ] **API**: All endpoints return valid JSON.
- [ ] **Database**: Data persists correctly.

---

## 4. DEPLOYMENT CHECKLIST

**Pre-Deployment:**
- [ ] All local tests passing.
- [ ] All flows verified locally.
- [ ] No unresolved lint/type errors.
- [ ] Git status clean (clean branch).

**Post-Deployment (Staging & Prod):**
- [ ] Homepage loads.
- [ ] Auth (Login/Signup) works.
- [ ] Dashboard renders.
- [ ] Payments flow works.
- [ ] Letter generation works.
- [ ] Uploads work.

---

**EXECUTE STRICTLY. NO DEVIATIONS.**
