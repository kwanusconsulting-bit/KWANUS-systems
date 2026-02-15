# KWANUS OS — Engineering Playbook
A tactical guide for writing code inside the KWANUS Operating System.

This playbook defines:
- coding patterns  
- architectural rules  
- API conventions  
- service design  
- component structure  
- testing expectations  
- performance guidelines  

It ensures the OS remains coherent, scalable, and emotionally intelligent.

---

# 1. Architectural Principles

## 1. Service‑First Architecture
All business logic must live in `lib/`:
- parsing  
- analysis  
- recommendations  
- intelligence  
- timelines  
- rituals  

API routes must remain thin:
- validate input  
- call services  
- return JSON  

## 2. Server‑First Rendering
Use **Server Components** by default.  
Use Client Components only when:
- user interaction is required  
- file uploads  
- stateful UI  

## 3. Predictable Data Flow
Data flows in one direction:

Frontend → API → Services → Prisma → Database

Never bypass this flow.

---

# 2. File & Folder Rules

## 1. API Routes
Location:
`app/api/<domain>/<action>/route.ts`

Rules:
- one responsibility per route  
- no business logic  
- no database logic  
- no inline parsing  
- no inline analysis  

## 2. Services
Location:
`lib/<domain>.ts`

Rules:
- pure functions  
- no side effects  
- no direct HTTP responses  
- no UI logic  

## 3. Components
Location:
`components/<domain>/<ComponentName>.tsx`

Rules:
- small  
- composable  
- typed  
- no business logic  

---

# 3. API Design Rules

## 1. Input Validation
Every route must validate:
- required fields  
- types  
- array lengths  
- user ownership  

## 2. Response Shape
All responses must follow:

Success:
```json
{
  "success": true,
  "data": { ... }
}
```

Error:
```json
{
  "success": false,
  "error": "Message"
}
```

## 3. Authentication
All routes must use:
`const user = await getCurrentUser();`

Never trust client‑side identity.

---

# 4. Prisma Rules

## 1. Schema Changes
- every change requires a migration  
- never edit migrations manually  
- run `prisma generate` after changes  

## 2. Query Rules
- always filter by `userId`  
- never expose internal IDs  
- use transactions for batch inserts  

---

# 5. Component Rules

## 1. Server Components
Use for:
- data fetching  
- rendering pages  
- static UI  

## 2. Client Components
Use for:
- forms  
- uploads  
- interactive UI  
- stateful components  

## 3. Styling
- Tailwind only  
- no inline styles  
- no CSS modules  

---

# 6. Error Handling Rules

## 1. API Errors
Never throw raw errors.  
Always return:
`return NextResponse.json({ success: false, error: "Message" }, { status: 400 });`

## 2. UI Errors
- show friendly messages  
- avoid technical jargon  
- maintain emotional safety  

---

# 7. Testing Rules

## 1. Unit Tests
- test services  
- test parsing  
- test analysis  
- test recommendations  

## 2. Integration Tests
- test API routes  
- test database interactions  

## 3. End‑to‑End Tests
- upload → analyze → dashboard → dispute  

---

# 8. Performance Rules

## 1. Database
- index foreign keys  
- avoid N+1 queries  
- use `include` sparingly  

## 2. Frontend
- use Suspense  
- avoid unnecessary client components  
- avoid large client bundles  

---

# 9. Security Rules

## 1. Authentication
- SSR only  
- no client‑side tokens  

## 2. Authorization
- always check `userId`  
- never trust client input  

## 3. Data Protection
- never log sensitive data  
- never expose raw report text  

---

# 10. Emotional‑Intelligent Engineering

All code must:
- reduce overwhelm  
- increase clarity  
- maintain emotional safety  
- support grounded pacing  
- avoid fear‑based language  

This applies to:
- UI messages  
- error messages  
- onboarding flows  
- dashboard language  

---

# 11. Summary

The Engineering Playbook ensures:
- consistent code  
- predictable architecture  
- emotionally intelligent UX  
- stable evolution  
- long‑term coherence  

This is how we build KWANUS OS.
