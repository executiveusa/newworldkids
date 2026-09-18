import type { Metadata } from 'next'
import Link from 'next/link'

type PageProps = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Proof Archive | New World Kids',
  description:
    'Dated public evidence from New World Kids projects, published only after verification and media-rights review.',
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params

  return (
    <main className="bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Story · proof archive
        </p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold tracking-tight md:text-6xl">
          Evidence first. Publish second.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          This archive is reserved for dated, captioned, consent-cleared photographs, video, and
          field records. We will not fill it with stock photography, generated proof, or
          unverified impact claims.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              Proyecto Indigo Azul
            </p>
            <h2 className="mt-3 text-2xl font-bold">Prior-work evidence</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Media has not yet been approved for public publication in this archive. Assets will
              appear here only after source, date, caption, participant privacy, and media-rights
              review are complete.
            </p>
            <p className="mt-5 text-sm font-semibold text-slate-900">Status: review pending</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-800">
              The First 12 · Seattle 2027
            </p>
            <h2 className="mt-3 text-2xl font-bold">Pilot evidence</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The First 12 is pre-launch. No participant outcomes are being claimed before the
              pilot runs. Dated proof-of-work will be added as real program activity occurs.
            </p>
            <p className="mt-5 text-sm font-semibold text-slate-900">Status: pre-launch</p>
          </section>
        </div>

        <div className="mt-14 border-t border-slate-200 pt-8 text-sm leading-6 text-slate-600">
          <p>
            Questions about a source or artifact can be sent to{' '}
            <a className="font-semibold text-blue-950 underline underline-offset-4" href="mailto:info@nwkids.org">
              info@nwkids.org
            </a>.
          </p>
          <Link
            href={`/${locale}`}
            className="mt-4 inline-block font-semibold text-blue-950 underline underline-offset-4"
          >
            Back to New World Kids
          </Link>
        </div>
      </section>
    </main>
  )
}
