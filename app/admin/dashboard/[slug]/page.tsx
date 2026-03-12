'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { BlogForm } from '../BlogForm'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  status: 'draft' | 'published'
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`)
        if (!response.ok) {
          setError('Blog not found')
          return
        }
        const data = await response.json()
        setBlog(data.blog)
      } catch (err) {
        console.error('Failed to fetch blog:', err)
        setError('Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlog()
    }
  }, [slug])

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to update post')
        setIsSubmitting(false)
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      console.error('Failed to update post:', err)
      setError('An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Post not found</p>
      </main>
    )
  }

  return (
    <BlogForm
      initialData={blog}
      onSubmit={handleSubmit}
      isLoading={isSubmitting}
      error={error}
    />
  )
}
