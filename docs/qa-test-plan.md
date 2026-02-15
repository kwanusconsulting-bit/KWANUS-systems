# KWANUS OS — QA Test Plan

## Objective
Verify that the full credit pipeline works end-to-end.

---

## Test 1 — Authentication
- Create new user
- Log in
- Refresh page
- Confirm session persists

---

## Test 2 — Upload Flow
- Navigate to Upload page
- Upload a PDF or text file
- Confirm:
  - /api/reports/upload returns reportId
  - rawText is returned

---

## Test 3 — Analysis Flow
- Confirm:
  - /api/reports/analyze creates CreditItem rows
  - Items appear in DB

---

## Test 4 — Dashboard
- Visit Dashboard
- Confirm:
  - Latest report loads
  - Real item count displays
  - No mock data

---

## Test 5 — Dispute Center
- Visit Dispute Center
- Confirm:
  - Real items load
  - Selecting items triggers /api/disputes/recommend
  - Recommendations display correctly

---

## Test 6 — Error Handling
- Upload invalid file
- Confirm graceful error
- Test unauthorized access to protected routes

---

## Test 7 — Final Validation
- No console errors
- No 500 errors
- All flows complete successfully
