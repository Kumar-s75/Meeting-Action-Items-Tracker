⚙️ Setup Instructions

Welcome! Follow the steps below to run the Meeting Action Items Tracker locally.

🧠 Project Overview

This is a full-stack web application that:

Extracts action items from meeting transcripts using OpenAI

Stores transcripts and action items in PostgreSQL

Supports full CRUD (Create, Read, Update, Delete)

Maintains history of last 5 processed transcripts

Provides backend health monitoring (LLM + DB + server)

Tech Stack:

Next.js 16 (App Router)

TypeScript

Prisma ORM

PostgreSQL (Neon)

OpenAI API

TailwindCSS

1️⃣ Prerequisites

Make sure you have the following installed:

Node.js ≥ 20.9.0 (Recommended: Node 20 LTS)

npm (comes with Node)

PostgreSQL (local or Neon cloud)

Git

📌 Version check:
<img width="847" height="127" alt="image" src="https://github.com/user-attachments/assets/4d6bcaae-53dd-4b4f-9f53-a6c6b95c72ea" />
2️⃣ Clone the Repository
<img width="835" height="126" alt="image" src="https://github.com/user-attachments/assets/3cfe317b-1ee7-40f1-8bfe-a7f31b5dcb7b" />
3️⃣ Install Dependencies

From the root of the project:
<img width="857" height="101" alt="image" src="https://github.com/user-attachments/assets/f9c2fbe9-fb14-4cc8-bd89-5704bee79396" />
This installs:

Next.js frontend

API routes

Prisma

OpenAI SDK

TailwindCSS
4️⃣ Environment Variables

Create a .env file in the root directory:
<img width="833" height="203" alt="image" src="https://github.com/user-attachments/assets/d76b12d9-7e5a-4128-a098-608b998a5516" />



