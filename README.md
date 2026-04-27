# Dr. Muhammad Usama — Classroom Universe

> A centralized, comic-ink-inspired academic content platform for managing and publishing course materials across Generative AI, Computer Architecture, and Data Science.

![Platform](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB%20%2B%20Storage-3ECF8E?logo=supabase)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

---

## ✨ Features

- **Comic Ink UI** — Halftone textures, ink-stroke borders, panel numbering, speech-bubble announcements
- **3D Tilt Course Cards** — Mouse-tracking perspective tilt on hover
- **Particle Hero Background** — Interactive canvas connected-dots animation
- **Custom Glow Cursor** — Magnetic buttons + trailing glow ring
- **Typewriter Hero Text** — Animated cycling through course names
- **Chapter Accordion** — Smooth Framer Motion expand/collapse
- **Resource Cards** — PDF scroll-icon flip cards, film-reel video cards, ink-stamped link cards
- **Orbiting Stats** — Animated orbital rings on the About page
- **Professor Dashboard** — Upload resources, manage chapters, post announcements
- **Supabase Auth** — Professor-only login with Row Level Security
- **File Upload** — Drag-and-drop to Supabase Storage (PDFs, videos, images)
- **Film Grain Overlay** — Cinematic texture across the entire site

---

## 🗂 Project Structure

```
dr-usama-classroom/
├── app/                        # Next.js 14 App Router
│   ├── (public)/               # Student-facing pages
│   ├── (professor)/            # Auth-guarded professor dashboard
│   ├── auth/                   # Login + OAuth callback
│   └── api/                    # Route handlers
├── components/
│   ├── ui/                     # Primitives: Button, InkBorder, SpeechBubble…
│   ├── layout/                 # Navbar, Footer, ProfessorLayout
│   ├── home/                   # HeroSection, ParticleBackground…
│   ├── courses/                # CourseCard (3D tilt), ChapterList…
│   ├── resources/              # PDFCard (flip), VideoCard, LinkCard…
│   ├── announcements/          # Speech-bubble feed
│   └── about/                  # ProfilePanel, OrbitingStats
├── lib/
│   ├── supabase/               # client, server, admin clients
│   ├── db/                     # Query helpers per entity
│   └── storage/                # Upload utilities
├── hooks/                      # useTilt, useMagneticButton, useParticles…
├── types/                      # TypeScript domain types
├── styles/                     # globals.css, comic.css
└── supabase/migrations/        # SQL migrations
```

---

## 🚀 Setup

### 1. Prerequisites

