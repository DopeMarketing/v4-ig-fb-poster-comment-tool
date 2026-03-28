import Link from 'next/link'

interface HeroProps {
  headline: string
  subheadline: string
  ctaText?: string
  ctaHref?: string
}

export default function Hero({
  headline,
  subheadline,
  ctaText = 'Get started free',
  ctaHref = '/signup',
}: HeroProps) {
  return (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-gray-900 leading-tight">
        {headline}
      </h1>
      <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
        {subheadline}
      </p>
      <div className="mt-10">
        <Link
          href={ctaHref}
          className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl text-lg transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-primary)' }}
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}