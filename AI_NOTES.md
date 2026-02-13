# AI_NOTES.md

## Overview

This project was built using AI-assisted development tools while ensuring full understanding and manual verification of all implemented logic.

AI tools were used to accelerate scaffolding, debugging, and refactoring, but all architectural decisions and final validations were performed manually.

---

## AI Tools Used

- ChatGPT (for:
  - API route scaffolding
  - Prisma debugging
  - Next.js 16 dynamic route fixes
  - Refactoring suggestions or explaining errors
  - Documentation drafting
)

No code was blindly copy-pasted without understanding and validation.

---

## LLM Used in Application

- **Provider:** OpenAI
- **Model:** `gpt-4o-mini`
- **Usage:** Extract structured action items from meeting transcripts

### Why This Model?

- Fast inference
- Structured JSON output reliability
- Cost-efficient
- Suitable for lightweight extraction tasks

The model is used strictly for:

- Converting free-text transcripts into structured action items

---

## What Was Verified Manually

- Prisma schema correctness
- Foreign key relations (Transcript → ActionItem)
- Partial PATCH handling
- Error handling for invalid inputs
- Health endpoint validation (backend + database + LLM)


---

## What AI Did NOT Do

- Architectural decision-making
- Database modeling decisions
- Feature prioritization
- Final testing validation
- Production safety adjustments (e.g., partial PATCH fix)
- End-to-end testing via Postman

All critical system behavior was manually reviewed and tested.

---

## Summary

AI was used as a productivity accelerator, not as a replacement for understanding.
The final application reflects deliberate architectural decisions, proper separation of concerns, and full-stack integration validation.
