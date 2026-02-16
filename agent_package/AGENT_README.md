# AGENT EXECUTION FRAMEWORK
**Status:** Safe | Developer-Ready | Human-Controlled
**Goal:** Finish the KWANUS OS Site TONIGHT.

This document serves as the absolute source of truth for the Agent execution sprint. Follow strict priority and verification protocols.

## 1. THE AGENT TASK BOARD
**Maintain this state in your Project Board/Issue Tracker.**

| Status | Tasks |
| :--- | :--- |
| **BACKLOG** | • Environment verification<br>• File upload verification<br>• Extraction verification<br>• Letter generation verification<br>• Signature verification<br>• Stripe payment verification<br>• Dashboard verification<br>• Routing verification<br>• API verification<br>• Database verification<br>• Full staging verification<br>• Production deployment<br>• Production verification |
| **READY** | *(Pull from Backlog based on Execution Order)* |
| **IN PROGRESS** | *(Active Task)* |
| **TESTING** | *(Unit/Integration/E2E)* |
| **STAGING** | *(Deploy & Verification)* |
| **PRODUCTION** | *(Promote & Final Check)* |
| **DONE** | *(Verified & Closed)* |

---

## 2. THE EXECUTION ORDER
**Strict sequence to ensure dependencies are met.**

1. **Environment**: Verify keys, DB connection, and secrets.
2. **File Uploads**: Verify PDF/Image ingestion and storage.
3. **Extraction**: Verify OCR and data mapping coverage (>99%).
4. **Letters**: Verify template generation and placeholder filling.
5. **Signatures**: Verify capture, save, and embedding.
6. **Payments**: Verify Stripe checkout, webhooks, and subscription sync.
7. **Dashboard**: Verify data loading and UI rendering.
8. **Routing**: Verify navigation, auth barriers, and redirects.
9. **API**: Verify all endpoints return 200/400/500 correctly.
10. **Database**: Verify CRUD integrity and relations.
11. **Staging**: Full system test on live staging URL.
12. **Production**: Final promotion and health check.

---

## 3. VERIFICATION CHECKLISTS
**Do not mark DONE without passing all checks.**

### Core Flows
- [ ] **Login/Signup**: Auth works, session persists.
- [ ] **Dashboard**: Loads user data, credit items, letters.
- [ ] **Upload**: File accepts, extraction triggers, data returns.
- [ ] **Letter**: PDF generates, signature embeds, download works.
- [ ] **Payment**: Checkout redirects, webhook creates subscription.

### System Health
- [ ] **Console**: No errors or unhandled rejections.
- [ ] **Network**: No 500 errors on critical paths.
- [ ] **Routes**: All pages load (no 404s).
- [ ] **Database**: Writes persist, reads match writes.

---

## 4. DEPLOYMENT PROTOCOL
**Safety Rules:**
1. **Pre-Deploy**: All local tests pass. Git status clean.
2. **Staging**: Deploy to Vercel Preview/Staging. Run Verification Checklist.
3. **Promotion**: Only promote if Staging is 100% Green.
4. **Post-Deploy**: Run Health Check script on Production.

---

## 5. QA CHECKLIST
**Specific Edge Case Testing**

- [ ] **File Uploads**: Test multi-page PDFs, large files, corrupted files (should error gracefully).
- [ ] **Letters**: Test long names, missing fields (should use fallbacks or placeholders).
- [ ] **Signatures**: Test redraw, clear, save, and reload.
- [ ] **Stripe**: Test failed card, successful payment, refund event.

---

## 6. DEVELOPER INSTRUCTIONS
**Operational Rules for the Agent**

- **Work in Branches**: `feature/task-name` or `fix/issue-name`.
- **Atomic Commits**: "feat: add upload validation", "fix: resolve stripe webhook error".
- **No Direct Pushes**: Always use PRs (even if self-merging after checks).
- **Stop on Error**: If a test fails, FIX IT before moving to the next task.
- **Logs**: Keep logs clean. Remove debug prints before production.

---

**SEND THIS TO YOUR AGENT NOW.**
