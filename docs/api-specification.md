# KWANUS OS — API Specification (APISpec)
A complete specification of all API endpoints used in the KWANUS Operating System.

This document defines:
- routes  
- methods  
- request payloads  
- response shapes  
- error rules  
- domain boundaries  
- versioned evolution (v1–v3)  

It ensures the API layer remains consistent, predictable, and aligned with the service‑first architecture.

---

# 1. API Philosophy

The KWANUS OS API must be:
- thin  
- predictable  
- typed  
- secure  
- consistent  
- version‑safe  

API routes:
- validate input  
- call services  
- return JSON  
- never contain business logic  

---

# 2. Global API Rules

## Response Shape — Success
```json
{
  "success": true,
  "data": { ... }
}
```

## Response Shape — Error
```json
{
  "success": false,
  "error": "Message"
}
```

## Authentication
All routes require:
- SSR authentication  
- user identity resolved server‑side  

## Error Handling
- no raw errors  
- no stack traces  
- no ambiguous messages  

---

# 3. Domain: Upload (v1)

## POST `/api/upload`
Upload a credit report file.

### Request
- multipart/form-data  
- `file`: PDF  

### Response
```json
{
  "success": true,
  "data": {
    "reportId": "string"
  }
}
```

### Errors
- invalid file  
- unsupported format  

---

# 4. Domain: Reports (v1)

## GET `/api/reports`
List all reports for the user.

### Response
```json
{
  "success": true,
  "data": {
    "reports": [...]
  }
}
```

---

## GET `/api/reports/:id`
Get a single report.

### Response
```json
{
  "success": true,
  "data": {
    "report": { ... }
  }
}
```

---

## GET `/api/reports/:id/items`
Get all items for a report.

### Response
```json
{
  "success": true,
  "data": {
    "items": [...]
  }
}
```

---

## GET `/api/items/:itemId`
Get a single item.

### Response
```json
{
  "success": true,
  "data": {
    "item": { ... }
  }
}
```

---

# 5. Domain: Dispute Center (v1 → v2)

## POST `/api/dispute/select`
Select an item for dispute.

### Request
```json
{
  "itemId": "string"
}
```

### Response
```json
{
  "success": true
}
```

---

## POST `/api/dispute/recommendations`
Generate dispute recommendations.

### Request
```json
{
  "itemIds": ["string"]
}
```

### Response
```json
{
  "success": true,
  "data": {
    "recommendations": [...]
  }
}
```

---

# 6. Domain: Funding (v2)

## GET `/api/funding/score`
Get funding readiness score.

### Response
```json
{
  "success": true,
  "data": {
    "score": 0
  }
}
```

---

## GET `/api/funding/recommendations`
Get lender recommendations.

### Response
```json
{
  "success": true,
  "data": {
    "recommendations": [...]
  }
}
```

---

# 7. Domain: Multi‑Report (v2)

## POST `/api/reports/compare`
Compare two reports.

### Request
```json
{
  "reportA": "string",
  "reportB": "string"
}
```

### Response
```json
{
  "success": true,
  "data": {
    "comparison": { ... }
  }
}
```

---

# 8. Domain: Intelligence (v3)

## GET `/api/intelligence/bureau/:reportId`
Get bureau‑level intelligence.

### Response
```json
{
  "success": true,
  "data": {
    "bureauData": { ... }
  }
}
```

---

## POST `/api/intelligence/simulate`
Run a simulation.

### Request
```json
{
  "type": "string",
  "payload": { ... }
}
```

### Response
```json
{
  "success": true,
  "data": {
    "result": { ... }
  }
}
```

---

# 9. Domain: Settings (v1)

## GET `/api/settings/profile`
Get user profile.

### Response
```json
{
  "success": true,
  "data": {
    "profile": { ... }
  }
}
```

---

## POST `/api/settings/profile`
Update user profile.

### Request
```json
{
  "name": "string"
}
```

### Response
```json
{
  "success": true
}
```

---

# 10. Versioned Evolution

## v1
- upload  
- reports  
- items  
- dispute selection  
- recommendations  

## v2
- funding  
- multi‑report comparison  

## v3
- bureau intelligence  
- simulations  

---

# 11. Summary

The API Specification ensures:
- consistent endpoints  
- predictable responses  
- secure access  
- clean domain boundaries  
- scalable evolution  

This is the backbone of the KWANUS OS service layer.
