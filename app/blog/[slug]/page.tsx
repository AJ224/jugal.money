import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { PostBody } from '@/components/post-body'
import { getPostBySlug, getPostSlugs } from '@/lib/sanity/queries'

export const revalidate = 60

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function shouldShowExcerpt(title: string, excerpt: string) {
  if (!excerpt.trim()) return false
  return excerpt.trim().toLowerCase() !== title.trim().toLowerCase()
}

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error('Failed to load post slugs for static generation:', error)
    return []
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getPostBySlug(slug)

  if (!blog) {
    return (
      <main className="min-h-screen bg-white text-[#1A202C]">
        <div className="mx-auto max-w-3xl px-5 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#0A2647] transition-colors hover:text-[#00A878]"
          >
            <ArrowLeft size={18} />
            Back home
          </Link>
          <p className="mt-12 text-[#4A5568]">This article could not be found.</p>
        </div>
      </main>
    )
  }

  const showExcerpt = shouldShowExcerpt(blog.title, blog.excerpt)

  return (
    <main className="min-h-screen bg-white text-[#1A202C]">
      <header className="sticky top-0 z-40 border-b-[3px] border-[#00A878] bg-[#0A2647]">
        <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="flex items-center font-['Mulish',system-ui,sans-serif] text-[1.45rem] font-extrabold tracking-tight text-white"
          >
            Jugal<span className="text-[#00A878]">.</span>
            <span className="text-[#00A878]">Money</span>
          </Link>
          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40 sm:block">
            Money &amp; Business · Simplified
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0A2647] px-5 py-6 lg:px-12 lg:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        >
          <div className="h-full w-full bg-[linear-gradient(#ffffff06_1px,transparent_1px),linear-gradient(90deg,#ffffff06_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-3 text-[13px] text-white/45">
            {formatDate(blog.created_at)} · {blog.author || 'Jugal Lodha'}
          </p>

          <h1 className="max-w-2xl font-['Mulish',system-ui,sans-serif] text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-white sm:text-[2.35rem] lg:text-[2.6rem]">
            {blog.title}
          </h1>

          {showExcerpt ? (
            <p className="mt-3 max-w-2xl text-[16px] leading-[1.65] text-white/65">
              {blog.excerpt}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 pb-16 pt-8 lg:px-12 lg:pb-20 lg:pt-10">
        <article>
          <PostBody value={blog.body} />
        </article>

        <div className="mt-12 border-t border-[#E5E5E3] pt-8">
          <Link
            href="/#feat"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0A2647] transition-colors hover:text-[#00A878]"
          >
            <ArrowLeft size={16} />
            All articles
          </Link>
        </div>
      </div>

      <footer className="border-t border-[#0A2647]/10 bg-[#0A2647] px-5 py-8 lg:px-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-['Mulish',system-ui,sans-serif] text-[1.25rem] font-extrabold tracking-tight text-white">
            Jugal<span className="text-[#00A878]">.</span>
            <span className="text-[#00A878]">Money</span>
          </div>
          <p className="text-[12px] text-white/35">
            © {new Date().getFullYear()} Jugal Lodha
          </p>
        </div>
      </footer>
    </main>
  )
}
