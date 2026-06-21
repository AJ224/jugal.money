# jugal.money — Setup

**Blog CMS is now Sanity.** See **[SANITY_SETUP.md](./SANITY_SETUP.md)** for full instructions.

## Quick start

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `NEXT_PUBLIC_SANITY_PROJECT_ID` and dataset name into `.env.local`
3. `npm install && npm run dev`
4. Edit posts at [http://localhost:3000/studio](http://localhost:3000/studio)

## What you need from Sanity

| Env variable | Value |
|--------------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | From project settings → API |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |

No API token needed for the public site.
