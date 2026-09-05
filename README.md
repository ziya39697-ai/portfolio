# Jiya Yadav — Portfolio

Personal portfolio for **Jiya Yadav** — HR Intern. Built with Next.js 14, Tailwind, Framer Motion, and Three.js, with a working contact form backed by Nodemailer + MongoDB.

Live: https://jiya-portfolio.vercel.app

## What's inside

- **Hero** — animated headline, social links, and a one-click resume download.
- **Bento "About" grid** — interactive globe, tech-stack glimpse, copy-email card.
- **Projects** — featured case studies with detail pages at `/projects/[slug]` (Problem · Architecture · Decisions · Outcomes · Stack).
- **Skills** — grouped pills covering Languages, Frontend, Backend, Databases, AI/ML, and DevOps.
- **Experience** — three roles with structured highlights from the resume.
- **Contact form** — server-side SMTP send via Nodemailer, MongoDB-backed rate limiting that survives serverless cold starts, honeypot field, and per-IP / global daily caps.
- **SEO** — full metadata, dynamic OG image (`/opengraph-image`), `sitemap.xml`, `robots.txt`.
- **Analytics** — Vercel Analytics enabled in `app/layout.tsx`.

## Tech stack

- **Framework**: Next.js 14 (App Router) · React 18 · TypeScript
- **Styling**: Tailwind CSS · Framer Motion · Aceternity UI primitives
- **3D**: Three.js · @react-three/fiber · three-globe
- **Email**: Nodemailer (SMTP)
- **Persistence**: MongoDB (rate-limit store with TTL index)
- **Hosting / Telemetry**: Vercel · Vercel Analytics · Sentry

## Quick start

Requires Node.js 18+.

```bash
git clone https://github.com/nik2168/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open http://localhost:3000.

## Environment variables

Create `.env.local` from `.env.example`. All vars are optional — leave SMTP empty to skip outbound email; leave Mongo empty to fall back to in-memory rate limits.

```bash
# SMTP (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USER=you@gmail.com
SMTP_PASSWORD=your_16_char_app_password   # Gmail App Password, no spaces
FROM_EMAIL=you@gmail.com                  # must match SMTP_USER for Gmail
CONTACT_TO_EMAIL=                         # optional override; defaults to FROM_EMAIL

# MongoDB (rate-limit persistence)
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
MONGO_DB=portfolio
```

> **Gmail tip:** `SMTP_PASSWORD` must be a [Google App Password](https://myaccount.google.com/apppasswords), not your account password. Requires 2-Step Verification on the account.

> Both `MONGO_URL` and `MONGOURL` (no underscore) are accepted.

## Project structure

```
app/
  api/contact/route.ts      # SMTP send + Mongo-backed rate limits
  projects/[slug]/page.tsx  # Per-project case study, statically generated
  opengraph-image.tsx       # Dynamic 1200x630 OG card via next/og
  sitemap.ts · robots.ts    # SEO
  layout.tsx · page.tsx     # Root + landing page
components/                 # Hero, Skills, Experience, Contact, etc.
data/index.ts               # Single source of truth for nav, projects, skills, work
lib/mongo.ts                # Cached Mongo client + collection accessor
public/                     # Images, icons, resume PDF
```

## Contact-form safety

In `app/api/contact/route.ts`:

- 30s per-IP cooldown
- 3 messages per IP per hour
- 50 messages globally per day
- Honeypot `website` field silently absorbs bot submissions
- Length / format validation on name, email, message
- All sends recorded in `contact_sends` collection with a 7-day TTL index

When `MONGO_URL` is unset, limits fall back to in-memory (per-instance only).

## Deploy

Push to GitHub and import the repo on Vercel. Set the env vars in the Vercel project settings (Production + Preview), then deploy. Vercel Analytics activates automatically.

## License

MIT — feel free to fork and adapt for your own portfolio. Replace personal content (resume PDF, social links, copy in `data/index.ts`) before publishing.
