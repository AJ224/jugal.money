'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Linkedin, Instagram } from 'lucide-react'

interface Blog {
  id: string
  title: string
  excerpt: string
  author: string
  created_at: string
  slug: string
  featured_image?: string
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?status=published')
        const data = await response.json()
        const publishedBlogs = data.blogs || []
        setBlogs(publishedBlogs)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-white text-foreground">
      {/* Minimal header */}
      <header className="border-b border-border bg-white/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              jugal.money
            </span>
            <span className="text-sm text-muted-foreground">Personal finance & investing</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#articles" className="hover:text-foreground transition-colors">
              Articles
            </a>
            <a
              href="https://www.linkedin.com/in/jugallodha/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs hover:border-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={14} />
              <span>Connect</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero / Intro */}
      <section id="about" className="border-b border-border bg-white">
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden="true"
          >
            <div className="[background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:112px_112px] h-full w-full" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-24 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            <div className="space-y-8">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Personal finance · Investing · Money habits
              </p>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
                  Clear money thinking
                  <br />
                  for busy professionals.
                </h1>
                <p className="text-base lg:text-lg text-muted-foreground max-w-xl">
                  I&apos;m Jugal Lodha, a finance professional sharing calm,
                  practical guidance on investing, personal finance, and building
                  a sustainable relationship with money.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#articles"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
                >
                  Read latest articles
                  <ArrowRight size={16} />
                </a>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-[1px] w-8 bg-border" />
                  <span>New posts whenever there&apos;s something worth saying.</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Also on</span>
              <a
                href="https://www.linkedin.com/in/jugallodha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <span className="h-1 w-1 rounded-full bg-border" />
                <a
                  href="https://instagram.com/jugal.money"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-64 w-64 lg:h-72 lg:w-72 mx-auto rounded-full border border-border/70 bg-muted overflow-hidden">
                <Image
                  src="/images/jugal-profile.jpeg"
                  alt="Jugal Lodha"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-6 text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Based in India, working at the intersection of markets, money and
                behavior. This space is my attempt to make finance feel less loud
                and more useful.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Latest articles</h2>
            <p className="text-sm text-muted-foreground">
              Short, calm notes on money, investing, and the psychology behind both.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">Loading articles…</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl py-12 px-6 text-center">
            <p className="text-sm text-muted-foreground">
              No articles have been published yet. The first one will arrive soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group rounded-xl border border-border/70 bg-background hover:border-foreground/60 hover:bg-muted/40 transition-colors"
              >
                <Link href={`/blog/${blog.slug}`} className="block px-5 py-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-medium tracking-tight group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {blog.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-between gap-2 sm:gap-1 text-xs text-muted-foreground shrink-0">
                      <span>{formatDate(blog.created_at)}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em]">
                        Read
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
