'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useParams } from 'next/navigation'

interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  created_at: string
  slug: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`)
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()
        setBlog(data.blog)
      } catch (err) {
        console.error('Failed to fetch blog:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlog()
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-12 flex items-center justify-center">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8">
            <ArrowLeft size={20} />
            Back to all articles
          </Link>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Article not found.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8">
          <ArrowLeft size={20} />
          Back to all articles
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="font-medium text-foreground">{blog.author}</span>
            <span>•</span>
            <time>{formatDate(blog.created_at)}</time>
          </div>
        </header>

        {blog.excerpt && (
          <p className="text-xl text-muted-foreground mb-8 italic">
            {blog.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none text-foreground">
          <div className="whitespace-pre-wrap text-base leading-relaxed">
            {blog.content}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to all articles
          </Link>
        </div>
      </article>
    </main>
  )
}