- Node.js 18+
- [Supabase account](https://supabase.com) (free tier is fine)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional, for local dev)

### 2. Clone & Install

```bash
git clone <your-repo-url>
cd dr-usama-classroom
npm install
```

### 3. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon key** from Settings → API
3. Copy your **service role key** (keep secret!)

### 4. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PROFESSOR_EMAIL=muhammad.usama@uaf.edu.pk
```

### 5. Run Database Migrations

In the Supabase dashboard → SQL Editor, run these **in order**:

```
supabase/migrations/001_schema.sql   # Tables + triggers
supabase/migrations/002_rls.sql      # Row Level Security
supabase/migrations/003_storage.sql  # Storage buckets
```

### 6. Create Professor Account

1. In Supabase Dashboard → Authentication → Users → **Invite user**
2. Enter Dr. Usama's email and set a password
3. Copy the new user's UUID from the Users list
4. Edit `004_seed.sql` — replace `muhammad.usama@uaf.edu.pk` with the actual email
5. Run `004_seed.sql` in SQL Editor

### 7. Install Google Fonts

The platform uses these fonts via Google Fonts CDN (loaded in `globals.css`):
- **Bangers** — comic headings
- **Permanent Marker** — display text
- **Lato** — body text
- **JetBrains Mono** — code/mono text

No installation needed — they load automatically.

### 8. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎨 Design System

### Color Palette

| Token         | Hex       | Usage                          |
|---------------|-----------|--------------------------------|
| `coral-400`   | `#D85A30` | Primary accent, CTAs, borders  |
| `coral-600`   | `#993C1D` | Hover states, dark accents     |
| `ink-900`     | `#2C2C2A` | Primary text, hard borders     |
| `ink-500`     | `#6E6D67` | Secondary text                 |
| `ink-50`      | `#F1EFE8` | Surface backgrounds            |
| `paper`       | `#F7F5EE` | Page background                |

### Typography

| Class           | Font              | Use              |
|-----------------|-------------------|------------------|
| `.font-comic`   | Bangers           | Headings, labels |
| `.font-display` | Permanent Marker  | Hero text        |
| `.font-body`    | Lato              | Body copy        |
| `.font-mono`    | JetBrains Mono    | Code, stamps     |

### Key CSS Classes (from `comic.css`)

| Class                    | Description                        |
|--------------------------|------------------------------------|
| `.comic-panel`           | Bordered card with ink shadow      |
| `.ink-border`            | 3px ink border + offset shadow     |
| `.halftone`              | Dot-pattern texture overlay        |
| `.speech-bubble`         | Announcement bubble with tail      |
| `.panel-number`          | `Panel #01` top-left badge         |
| `.chapter-label`         | Small coral uppercase label        |
| `.resource-card`         | Resource row with coral left strip |
| `.btn-magnetic`          | Comic-style CTA button             |
| `.ink-stamp`             | Rotated monospace stamp badge      |
| `.custom-cursor`         | Coral glow cursor dot              |
| `.film-grain`            | Animated noise overlay             |

---

## 🗄 Database Schema

```
profiles          — extends auth.users (is_professor flag)
courses           — slug, title, color, panel_number, is_published
chapters          — course_id, title, position, is_published
resources         — chapter_id, type (pdf|video|link), url, is_published
announcements     — course_id (nullable), title, body, is_pinned
```

**Row Level Security:**
- Students: read-only access to published content
- Professor: full CRUD via `is_professor()` helper function

---

## 📦 Key Dependencies

| Package              | Purpose                            |
|----------------------|------------------------------------|
| `next` 14            | App Router, Server Components      |
| `@supabase/ssr`      | Auth + DB for Next.js              |
| `framer-motion` 11   | Page transitions, card animations  |
| `react-dropzone`     | Drag-and-drop file uploads         |
| `react-hot-toast`    | Toast notifications                |
| `swr`                | Client-side data fetching          |
| `zustand`            | Lightweight state management       |
| `clsx` + `twMerge`   | Conditional Tailwind classes       |

---

## 🧩 Adding a New Course

1. Log in at `/auth/login`
2. Go to **Dashboard → Create Course**
3. Fill in title, subtitle, description, pick a panel color
4. Add chapters via the **Edit Course** page
5. Upload resources (PDFs, videos, links) per chapter
6. Toggle **Published** when ready

---

## 🔧 Customization

### Change the professor profile

Update `supabase/migrations/004_seed.sql` and re-run, or edit directly in the Supabase dashboard → Table Editor → `profiles`.

### Add a new course color

Edit `COLORS` array in `app/(professor)/courses/new/page.tsx`.

### Adjust particle density

In `components/home/HeroSection.tsx`, change `count` prop on `<ParticleBackground>`.

### Modify 3D tilt intensity

In `components/courses/CourseCard.tsx`, adjust `max`, `perspective`, and `scale` in the `useTilt` call.

---

## 🚢 Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Add your environment variables in Vercel Dashboard → Settings → Environment Variables.

### Environment variables for production

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

Update Supabase Auth → URL Configuration:
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/auth/callback`

---

## 📝 License

MIT — built for Dr. Muhammad Usama, National University of Computer and Emerging Sciences.

---

> *"Every course is a story. Every chapter, a new adventure."*
