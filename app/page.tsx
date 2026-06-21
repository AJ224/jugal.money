'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Linkedin, Instagram, Menu, X } from 'lucide-react'

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
  const [navOpen, setNavOpen] = useState(false)

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

  const hasPrimaryFeatured = blogs.length > 0
  const hasSecondaryFeatured = blogs.length > 1
  const primaryFeatured = hasPrimaryFeatured ? blogs[0] : null
  const secondaryFeatured = hasSecondaryFeatured ? blogs[1] : null

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">
      {/* Top nav - Swiss minimal style */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#E5E5E3] bg-[#FAFAF8]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="font-serif text-[17px] font-semibold tracking-tight text-[#111111]"
          >
            jugal<span className="text-[#3A5C4E]">.</span>money
          </Link>
          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888] sm:flex">
            <a href="#feat" className="hover:text-[#111111] transition-colors">
              Articles
            </a>
            <a href="#topics" className="hover:text-[#111111] transition-colors">
              Topics
            </a>
            <a href="#about" className="hover:text-[#111111] transition-colors">
              About
            </a>
            <a href="#newsletter" className="hover:text-[#111111] transition-colors">
              Connect
            </a>
            <a
              href="#newsletter"
              className="rounded-full bg-[#3A5C4E] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#4D7A69] transition-colors"
            >
              Subscribe
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-[#111111] sm:hidden"
            aria-label="Toggle navigation"
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {navOpen && (
          <div className="sm:hidden border-t border-[#E5E5E3] bg-[#FAFAF8]/97 backdrop-blur-md">
            <nav className="flex flex-col px-6 pb-4 pt-2 text-sm text-[#333333]">
              <a
                href="#feat"
                className="border-b border-[#E5E5E3] py-2"
                onClick={() => setNavOpen(false)}
              >
                Articles
              </a>
              <a
                href="#topics"
                className="border-b border-[#E5E5E3] py-2"
                onClick={() => setNavOpen(false)}
              >
                Topics
              </a>
              <a
                href="#about"
                className="border-b border-[#E5E5E3] py-2"
                onClick={() => setNavOpen(false)}
              >
                About
              </a>
              <a
                href="#newsletter"
                className="py-2 font-semibold text-[#3A5C4E]"
                onClick={() => setNavOpen(false)}
              >
                Subscribe →
              </a>
            </nav>
          </div>
        )}
      </header>

      <div className="h-16" />

      {/* Hero */}
      <section className="border-b border-[#E5E5E3] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <p className="mb-10 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
            Personal blog · Finance &amp; Life
            <span className="h-px w-16 bg-[#3A5C4E]" />
          </p>
          <div className="grid items-end gap-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,360px)]">
            <div>
              <h1 className="mb-6 font-serif text-[44px] leading-[0.97] tracking-[-0.03em] text-[#111111] sm:text-[56px] lg:text-[68px]">
                Money,
                <br />
                Business
                <br />
                &amp; <span className="italic text-[#3A5C4E]">Life</span>
              </h1>
              <p className="mb-6 max-w-xl text-[16px] font-light leading-[1.72] text-[#888888]">
                Thoughtful insights on finance, investing, business stories, lifestyle
                ideas, and lessons from travel.
              </p>
              <p className="mb-10 max-w-xl text-[15px] leading-[1.8] text-[#333333]">
                I&apos;m Jugal Lodha, a finance professional sharing practical insights
                on money, business, and the experiences that shape how we think about
                wealth and life.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#feat"
                  className="inline-flex items-center justify-center bg-[#3A5C4E] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#4D7A69] transition-colors"
                >
                  Start Reading
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 border-b border-[#E5E5E3] pb-1 text-[13px] font-medium text-[#888888] hover:border-[#3A5C4E] hover:text-[#3A5C4E] transition-colors"
                >
                  About Jugal
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5E5E3]">
                <Image
                  src="/images/jugal-profile.jpeg"
                  alt="Jugal Lodha"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[#3A5C4E] px-6 py-5">
                <div>
                  <div className="font-serif text-[19px] font-semibold tracking-tight text-white">
                    Jugal Lodha
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    Finance Professional &amp; Writer
                  </div>
                </div>
                <div className="text-[12px] text-white/70">India 🇮🇳</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#E5E5E3] bg-[#FAFAF8]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-[#E5E5E3] px-6 py-10 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-12">
          <div className="px-0 py-6 md:px-8 md:py-10">
            <div className="font-serif text-[48px] leading-none tracking-[-0.04em] text-[#3A5C4E] md:text-[60px]">
              {loading ? '—' : blogs.length > 0 ? blogs.length : '—'}
            </div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
              Articles
            </div>
            <p className="mt-2 text-[13.5px] font-light leading-[1.65] text-[#888888]">
              In-depth essays on money, markets, and business.
            </p>
          </div>
          <div className="px-0 py-6 md:px-8 md:py-10">
            <div className="font-serif text-[48px] leading-none tracking-[-0.04em] text-[#3A5C4E] md:text-[60px]">
              12k
            </div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
              Monthly readers
            </div>
            <p className="mt-2 text-[13.5px] font-light leading-[1.65] text-[#888888]">
              Professionals and curious minds thinking differently about money.
            </p>
          </div>
          <div className="px-0 py-6 md:px-8 md:py-10">
            <div className="font-serif text-[48px] leading-none tracking-[-0.04em] text-[#3A5C4E] md:text-[60px]">
              4+
            </div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
              Years writing
            </div>
            <p className="mt-2 text-[13.5px] font-light leading-[1.65] text-[#888888]">
              Consistent, unhurried writing since 2021. Quality over noise.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="feat" className="border-b border-[#E5E5E3] bg-[#FAFAF8]">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pb-6 pt-12 lg:px-12">
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
              Featured
            </div>
            <h2 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[32px]">
              Worth reading first
            </h2>
          </div>
          <a
            href="#latest-heading"
            className="hidden items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3A5C4E] md:inline-flex"
          >
            All articles →
          </a>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-12 lg:px-12">
          <div className="grid gap-px bg-[#E5E5E3] md:grid-cols-3">
            {primaryFeatured ? (
              <Link
                href={`/blog/${primaryFeatured.slug}`}
                className="group col-span-1 bg-white md:col-span-2 md:grid md:grid-cols-2"
              >
                <div className="flex aspect-[16/10] items-center justify-center bg-[#E5E5E3] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888888] md:aspect-auto md:min-h-[260px]">
                  {primaryFeatured.featured_image ? (
                    <Image
                      src={primaryFeatured.featured_image}
                      alt={primaryFeatured.title}
                      width={640}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>Cover · Money &amp; Investing</span>
                  )}
                </div>
                <div className="flex flex-col p-9">
                  <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3A5C4E]">
                    Featured article
                  </span>
                  <h3 className="mb-3 font-serif text-[22px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#111111] group-hover:text-[#3A5C4E] transition-colors md:text-[26px]">
                    {primaryFeatured.title}
                  </h3>
                  <p className="mb-6 text-[13px] font-light leading-[1.7] text-[#888888]">
                    {primaryFeatured.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E3] pt-4 text-[11px] font-medium text-[#888888]">
                    <span>{formatDate(primaryFeatured.created_at)}</span>
                    <span className="h-[2px] w-[2px] rounded-full bg-[#E5E5E3]" />
                    <span>Read</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="col-span-1 flex items-center justify-center bg-white p-12 md:col-span-2">
                <p className="max-w-md text-center text-[14px] font-light leading-relaxed text-[#888888]">
                  Publish your first article in Sanity Studio to feature it here.
                </p>
              </div>
            )}

            {secondaryFeatured ? (
              <Link
                href={`/blog/${secondaryFeatured.slug}`}
                className="group bg-white p-9"
              >
                <div className="mb-5 flex aspect-[16/9] items-center justify-center bg-[#E5E5E3] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
                  Business Stories
                </div>
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3A5C4E]">
                  From the blog
                </span>
                <h3 className="mb-3 font-serif text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#111111] group-hover:text-[#3A5C4E] transition-colors">
                  {secondaryFeatured.title}
                </h3>
                <p className="mb-6 text-[13px] font-light leading-[1.7] text-[#888888]">
                  {secondaryFeatured.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E3] pt-4 text-[11px] font-medium text-[#888888]">
                  <span>{formatDate(secondaryFeatured.created_at)}</span>
                  <span className="h-[2px] w-[2px] rounded-full bg-[#E5E5E3]" />
                  <span>Read</span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-center bg-white p-9 text-center">
                <p className="text-[13px] font-light leading-relaxed text-[#888888]">
                  More articles coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-[#E5E5E3] bg-[#FAFAF8]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12 lg:py-20">
          <div>
            <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
              About Jugal
            </span>
            <h2 className="mb-6 font-serif text-[40px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#111111] sm:text-[46px]">
              Finance
              <br />
              professional.
              <br />
              <span className="italic text-[#3A5C4E]">Writer.</span>
              <br />
              Observer.
            </h2>
            <p className="mb-3 text-[15px] font-light leading-[1.82] text-[#888888]">
              I&apos;m Jugal Lodha — a finance professional based in India, working at
              the intersection of markets, money, and human behavior.
            </p>
            <p className="mb-6 text-[15px] font-light leading-[1.82] text-[#888888]">
              This blog is my attempt to make finance feel less loud and more useful.
              No sponsored content. No noise. Just ideas worth sitting with.
            </p>
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#3A5C4E]"
            >
              Read more about me →
            </a>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-px bg-[#E5E5E3]">
              <div className="bg-white px-7 py-6">
                <div className="font-serif text-[36px] font-semibold leading-none tracking-[-0.03em] text-[#3A5C4E]">
                  {loading ? '—' : blogs.length > 0 ? blogs.length : '—'}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
                  Articles
                </div>
              </div>
              <div className="bg-white px-7 py-6">
                <div className="font-serif text-[36px] font-semibold leading-none tracking-[-0.03em] text-[#3A5C4E]">
                  12k
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
                  Readers / mo
                </div>
              </div>
              <div className="bg-white px-7 py-6">
                <div className="font-serif text-[36px] font-semibold leading-none tracking-[-0.03em] text-[#3A5C4E]">
                  4+
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
                  Years writing
                </div>
              </div>
              <div className="bg-white px-7 py-6">
                <div className="font-serif text-[36px] font-semibold leading-none tracking-[-0.03em] text-[#3A5C4E]">
                  4
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
                  Topics
                </div>
              </div>
            </div>
            <blockquote className="bg-[#3A5C4E] px-9 py-8 font-serif text-[18px] italic leading-[1.55] text-white">
              <span className="mb-2 block text-[40px] leading-none text-white/40">“</span>
              Finance should feel like a quiet advantage — not a source of constant
              anxiety.
              <span className="mt-4 block font-sans text-[11px] font-semibold not-italic uppercase tracking-[0.1em] text-white/60">
                — Jugal Lodha
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="border-b border-[#E5E5E3] bg-[#FAFAF8]">
        <div className="mx-auto max-w-6xl px-6 pb-4 pt-12 lg:px-12">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
            Explore
          </div>
          <h2 className="mb-8 font-serif text-[28px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[32px]">
            Topics I write about
          </h2>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-14 lg:px-12">
          <div className="grid gap-px bg-[#E5E5E3] md:grid-cols-2 lg:grid-cols-4">
            <a
              href="#latest-heading"
              className="relative block bg-white px-7 py-9 hover:bg-[#EEF3F1] transition-colors"
            >
              <span className="mb-4 block text-[26px]">₹</span>
              <div className="mb-2 font-serif text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
                Money &amp; Investing
              </div>
              <p className="text-[12.5px] font-light leading-[1.65] text-[#888888]">
                Personal finance, investing frameworks, money psychology for the long
                game.
              </p>
            </a>
            <a
              href="#latest-heading"
              className="relative block bg-white px-7 py-9 hover:bg-[#EEF3F1] transition-colors"
            >
              <span className="mb-4 block text-[26px]">📊</span>
              <div className="mb-2 font-serif text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
                Business Stories
              </div>
              <p className="text-[12.5px] font-light leading-[1.65] text-[#888888]">
                Company deep-dives, case studies, notable frauds, business lessons.
              </p>
            </a>
            <a
              href="#latest-heading"
              className="relative block bg-white px-7 py-9 hover:bg-[#EEF3F1] transition-colors"
            >
              <span className="mb-4 block text-[26px]">✦</span>
              <div className="mb-2 font-serif text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
                Lifestyle &amp; Thinking
              </div>
              <p className="text-[12.5px] font-light leading-[1.65] text-[#888888]">
                Productivity, habits, and how to build a life that quietly compounds.
              </p>
            </a>
            <a
              href="#latest-heading"
              className="relative block bg-white px-7 py-9 hover:bg-[#EEF3F1] transition-colors"
            >
              <span className="mb-4 block text-[26px]">✈</span>
              <div className="mb-2 font-serif text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
                Travel &amp; Experiences
              </div>
              <p className="text-[12.5px] font-light leading-[1.65] text-[#888888]">
                Travel stories and reflections on what places reveal about money and
                life.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Latest / Articles list */}
      <section
        aria-labelledby="latest-heading"
        className="border-b border-[#E5E5E3] bg-[#FAFAF8]"
      >
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pb-6 pt-12 lg:px-12">
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
              Latest
            </div>
            <h2
              id="latest-heading"
              className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[32px]"
            >
              Recent writing
            </h2>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-14 lg:px-12">
          {loading ? (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-[#E5E5E3] py-10 px-6">
              <p className="text-sm text-[#888888]">Loading articles…</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="space-y-px bg-[#E5E5E3]">
              <div className="bg-white px-9 py-8">
                <p className="text-sm text-[#888888]">
                  No articles have been published yet. The first one will arrive soon.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-px bg-[#E5E5E3] md:grid-cols-3">
              {blogs.slice(0, 3).map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col bg-white p-9"
                >
                  <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3A5C4E]">
                    {blog.author || 'Article'}
                  </span>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#111111] group-hover:text-[#3A5C4E] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="mb-6 text-[13px] font-light leading-[1.65] text-[#888888] line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E3] pt-4 text-[11px] font-medium text-[#888888]">
                    <span>{formatDate(blog.created_at)}</span>
                    <span className="h-[2px] w-[2px] rounded-full bg-[#E5E5E3]" />
                    <span className="inline-flex items-center gap-1">
                      Read
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section
        id="newsletter"
        className="border-b border-[#E5E5E3] bg-[#FAFAF8]"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12 lg:py-20">
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
              Newsletter
            </div>
            <h2 className="mb-4 font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] text-[#111111] sm:text-[44px]">
              Money
              <br />
              thoughts
              <br />
              <span className="italic text-[#3A5C4E]">
                in your
                <br />
                inbox
              </span>
            </h2>
            <p className="text-[15px] font-light leading-[1.72] text-[#888888]">
              Occasional reflections on finance, business, and life. No noise. No
              spam. Just ideas worth thinking about — sent when there&apos;s something
              worth saying.
            </p>
          </div>
          <div>
            <form className="space-y-4 rounded border border-[#E5E5E3] bg-white px-9 py-8">
              <input
                type="text"
                placeholder="Your first name"
                className="w-full border-b border-[#E5E5E3] bg-transparent pb-3 text-[14px] text-[#111111] outline-none placeholder:text-[#888888] focus:border-[#3A5C4E]"
              />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full border-b border-[#E5E5E3] bg-transparent pb-3 text-[14px] text-[#111111] outline-none placeholder:text-[#888888] focus:border-[#3A5C4E]"
              />
              <button
                type="button"
                className="mt-4 w-full bg-[#3A5C4E] py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#4D7A69] transition-colors"
              >
                Subscribe — it&apos;s free
              </button>
              <p className="pt-1 text-center text-[11px] text-[#888888]">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 lg:px-12">
          <Link
            href="/"
            className="font-serif text-[16px] font-semibold tracking-tight text-white"
          >
            jugal<span className="text-[#3A5C4E]">.</span>money
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium uppercase tracking-[0.1em] text-white/40">
            <Link href="/#latest-heading" className="hover:text-white/90 transition-colors">
              Articles
            </Link>
            <a href="#about" className="hover:text-white/90 transition-colors">
              About
            </a>
            <span className="hidden h-4 w-px bg-white/15 sm:inline-block" />
            <a
              href="https://linkedin.com/in/jugallodha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white/90 transition-colors"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://instagram.com/jugal.money"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white/90 transition-colors"
            >
              <Instagram size={14} />
              <span>Instagram</span>
            </a>
          </div>
          <p className="text-[11px] text-white/40">© 2025 Jugal Lodha</p>
        </div>
      </footer>
    </main>
  )
}
