import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

type SlugParams = { slug: string }

export async function GET(
  request: NextRequest,
  context: { params: Promise<SlugParams> }
) {
  try {
    const { slug } = await context.params

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // For public access, only show published blogs
    const isAdmin = request.cookies.get('adminToken')?.value
    if (data.status !== 'published' && !isAdmin) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ blog: data })
  } catch (error) {
    console.error('Fetch blog error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<SlugParams> }
) {
  try {
    // Verify admin token
    const token = request.cookies.get('adminToken')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await context.params
    const updates = await request.json()

    // Prevent slug changes via PATCH
    delete updates.slug

    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ blog: data })
  } catch (error) {
    console.error('Update blog error:', error)
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<SlugParams> }
) {
  try {
    // Verify admin token
    const token = request.cookies.get('adminToken')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await context.params

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('slug', slug)

    if (error) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Delete blog error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
