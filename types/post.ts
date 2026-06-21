import type { PortableTextBlock } from 'next-sanity'

export interface SanityImage {
  asset: {
    _ref: string
  }
  alt?: string
}

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  author: string
  publishedAt?: string
  featuredImage?: SanityImage
  body: PortableTextBlock[]
  status: 'draft' | 'published'
}

export interface SanityPostListItem {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  author: string
  publishedAt?: string
  featuredImage?: SanityImage
}

export interface PostCard {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  created_at: string
  featured_image: string
}

export interface PostDetail {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  created_at: string
  body: PortableTextBlock[]
}
