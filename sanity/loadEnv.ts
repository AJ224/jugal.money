import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env') })
config({ path: resolve(process.cwd(), '.env.local') })

// Studio deploy (Vite) inlines SANITY_STUDIO_* at build time.
// Mirror from NEXT_PUBLIC_* so you only maintain one set in .env.
const mirrors = [
  ['SANITY_STUDIO_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID'],
  ['SANITY_STUDIO_DATASET', 'NEXT_PUBLIC_SANITY_DATASET'],
  ['SANITY_STUDIO_API_VERSION', 'NEXT_PUBLIC_SANITY_API_VERSION'],
] as const

for (const [studioKey, nextKey] of mirrors) {
  if (!process.env[studioKey] && process.env[nextKey]) {
    process.env[studioKey] = process.env[nextKey]
  }
}
