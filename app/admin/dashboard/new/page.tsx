'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogForm } from '../BlogForm'

export default function NewPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData: any) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to create post')
        setIsLoading(false)
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      console.error('Failed to create post:', err)
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <BlogForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
  )
}
