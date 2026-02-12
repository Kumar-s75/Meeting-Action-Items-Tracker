# ⚙️ Meeting Action Items Tracker

A full-stack web application that extracts action items from meeting transcripts using an LLM and allows users to manage them in a mini workspace.

---

# 🧠 Project Overview

This application allows users to:

- Paste a meeting transcript
- Automatically extract action items (task + owner + due date)
- Edit, delete, and manually add items
- Mark items as done or reopen them
- Filter by status
- View the last 5 processed transcripts
- Monitor backend, database, and LLM health

---

# 🛠 Tech Stack

- **Next.js 16 (App Router)**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (Neon)**
- **OpenAI API (gpt-4o-mini)**
- **TailwindCSS**

---

# ⭐ Features Implemented

## ✅ Core Assignment Requirements

- ✔️ Paste meeting transcript
- ✔️ Extract action items (task + owner + due date)
- ✔️ Edit action items inline
- ✔️ Add manual action items
- ✔️ Delete action items
- ✔️ Mark items as Done / Reopen
- ✔️ View last 5 processed transcripts
- ✔️ Filter by ALL / OPEN / DONE
- ✔️ Health status page (Backend + DB + LLM)
- ✔️ Basic validation for empty input
- ✔️ Clean component-based UI architecture

---

## 🚀 Additional Improvements

- ✔️ Partial PATCH handling (production-safe updates)
- ✔️ Prisma singleton pattern
- ✔️ Centralized API wrapper (`lib/api.ts`)
- ✔️ Type-safe domain models
- ✔️ Proper environment management
- ✔️ Next.js 16 dynamic route compatibility
- ✔️ Full CRUD tested via Postman
- ✔️ Structured project architecture

---

# ⚙️ Setup Instructions

## 1️⃣ Prerequisites

Make sure you have installed:

- **Node.js ≥ 20.9.0** (Recommended: Node 20 LTS)
- **npm**
- **PostgreSQL** (local or Neon cloud)
- **Git**

Check versions:

```bash
node -v
npm -v
```

---

## 2️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd meeting-action-tracker
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@host:5432/dbname?sslmode=require"
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

You can copy from:

```
.env.example
```

⚠️ Never commit `.env`.

---

## 5️⃣ Database Setup (Prisma)

Run:

```bash
npx prisma migrate dev
npx prisma generate
```

This will:

- Create database tables
- Generate Prisma client

---

## 6️⃣ Start Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

# 🧪 API Testing (Postman)

## Extract Transcript

```
POST /api/extract
```

Body:

```json
{
  "transcript": "John will prepare the Q3 report by Friday."
}
```

---

## Get Transcript History

```
GET /api/transcripts
```

Returns last 5 transcripts.

---

## Create Action Item

```
POST /api/action-item
```

Body example:

```json
{
  "transcriptId": "TRANSCRIPT_ID",
  "task": "Prepare slides",
  "owner": "Mike",
  "dueDate": "Tomorrow"
}
```

---

## Update Action Item

```
PATCH /api/action-item/:id
```

Body example:

```json
{
  "status": "DONE"
}
```

---

## Delete Action Item

```
DELETE /api/action-item/:id
```

---

## Health Check

```
GET /api/status
```

Returns:

```json
{
  "backend": "ok",
  "database": "ok",
  "llm": "ok"
}
```

---

# 📂 Project Structure

```
meeting-action-tracker/
│
├── app/
│   ├── api/
│   │   ├── extract/
│   │   │   └── route.ts
│   │   ├── transcripts/
│   │   │   └── route.ts
│   │   ├── action-item/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── status/
│   │       └── route.ts
│   │
│   ├── status/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── TranscriptInput.tsx
│   ├── ActionItemList.tsx
│   ├── ActionItemCard.tsx
│   ├── AddActionItem.tsx
│   └── HistorySidebar.tsx
│
├── lib/
│   ├── prisma.ts
│   └── api.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── types/
│   └── index.ts
│
├── .env
├── .env.example
├── README.md
├── AI_NOTES.md
├── PROMPTS_USED.md
└── ABOUTME.md
```

---

# 🧪 Testing Strategy

This project prioritizes real integration validation:

- Full CRUD tested via Postman
- Database integrity validation
- LLM integration validation
- Health endpoint verification
- Error handling for invalid inputs
- Edge case validation (empty transcript, invalid ID, missing fields)

All core flows validated end-to-end:

```
Frontend → API → Prisma → Database → Response
Frontend → API → OpenAI → Structured JSON → Database
```

---

# 🚀 Deployment

Recommended: **Vercel**

Steps:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - DATABASE_URL
   - OPENAI_API_KEY
4. Deploy

---

# ⚠️ Common Troubleshooting

## Node Version Error

Ensure Node 20+:

```bash
node -v
```

If needed:

```bash
nvm install 20
nvm use 20
```

---

## Prisma Issues

```bash
npx prisma migrate reset
```

---

## LLM Failing

Check:

```bash
echo $OPENAI_API_KEY
```

---

# 👤 Author

**Kumar Saurabh**  

