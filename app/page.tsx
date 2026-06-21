'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  IndianRupee,
  Instagram,
  Linkedin,
  Menu,
  Plane,
  Sparkles,
  X,
} from 'lucide-react'

interface Blog {
  id: string
  title: string
  excerpt: string
  author: string
  created_at: string
  slug: string
  featured_image: string
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

  const topics = [
    {
      icon: IndianRupee,
      title: 'Money & Investing',
      description:
        'Personal finance, investing frameworks, money psychology for the long game.',
    },
    {
      icon: BarChart3,
      title: 'Business Stories',
      description:
        'Company deep-dives, case studies, notable frauds, business lessons.',
    },
    {
      icon: Sparkles,
      title: 'Lifestyle & Thinking',
      description:
        'Productivity, habits, and how to build a life that quietly compounds.',
    },
    {
      icon: Plane,
      title: 'Travel & Experiences',
      description:
        'Travel stories and reflections on what places reveal about money and life.',
    },
  ] as const

  const hasPrimaryFeatured = blogs.length > 0
  const hasSecondaryFeatured = blogs.length > 1
  const primaryFeatured = hasPrimaryFeatured ? blogs[0] : null
  const secondaryFeatured = hasSecondaryFeatured ? blogs[1] : null
  const latestBlogs = blogs
    .slice(secondaryFeatured ? 2 : primaryFeatured ? 1 : 0)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#E5E5E3] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 lg:h-16 lg:px-12">
          <Link
            href="/"
            className="font-serif text-[17px] font-semibold tracking-tight text-[#3A5C4E] lg:text-[#111111]"
          >
            jugal<span className="text-[#3A5C4E] lg:text-[#3A5C4E]">.</span>money
          </Link>
          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888] lg:flex">
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
            className="inline-flex items-center justify-center rounded-md p-2 text-[#3A5C4E] lg:hidden"
            aria-label="Toggle navigation"
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {navOpen && (
          <div className="border-t border-[#E5E5E3] bg-white/98 backdrop-blur-md lg:hidden">
            <nav className="flex flex-col px-5 pb-4 pt-2 text-sm text-[#333333]">
              <a
                href="#feat"
                className="border-b border-[#E5E5E3] py-3"
                onClick={() => setNavOpen(false)}
              >
                Articles
              </a>
              <a
                href="#topics"
                className="border-b border-[#E5E5E3] py-3"
                onClick={() => setNavOpen(false)}
              >
                Topics
              </a>
              <a
                href="#about"
                className="border-b border-[#E5E5E3] py-3"
                onClick={() => setNavOpen(false)}
              >
                About
              </a>
              <a
                href="#newsletter"
                className="py-3 font-semibold text-[#3A5C4E]"
                onClick={() => setNavOpen(false)}
              >
                Subscribe →
              </a>
            </nav>
          </div>
        )}
      </header>

      <div className="h-14 lg:h-16" />

      {/* Hero — mobile: stacked | desktop: bg.png anchored to bottom */}
      <section className="relative overflow-hidden border-b border-[#E5E5E3] bg-white lg:min-h-[calc(100dvh-4rem)]">
        {/* Mobile */}
        <div className="relative flex flex-col items-center bg-white px-5 pb-8 pt-5 text-center lg:hidden">
          <h1 className="mb-5 font-serif text-[clamp(2.25rem,11vw,3rem)] italic leading-none tracking-tight text-[#3A5C4E]">
            <span>Jugal</span>
            <span className="mx-3 font-sans text-[0.45em] font-light not-italic text-[#3A5C4E]/25">
              ·
            </span>
            <span>Lodha</span>
          </h1>

          <p className="mb-4 max-w-[18rem] font-sans text-[clamp(1.125rem,5vw,1.375rem)] font-extrabold uppercase leading-[1.2] tracking-[-0.01em] text-[#3A5C4E]">
            Make Money <span className="text-[#2F4F44]">&apos;Clear&apos;</span>
          </p>
          <p className="mb-6 max-w-[17rem] text-[14px] leading-[1.65] text-[#3A5C4E]/60">
            Finance, investing, and building wealth — without the jargon.
          </p>

          <div className="relative mb-7 aspect-[5/6] w-full max-w-[190px] overflow-hidden rounded-2xl bg-[#F0F0EE]">
            <Image
              src="/images/jugal-profile.jpeg"
              alt="Jugal Lodha"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <a
            href="#feat"
            className="inline-flex items-center justify-center rounded-lg bg-[#3A5C4E] px-8 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#4D7A69]"
          >
            Start Reading
          </a>
        </div>

        {/* Desktop — image height fills section, bottom-aligned */}
        <div className="absolute inset-0 hidden overflow-hidden bg-white lg:block" aria-hidden="true">
          <img
            src="/bg.png"
            alt=""
            fetchPriority="high"
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
          />
        </div>

        <div className="relative z-10 mx-auto hidden min-h-[calc(100dvh-4rem)] max-w-[1400px] flex-col justify-between px-10 pb-10 pt-24 lg:flex xl:px-16">
          <div className="flex flex-1 items-center">
            <h1 className="font-serif text-[clamp(4.5rem,11vw,10rem)] leading-[0.82] tracking-[-0.045em] text-[#3A5C4E]">
              Jugal
            </h1>
            <div className="flex-1" aria-hidden="true" />
            <h1 className="font-serif text-[clamp(4.5rem,11vw,10rem)] leading-[0.82] tracking-[-0.045em] text-[#3A5C4E]">
              Lodha
            </h1>
          </div>
          <div className="flex items-end justify-between gap-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#3A5C4E]/55">
              Money · Business · Life
            </p>
            <a
              href="#feat"
              className="inline-flex items-center gap-3 border border-[#3A5C4E]/30 bg-[#3A5C4E] px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#4D7A69]"
            >
              Start Reading
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="feat" className="border-b border-[#E5E5E3] bg-[#FAFAF8]">
        <div className="mx-auto max-w-6xl px-5 pb-5 pt-10 text-center lg:px-12 lg:pb-6 lg:pt-12 lg:text-left">
          <div className="lg:flex lg:items-baseline lg:justify-between">
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
                Featured
              </div>
              <h2 className="font-serif text-[24px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[32px]">
                Worth reading first
              </h2>
            </div>
            {latestBlogs.length > 0 && (
              <a
                href="#latest-heading"
                className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3A5C4E] lg:mt-0"
              >
                All articles →
              </a>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-10 lg:px-12 lg:pb-12">
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#E5E5E3] bg-white p-10 md:col-span-2">
                <p className="text-sm text-[#888888]">Loading articles…</p>
              </div>
            ) : primaryFeatured ? (
              <Link
                href={`/blog/${primaryFeatured.slug}`}
                className={`group overflow-hidden rounded-2xl border border-[#E5E5E3] bg-white ${
                  secondaryFeatured ? '' : 'md:max-w-xl'
                }`}
              >
                <div className="relative h-28 w-full overflow-hidden bg-[#E5E5E3] sm:h-32">
                  <Image
                    src={primaryFeatured.featured_image}
                    alt={primaryFeatured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 576px"
                  />
                </div>
                <div className="flex flex-col p-5">
                  <h3 className="mb-2 font-serif text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#111111] transition-colors group-hover:text-[#3A5C4E] md:text-[20px]">
                    {primaryFeatured.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-[13px] font-light leading-[1.7] text-[#888888]">
                    {primaryFeatured.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E3] pt-3 text-[11px] font-medium text-[#888888]">
                    <span>{formatDate(primaryFeatured.created_at)}</span>
                    <span className="h-[2px] w-[2px] rounded-full bg-[#E5E5E3]" />
                    <span>Read</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#E5E5E3] bg-white p-8 md:col-span-2">
                <p className="max-w-md text-center text-[14px] font-light leading-relaxed text-[#888888]">
                  Publish your first article in Sanity Studio to feature it here.
                </p>
              </div>
            )}

            {secondaryFeatured ? (
              <Link
                href={`/blog/${secondaryFeatured.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#E5E5E3] bg-white"
              >
                <div className="relative h-28 w-full overflow-hidden bg-[#E5E5E3] sm:h-32">
                  <Image
                    src={secondaryFeatured.featured_image}
                    alt={secondaryFeatured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 576px"
                  />
                </div>
                <div className="flex flex-col p-5">
                  <h3 className="mb-2 font-serif text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#111111] transition-colors group-hover:text-[#3A5C4E]">
                    {secondaryFeatured.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-[13px] font-light leading-[1.7] text-[#888888]">
                    {secondaryFeatured.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E3] pt-3 text-[11px] font-medium text-[#888888]">
                    <span>{formatDate(secondaryFeatured.created_at)}</span>
                    <span className="h-[2px] w-[2px] rounded-full bg-[#E5E5E3]" />
                    <span>Read</span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-[#E5E5E3] bg-[#FAFAF8]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-12 lg:py-20">
          <div className="text-center lg:text-left">
            <h2 className="mb-4 font-serif text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#111111] sm:text-[36px] lg:mb-6 lg:text-[46px]">
              Finance professional,{' '}
              <span className="italic text-[#3A5C4E]">writer &amp; observer.</span>
            </h2>
            <p className="mx-auto max-w-md text-[15px] font-light leading-[1.75] text-[#888888] lg:mx-0">
              I work at the intersection of markets, money, and human behavior — writing
              to make finance feel less loud and more useful.
            </p>
          </div>
          <blockquote className="rounded-2xl bg-[#3A5C4E] px-6 py-7 text-center font-serif text-[16px] italic leading-[1.55] text-white sm:px-9 sm:py-8 sm:text-[18px] lg:text-left">
            Finance should feel like a quiet advantage — not a source of constant
            anxiety.
          </blockquote>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="border-b border-[#E5E5E3] bg-[#FAFAF8]">
        <div className="mx-auto max-w-6xl px-5 pb-4 pt-10 text-center lg:px-12 lg:pt-12 lg:text-left">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
            Explore
          </div>
          <h2 className="mb-6 font-serif text-[24px] font-semibold tracking-[-0.02em] text-[#111111] md:mb-8 md:text-[32px]">
            Topics I write about
          </h2>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-10 lg:px-12 lg:pb-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {topics.map((topic, index) => {
              const Icon = topic.icon
              return (
                <a
                  key={topic.title}
                  href="#feat"
                  className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E5E5E3]/70 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3A5C4E]/25 hover:shadow-[0_12px_32px_rgba(58,92,78,0.12)] lg:min-h-[220px] lg:p-7"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#EEF3F1] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="mb-4 font-mono text-[11px] font-medium tracking-widest text-[#C5C5C3] transition-colors group-hover:text-[#3A5C4E]/50 lg:mb-5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3F1] text-[#3A5C4E] ring-1 ring-[#3A5C4E]/10 transition-all duration-300 group-hover:bg-[#3A5C4E] group-hover:text-white group-hover:ring-[#3A5C4E] lg:mb-5 lg:h-12 lg:w-12">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 font-serif text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#111111] transition-colors group-hover:text-[#3A5C4E] lg:text-[18px]">
                    {topic.title}
                  </h3>
                  <p className="mb-4 flex-1 text-[13px] leading-[1.65] text-[#666666] lg:mb-6 lg:text-[13.5px] lg:leading-[1.7]">
                    {topic.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#3A5C4E]">
                    Read
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Latest — only posts not already in Featured */}
      {latestBlogs.length > 0 && (
      <section
        aria-labelledby="latest-heading"
        className="border-b border-[#E5E5E3] bg-[#FAFAF8]"
      >
        <div className="mx-auto max-w-6xl px-5 pb-5 pt-10 text-center lg:px-12 lg:pb-6 lg:pt-12 lg:text-left">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
            Latest
          </div>
          <h2
            id="latest-heading"
            className="font-serif text-[24px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[32px]"
          >
            Recent writing
          </h2>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-10 lg:px-12 lg:pb-14">
          <div className="grid gap-4 md:gap-px md:bg-[#E5E5E3] md:grid-cols-3">
              {latestBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col rounded-2xl border border-[#E5E5E3] bg-white p-5 md:rounded-none md:border-0 md:p-9"
                >
                  <h3 className="mb-2 font-serif text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#111111] transition-colors group-hover:text-[#3A5C4E] md:text-[18px]">
                    {blog.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-[13px] font-light leading-[1.65] text-[#888888] md:mb-6">
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E3] pt-3 text-[11px] font-medium text-[#888888] md:pt-4">
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
        </div>
      </section>
      )}

      {/* Newsletter */}
      <section
        id="newsletter"
        className="border-b border-[#E5E5E3] bg-[#FAFAF8]"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-20">
          <div className="text-center lg:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5C4E]">
              Newsletter
            </div>
            <h2 className="mb-3 font-serif text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#111111] sm:text-[36px] lg:mb-4 lg:text-[44px]">
              Money thoughts,{' '}
              <span className="italic text-[#3A5C4E]">in your inbox</span>
            </h2>
            <p className="mx-auto max-w-sm text-[14px] font-light leading-[1.7] text-[#888888] lg:mx-0 lg:text-[15px] lg:leading-[1.72]">
              Occasional reflections on finance and life. No spam — only when
              there&apos;s something worth saying.
            </p>
          </div>
          <div>
            <form className="space-y-4 rounded-2xl border border-[#E5E5E3] bg-white px-5 py-6 lg:rounded lg:px-9 lg:py-8">
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
                className="mt-2 w-full rounded-lg bg-[#3A5C4E] py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#4D7A69] lg:mt-4"
              >
                Subscribe — it&apos;s free
              </button>
              <p className="pt-1 text-center text-[11px] text-[#888888]">
                Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-4 lg:px-12 lg:text-left">
          <Link
            href="/"
            className="font-serif text-[16px] font-semibold tracking-tight text-white"
          >
            jugal<span className="text-[#3A5C4E]">.</span>money
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium uppercase tracking-[0.1em] text-white/40 lg:justify-start">
            <Link href="/#feat" className="hover:text-white/90 transition-colors">
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
