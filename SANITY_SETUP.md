# Sanity CMS Setup — jugal.money

Blog content is managed in **Sanity Studio** at `/studio` (or the hosted studio URL after deploy).

---

## Part 1: Create your Sanity project (do this first)

### 1. Sign up / log in

Go to [sanity.io/manage](https://www.sanity.io/manage) with **one** account (avoid spreading projects across emails).

### 2. Create a project

1. Click **Create project**
2. Name: `Jugal Money` (or `jugal-money`)
3. Plan: **Free**
4. Dataset: use **`production`** (default is fine)

### 3. Copy these values

Open your project → **Settings** (gear) or project overview:

| Value | Where to find it | Env variable |
|-------|------------------|--------------|
| **Project ID** | Project settings → API → Project ID | `NEXT_PUBLIC_SANITY_PROJECT_ID` |
| **Dataset** | Usually `production` | `NEXT_PUBLIC_SANITY_DATASET` |

You do **not** need an API token for the public website. Published posts are read via the public CDN.

### 4. Add yourself as admin

1. Project → **Members** (or Team)
2. Invite your email as **Administrator** if not already
3. Anyone who edits content must be a member of this Sanity project

### 5. Configure CORS (for local Studio)

1. Project → **API** → **CORS origins**
2. Add:
   - `http://localhost:3000`
   - Your production URL, e.g. `https://jugal.money` or `https://your-app.vercel.app`
3. Enable **Allow credentials**

---

## Part 2: Connect this repo

### 1. Create `.env.local`

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 2. Run the app

```bash
npm install
npm run dev
```

### 3. Open Studio

Visit [http://localhost:3000/studio](http://localhost:3000/studio)

- Log in with your Sanity account
- You should see **Posts** in the sidebar

### 4. Create your first post

1. **Posts** → **Create new**
2. Fill in:
   - **Title** — article headline
   - **Slug** — click **Generate** from title
   - **Author** — defaults to Jugal Lodha
   - **Excerpt** — short summary for homepage
   - **Featured image** — upload thumbnail (optional)
   - **Body** — rich text content
   - **Status** — set to **Published**
   - **Published at** — set date/time (used for sorting)
3. **Publish** the document

### 5. View on site

- Homepage: [http://localhost:3000](http://localhost:3000)
- Article: `http://localhost:3000/blog/your-slug`

---

## Part 3: Deploy (Vercel)

### 1. Add env vars in Vercel

Project → **Settings** → **Environment Variables**:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

### 2. Add production CORS origin

In Sanity manage, add your Vercel/production URL to **CORS origins**.

### 3. (Optional) Hosted Studio

Log in once (opens browser), then deploy:

```bash
npm run sanity:login
npm run sanity:deploy
```

(`sanity` is not global — always use `npm run` or `npx sanity`.)

Ensure `.env` contains your Sanity variables before deploying — the CLI reads `.env` at deploy time.

This hosts Studio at `https://jugal-money.sanity.studio`. You can also use `/studio` on your Next.js site.

---

## What I need from you

After creating the Sanity project, share or add locally:

| Item | Example |
|------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `k7x3abc1` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

No API token required for read-only public site.

---

## Content model

Each **Post** has:

| Field | Purpose |
|-------|---------|
| `title` | Headline |
| `slug` | URL: `/blog/[slug]` |
| `author` | Byline |
| `excerpt` | Homepage / hero summary |
| `featuredImage` | Thumbnail |
| `body` | Rich text (Portable Text) |
| `status` | `draft` or `published` |
| `publishedAt` | Sort date (set when publishing) |

Only posts with `status: published` appear on the public site.

---

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Studio blank / won't load | Check CORS + env vars; restart `npm run dev` |
| "Missing environment variable" | Add `.env.local` with project ID and dataset |
| Post not on homepage | Status must be **published** + set **Published at** |
| Images not loading | Confirm `cdn.sanity.io` is in `next.config.mjs` (already added) |
| Can't log into Studio | Your Sanity account must be a project member |

---

## Useful links

- [Sanity Manage](https://www.sanity.io/manage)
- [Sanity Free plan](https://www.sanity.io/pricing)
- Local Studio: `/studio`
