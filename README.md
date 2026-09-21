# 🗿 BhonduFix

> **"Tech support for people who don't speak Tech."**  
> *"Bas screenshot bhe 💀"*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bhondufix.vercel.app-C7FF3D?style=for-the-badge&logo=vercel&logoColor=09090B)](https://bhondufix.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Prashantsays69%2Fbhondufix-8B5CF6?style=for-the-badge&logo=github)](https://github.com/Prashantsays69/bhondufix)
[![License](https://img.shields.io/badge/License-MIT-22D3EE?style=for-the-badge)](LICENSE)

---

## 🧐 What is BhonduFix?

When your computer explodes in red terminal text, throws cryptic DLL missing errors, or college examination portals freeze at 11:58 PM, you shouldn't need a Computer Science degree or an hour on 8-year-old Reddit threads to fix it.

**BhonduFix** is an AI-powered visual tech-support engineer with Indian internet meme energy. Drop an error screenshot or paste from clipboard, and get a plain-English, safe, 3-step solution instantly.

---

## ⚡ How It Works

```
Screenshot ➜ Understand ➜ Diagnose ➜ Safety Check ➜ Bhondu Explanation ➜ Steps ➜ Verify
```

1. **Screenshot**: Drop or paste (`Ctrl + V`) any confusing error dialog, broken CLI output, or website crash.
2. **Understand**: Visual OCR extracts screen text, error codes, and button positions.
3. **Diagnose**: Multimodal AI analyzes the root cause without assuming advanced technical knowledge.
4. **Safety Check**: Built-in safety heuristics intercept dangerous commands (e.g., `rm -rf`, registry deletions, partition formatting).
5. **Bhondu Explanation**: Plain-English analogies (choose **Bhondu Mode** for relatable humor or **Normal Mode** for concise instructions).
6. **Steps**: Maximum 2–3 actionable, copyable instructions.
7. **Verify**: Evidence-based confirmation. If still broken, submit follow-up screens in a continuous diagnostic loop.

---

## 🛡️ Safety & Trust First

BhonduFix is designed with defensive security principles:

- **Untrusted Input**: All uploaded screenshots are treated as completely untrusted input.
- **Privacy & Ephemeral**: Uploaded images are analyzed in-memory and discarded. Zero database persistence of user images.
- **No Credentials**: Never send passwords, OTPs, recovery codes, or private API keys. Bhondu will actively warn against credential sharing.
- **No Auto-Execution**: Bhondu never automatically runs commands on your machine. You retain full control over every action.
- **Explicit Safety Gates**: High-risk commands require explicit user acknowledgment before instructions unlock.
- **Low-Confidence Safeguard**: If an image is cropped, blurry, or ambiguous (confidence < 60%), Bhondu refuses to hallucinate fixes and requests clearer context instead.
- **Verified Fixes**: Fixes include clear verification checks so you know whether the problem is actually resolved.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **AI & Vision**: Multimodal AI Vision API with Structured Schema Validation
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom Bhondu design tokens:
  - Lime (`#C7FF3D`) — Primary action
  - Purple (`#8B5CF6`) — Creative accents
  - Cyan (`#22D3EE`) — Information & status
  - Dark Surface (`#09090B` / `#111113` / `#18181B`)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Live Demo

Experience the live app here:  
👉 **[https://bhondufix.vercel.app/](https://bhondufix.vercel.app/)**

---

## 💻 Local Setup

Clone the repository and run the development server locally:

```bash
# 1. Clone repo
git clone https://github.com/Prashantsays69/bhondufix.git
cd bhondufix

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` to launch the application.

---

## 🔑 Environment Variables

Create a `.env.local` file in your root directory:

```env
# Google Gemini Multimodal Vision API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Vision Model override (defaults to gemini-2.5-flash)
GEMINI_MODEL=gemini-2.5-flash
```

> **Note**: Your API key stays strictly on the server-side API routes (`/api/analyze`). It is **never** exposed to client-side bundles.

---

## 🗿 Built by Prashant

Made with too much caffeine, questionable debugging decisions, and AI 💀

- **GitHub**: [@Prashantsays69](https://github.com/Prashantsays69)
- **Instagram**: [@iam_prash99](https://instagram.com/iam_prash99)
- **LinkedIn**: [Prashant Ratnala](https://www.linkedin.com/in/prashant-ratnala/)
- **Linktree**: [byprash](https://linktr.ee/byprash)

---

© 2026 BhonduFix. Correctness ➔ Safety ➔ Clarity ➔ Speed ➔ Personality.
