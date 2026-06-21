import type {
  PostCard,
  PostDetail,
  SanityPost,
  SanityPostListItem,
} from '@/types/post'

import { client } from '@/lib/sanity/client'
import { sanityFetchOptions } from '@/lib/sanity/fetch-options'
import { DEFAULT_BLOG_FALLBACK_IMAGE } from '@/lib/blog-fallback-image'
import { urlFor } from '@/lib/sanity/image'

const postListFields = `
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  featuredImage
`

const postDetailFields = `
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  body,
  status
`

export const publishedPostsQuery = `*[_type == "post" && status == "published"] | order(publishedAt desc) {
  ${postListFields}
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && status == "published"][0] {
  ${postDetailFields}
}`

export const postSlugsQuery = `*[_type == "post" && status == "published" && defined(slug.current)] {
  "slug": slug.current
}`

function getFeaturedImageUrl(post: SanityPostListItem): string {
  if (!post.featuredImage?.asset) {
    return DEFAULT_BLOG_FALLBACK_IMAGE
  }

  return urlFor(post.featuredImage).width(1200).height(750).fit('crop').url()
}

function toPostCard(post: SanityPostListItem): PostCard {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt ?? '',
    author: post.author,
    created_at: post.publishedAt ?? new Date().toISOString(),
    featured_image: getFeaturedImageUrl(post),
  }
}

function toPostDetail(post: SanityPost): PostDetail {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt ?? '',
    author: post.author,
    created_at: post.publishedAt ?? new Date().toISOString(),
    body: post.body,
  }
}

export async function getPublishedPosts(): Promise<PostCard[]> {
  const posts = await client.fetch<SanityPostListItem[]>(
    publishedPostsQuery,
    {},
    sanityFetchOptions,
  )
  return posts.map(toPostCard)
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const post = await client.fetch<SanityPost | null>(
    postBySlugQuery,
    { slug },
    sanityFetchOptions,
  )
  return post ? toPostDetail(post) : null
}

export async function getPostSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(
    postSlugsQuery,
    {},
    sanityFetchOptions,
  )
  return rows.map((row) => row.slug)
}
