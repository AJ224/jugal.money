import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  created_at: string
  slug: string
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
      'http://localhost:3000'

    const res = await fetch(`${base}/api/blogs/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.blog as Blog
  } catch (e) {
    console.error('Failed to fetch blog:', e)
    return null
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    return (
      <main className="min-h-screen bg-white text-[#1A202C]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[#0A2647] hover:text-[#00A878] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to all articles
          </Link>
          <div className="py-16 text-center text-[#4A5568]">
            <p className="text-lg">This article could not be found.</p>
          </div>
        </div>
      </main>
    )
  }

  // Split content into paragraphs for better layout across posts
  const paragraphs = blog.content
    ? blog.content
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
    : []

  return (
    <main className="min-h-screen bg-white text-[#1A202C]">
      {/* Progress bar placeholder (design hint, no JS) */}
      <div className="fixed inset-x-0 top-0 h-[3px] bg-[#00A878]/40">
        <div className="h-full w-1/3 bg-[#00A878]" />
      </div>

      {/* Masthead */}
      <header className="sticky top-0 z-40 border-b-[3px] border-[#00A878] bg-[#0A2647]">
        <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center font-['Mulish',system-ui,sans-serif] text-[1.45rem] font-extrabold tracking-tight text-white">
            Jugal<span className="text-[#00A878]">.</span>
            <span className="text-[#00A878]">Money</span>
          </div>
          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40 sm:block">
            Money &amp; Business · Simplified
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-[#0A2647] px-6 pb-16 pt-12 lg:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="h-full w-full bg-[linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)] bg-[length:48px_48px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_90%_50%,rgba(0,168,120,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_-10%_100%,rgba(14,52,96,0.6)_0%,transparent_60%)]" />
        <div className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 select-none text-[10rem] font-extrabold leading-none tracking-[-0.05em] text-white/5 sm:right-[6%] sm:text-[16rem] lg:text-[22rem]">
          01
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center animate-[fadeUp_0.8s_ease-out_forwards]">
          <div className="mb-7 flex items-center gap-4 text-center">
            <span className="h-[2px] w-10 bg-[#00A878]" />
            <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#00A878]">
              {blog.excerpt ? 'Deep Dive' : 'Essay'}
            </span>
            <span className="text-[0.6rem] text-white/30">·</span>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/40">
              {formatDate(blog.created_at)}
            </span>
          </div>

          <h1 className="mb-5 font-['Mulish',system-ui,sans-serif] text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.8rem] lg:text-[3.1rem]">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mb-10 max-w-2xl text-[1.05rem] font-semibold leading-[1.7] text-white/70">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-5 text-[0.8rem] sm:text-[0.85rem]">
            <div className="border-white/15 pr-0 text-center sm:border-r sm:pr-7 sm:text-left">
              <div className="mb-1 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-white/40">
                Author
              </div>
              <div className="font-extrabold text-white/80">
                {blog.author || 'Jugal Lodha'}
              </div>
            </div>
            <div className="border-white/15 pr-0 text-center sm:border-r sm:pr-7 sm:text-left">
              <div className="mb-1 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-white/40">
                Published
              </div>
              <div className="font-extrabold text-white/80">
                {formatDate(blog.created_at)}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="mb-1 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-white/40">
                Category
              </div>
              <div className="font-extrabold text-white/80">
                Essay
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-10 lg:px-12">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#00A878] text-[0.78rem] font-extrabold text-white">
            01
          </div>
          <div className="h-px flex-1 bg-[#D1DCE8]" />
          <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[#718096]">
            The Story
          </div>
        </div>

        <article className="space-y-6 text-[1.02rem] font-semibold leading-[1.82] text-[#4A5568]">
          {paragraphs.length === 0 ? (
            <p>{blog.content}</p>
          ) : (
            <>
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[3.4rem] first-letter:font-extrabold first-letter:leading-[0.85] first-letter:text-[#0A2647] first-letter:tracking-[-0.03em]">
                {paragraphs[0]}
              </p>
              {paragraphs.slice(1).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </>
          )}
        </article>

        <div className="mt-12 border-t-2 border-[#D1DCE8] pt-6 flex flex-col items-start justify-between gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#718096] sm:flex-row">
          <div>
            <span className="font-extrabold text-[#0A2647]">Jugal.Money</span> ·{' '}
            {formatDate(blog.created_at)}
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[3px] bg-[#0A2647] px-4 py-3 text-[0.8rem] font-extrabold tracking-[0.04em] text-white shadow-md transition-all hover:bg-[#00A878] hover:shadow-lg"
          >
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A2647] px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <div className="mb-2 font-['Mulish',system-ui,sans-serif] text-[1.6rem] font-extrabold tracking-tight text-white">
              Jugal<span className="text-[#00A878]">.</span>
              <span className="text-[#00A878]">Money</span>
            </div>
            <div className="text-[0.8rem] font-semibold leading-relaxed text-white/35">
              Money &amp; Business, Simplified
              <br />
              by Jugal Lodha · jugal.money
            </div>
          </div>
          <div className="text-right text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white/30 sm:text-right">
            {formatDate(blog.created_at)}
            <br />
            © {new Date(blog.created_at).getFullYear()} Jugal.Money
          </div>
        </div>
      </footer>
    </main>
  )
}
