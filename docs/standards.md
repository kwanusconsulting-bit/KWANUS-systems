# KWANUS Development Standards

Consistency ensures the OS remains predictable and supportive for both users and builders.

## 1. Naming Conventions

### Variables & Functions
Use `camelCase`. Avoid abbreviations.
- ✅ `emotionalSnapshot`
- ❌ `emoSnap`

### Components
Use `PascalCase`. Name by purpose, not visual style.
- ✅ `InsightCard`
- ❌ `BlueBoxWithGlassBackground`

### Files
Use `kebab-case`. Use clear suffixes.
- `lib/data/fetching.ts`
- `hooks/use-resilience.ts`

## 2. Emotional Tone in Code
Even our comments and errors should be supportive.
- **Logging**: Use descriptive prefixes like `[EFFORT]` or `[RESONANCE]`.
- **Errors**: Non-technical for users, precise for builders.

## 3. Directory Sovereignty
Keep domain logic encapsulated:
- `/lib/analytics` -> Engine logic.
- `/components/analytics` -> Visual representation.
- `/hooks` -> Shared awareness.
