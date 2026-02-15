# KWANUS OS — Information Architecture (IA) Map
A complete structural map of the KWANUS Operating System.

This document defines:
- page hierarchy  
- navigation structure  
- system flows  
- content groupings  
- cross‑page relationships  
- domain boundaries  

It ensures the OS remains coherent, predictable, and scalable.

---

# 1. Top‑Level Structure

KWANUS OS is organized into six primary domains:

1. **Home / Dashboard**
2. **Upload**
3. **Reports**
4. **Dispute Center**
5. **Funding**
6. **Settings**

Each domain contains sub‑pages and flows.

---

# 2. Global Navigation Map

## Primary Navigation (Desktop)
- Dashboard  
- Upload  
- Reports  
- Dispute Center  
- Funding  
- Settings  

## Primary Navigation (Mobile)
- Dashboard  
- Reports  
- Dispute Center  
- Settings  

Upload appears as a floating action button on mobile.

---

# 3. Domain Maps

---

## Domain 1 — Dashboard

### Path
`/dashboard`

### Purpose
- Provide a high‑level overview of the user’s credit universe  
- Display key stats  
- Provide quick access to core flows  

### Sections
- Latest Report Summary  
- Key Metrics  
- Quick Actions  
- Recent Activity  

---

## Domain 2 — Upload

### Path
`/upload`

### Purpose
- Accept credit report files  
- Trigger parsing and analysis  

### Flow
1. File selection  
2. Upload  
3. Processing  
4. Confirmation  
5. Redirect to Dashboard or Reports  

---

## Domain 3 — Reports

### Path
`/reports`

### Purpose
- Display parsed credit data  
- Provide item‑level detail  
- Support multi‑report browsing  

### Sub‑Pages
- `/reports` — Report List  
- `/reports/[id]` — Report Detail  
- `/reports/[id]/items` — Item List  
- `/reports/[id]/items/[itemId]` — Item Detail  

### Sections (Report Detail)
- Summary  
- Accounts  
- Inquiries  
- Public Records  
- Collections  

---

## Domain 4 — Dispute Center

### Path
`/dispute-center`

### Purpose
- Generate dispute recommendations  
- Provide item selection  
- Provide dispute summaries  

### Sub‑Pages
- `/dispute-center` — Item Selection  
- `/dispute-center/recommendations` — Recommendations  
- `/dispute-center/letters` — Letter Generation (v2+)  

### Flow
1. Select items  
2. Generate recommendations  
3. Review recommendations  
4. Export or continue  

---

## Domain 5 — Funding

### Path
`/funding`

### Purpose
- Provide funding readiness insights  
- Display lender compatibility  
- Provide next‑step guidance  

### Sub‑Pages
- `/funding` — Funding Overview  
- `/funding/recommendations` — Personalized Recommendations  
- `/funding/score` — Funding Score Breakdown  

---

## Domain 6 — Settings

### Path
`/settings`

### Purpose
- Manage user profile  
- Manage preferences  
- Manage account  

### Sections
- Profile  
- Account  
- Security  
- Data Management  

---

# 4. System Flows

---

## Flow 1 — Upload → Analyze → Dashboard
1. User uploads report  
2. System extracts text  
3. System parses items  
4. Dashboard updates  

---

## Flow 2 — Dashboard → Report Detail
1. User clicks “View Report”  
2. System loads latest report  
3. User navigates through sections  

---

## Flow 3 — Report → Dispute Center
1. User selects items  
2. System generates recommendations  
3. User reviews results  

---

## Flow 4 — Dashboard → Funding
1. User opens Funding  
2. System loads readiness score  
3. User views recommendations  

---

# 5. Cross‑Domain Relationships

- Dashboard links to Reports, Dispute Center, Funding  
- Reports link to Dispute Center  
- Dispute Center links back to Reports  
- Funding links to Reports  
- Settings is globally accessible  

---

# 6. Page Templates

## Template 1 — Dashboard Template
- Header  
- Stats  
- Cards  
- Quick Actions  

## Template 2 — List Template
- Title  
- Filters  
- List Items  

## Template 3 — Detail Template
- Header  
- Summary  
- Sections  

## Template 4 — Flow Template
- Step Indicator  
- Content  
- Primary Action  

---

# 7. Information Hierarchy Rules

- One primary action per page  
- Clear section boundaries  
- Predictable navigation  
- Consistent page titles  
- Logical grouping of content  

---

# 8. Summary

The Information Architecture Map ensures:
- structural clarity  
- predictable navigation  
- scalable growth  
- consistent user experience  
- clean domain boundaries  

This is the structural backbone of the KWANUS OS universe.
