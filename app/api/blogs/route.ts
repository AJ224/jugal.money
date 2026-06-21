import { NextResponse } from 'next/server'

import { getPublishedPosts } from '@/lib/sanity/queries'

export const revalidate = 60

export async function GET() {
  try {
    const blogs = await getPublishedPosts()
    return NextResponse.json({ blogs })
  } catch (error) {
    console.error('Fetch blogs error:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
