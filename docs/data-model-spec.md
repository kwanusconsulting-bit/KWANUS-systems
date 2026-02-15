# KWANUS OS — Data Model Specification (DMS)
A complete specification of all database models used in the KWANUS Operating System.

This document defines:
- models  
- fields  
- relationships  
- constraints  
- indexes  
- versioned evolution (v1–v3)  

It ensures the system remains consistent, scalable, and predictable.

---

# 1. Data Model Philosophy

The KWANUS OS data layer must be:
- normalized  
- predictable  
- explicit  
- version‑safe  
- query‑efficient  
- aligned with the service‑first architecture  

Every model must:
- have a clear purpose  
- avoid duplication  
- support future evolution  

---

# 2. Core Models (v1)

These models support the foundational credit pipeline.

---

## Model: User
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  reports       Report[]
}
```

---

## Model: Report
```prisma
model Report {
  id            String      @id @default(cuid())
  userId        String
  createdAt     DateTime    @default(now())
  rawText       String
  bureau        String?
  parsed        Boolean     @default(false)

  user          User        @relation(fields: [userId], references: [id])
  items         Item[]
}
```

---

## Model: Item
```prisma
model Item {
  id            String      @id @default(cuid())
  reportId      String
  type          String
  creditor      String?
  accountNumber String?
  status        String?
  openedDate    DateTime?
  closedDate    DateTime?
  balance       Int?
  limit         Int?
  remarks       String?

  report        Report      @relation(fields: [reportId], references: [id])
}
```

---

# 3. Dispute Models (v1 → v2)

These models support the Dispute Center and recommendations.

---

## Model: DisputeSelection
```prisma
model DisputeSelection {
  id        String   @id @default(cuid())
  userId    String
  itemId    String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
  item      Item     @relation(fields: [itemId], references: [id])
}
```

---

## Model: Recommendation
```prisma
model Recommendation {
  id        String   @id @default(cuid())
  itemId    String
  text      String
  createdAt DateTime @default(now())

  item      Item     @relation(fields: [itemId], references: [id])
}
```

---

# 4. Funding Models (v2)

These models support the Funding Engine.

---

## Model: FundingScore
```prisma
model FundingScore {
  id        String   @id @default(cuid())
  userId    String
  score     Int
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}
```

---

## Model: FundingRecommendation
```prisma
model FundingRecommendation {
  id        String   @id @default(cuid())
  userId    String
  lender    String
  reason    String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}
```

---

# 5. Multi‑Report Models (v2)

These models support multiple uploads and comparisons.

---

## Model: ReportComparison
```prisma
model ReportComparison {
  id        String   @id @default(cuid())
  userId    String
  reportA   String
  reportB   String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}
```

---

# 6. Advanced Models (v3)

These models support v3 intelligence features.

---

## Model: BureauData
```prisma
model BureauData {
  id        String   @id @default(cuid())
  reportId  String
  bureau    String
  score     Int?
  summary   String?

  report    Report   @relation(fields: [reportId], references: [id])
}
```

---

## Model: Simulation
```prisma
model Simulation {
  id        String   @id @default(cuid())
  userId    String
  type      String
  result    Json
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}
```

---

# 7. Indexes & Constraints

## Indexes
- `User.email` — unique  
- `Report.userId` — index  
- `Item.reportId` — index  
- `DisputeSelection.userId` — index  
- `FundingScore.userId` — index  

## Constraints
- all foreign keys enforced  
- cascading deletes avoided  
- no nullable foreign keys  

---

# 8. Versioned Evolution

## v1
- User  
- Report  
- Item  
- DisputeSelection  
- Recommendation  

## v2
- FundingScore  
- FundingRecommendation  
- ReportComparison  

## v3
- BureauData  
- Simulation  

---

# 9. Summary

The Data Model Specification ensures:
- consistent database structure  
- predictable relationships  
- scalable evolution  
- clean service integration  
- stable long‑term architecture  

This is the backbone of the KWANUS OS data layer.
