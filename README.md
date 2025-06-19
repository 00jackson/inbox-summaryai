# 📬 InboxSummary

**InboxSummary** is an AI-powered Email Digest Generator that helps users save time by summarizing their email threads into actionable daily or weekly reports. It's built for focus, speed, and future B2B extensibility.

---

## 🚀 Features

- ✅ Paste email threads and get clean, structured summaries
- ✅ Choose summary mode: **Daily** or **Weekly**
- ✅ AI-generated insights using Gemini 1.5 Flash
- ✅ Beautiful summary formatting using Markdown-style parsing
- ✅ Summary history stored via `localStorage`
- ✅ Export as PDF (via `html2pdf.js`)
- ❌ Notion & Slack export (explored but removed from MVP)

---

## 🧠 Tech Stack

| Layer        | Tech                       |
|--------------|----------------------------|
| Framework    | Next.js (App Router)       |
| Styling      | TailwindCSS + ShadCN UI    |
| UI Layer     | ShadCN, Radix UI, Lucide   |
| State Mgmt   | React state + localStorage |
| AI API       | Google Gemini (1.5 Flash)  |
| Deployment   | Netlify                    |
| Tooling      | ESLint, TypeScript         |

---

## ⚙️ Setup Instructions

### 1. Clone and Install

* git clone https://github.com/yourname/inbox-summary.git
* cd inbox-summary
* pnpm install

### 2. Environment Variables

Create a .env.local file:
* GEMINI_API_KEY=your_gemini_api_key_here

### 3. Run Dev Server

pnpm dev 

### 4. Deploy to Netlify

pnpm add -D @netlify/next
npx netlify login
npx netlify init
npx netlify env:set GEMINI_API_KEY your_api_key
npx netlify deploy --prod


## 🧩 What Took Time (Challenges)
	•	🧠 Getting Gemini API to work with client-safe logic while avoiding CORS issues
	•	🔐 Avoiding browser errors by routing Notion & Slack APIs through server (later removed)
	•	🔧 Tailwind + ShadCN + Next.js App Router setup initially took effort to get clean
	•	🐛 ESLint’s strict rules blocked Netlify builds — resolved via code rewrites

⸻

## ✅ What We Tackled With Ease
	•	⚡ MVP features (paste + summarize + format) built quickly and cleanly
	•	🎨 Styling with Tailwind + ShadCN was fast and visually effective
	•	🧠 Parsing AI output into clean formatted HTML was smooth using custom logic
	•	🧪 Testing & iteration via live pasted email threads was efficient

⸻

## 🔭 Future Aspirations
	•	🧠 Auto-Gmail integration via OAuth + Gmail API
	•	🧵 Summary template selector (Tweet Thread, Executive Deck, Tasks)
	•	🔁 Weekly email digests sent via cron
	•	💾 Backend DB to save user sessions (Postgres + Prisma)
	•	🔐 User login via Clerk/Auth.js
	•	📒 Notion/Slack export re-introduced via server-side auth
	•	💰 Pivot to a lightweight B2B SaaS for productivity-focused teams

⸻

## 🤝 Credits

Built with ❤️ using:
	•	Next.js
	•	Gemini AI
	•	Netlify
	•	ShadCN UI

⸻

## 📬 License

MIT — free to use and build on. Attribution appreciated!

---

Let me know if you'd like this auto-created as `README.md` in your project directory, or customized further with screenshots and badges.


