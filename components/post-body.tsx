import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'next-sanity'
import Image from 'next/image'

import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types/post'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-serif text-2xl font-extrabold tracking-tight text-[#0A2647]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-extrabold text-[#0A2647]">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[#00A878] pl-4 italic text-[#4A5568]">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-6">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const isExternal = href.startsWith('http')

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00A878] underline underline-offset-2 hover:text-[#0A2647]"
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className="text-[#00A878] underline underline-offset-2 hover:text-[#0A2647]"
        >
          {children}
        </Link>
      )
    },
    strong: ({ children }) => <strong className="font-extrabold text-[#0A2647]">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage
      if (!image?.asset) return null

      const src = urlFor(image).width(1200).url()
      const alt = image.alt ?? ''

      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            className="w-full rounded-sm"
          />
          {alt ? (
            <figcaption className="mt-2 text-center text-sm text-[#718096]">{alt}</figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

interface PostBodyProps {
  value: PortableTextBlock[]
}

export function PostBody({ value }: PostBodyProps) {
  if (!value?.length) {
    return null
  }

  return (
    <div className="space-y-6 text-[1.02rem] font-semibold leading-[1.82] text-[#4A5568]">
      <PortableText value={value} components={components} />
    </div>
  )
}
