import type { Metadata } from 'next'
import Link from 'next/link'

type PageProps = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Leadership & Accountability | New World Kids',
  description:
    'Public leadership, fiscal sponsorship, accountability, and contact information for New World Kids.',
}

export default async function GovernancePage({ params }: PageProps) {
  const { locale } = await params
  const privacyHref = `/${locale}/privacy-policy`
  const safetyHref = `/${locale}/safeguarding`

  return (
    <main className="bg-white text-slate-900">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Accountability
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          Leadership & accountability
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          New World Kids is an early-stage, fiscally sponsored project building the First 12 pilot
          in Seattle for 2027. This page publishes the accountability information that is verified
          today without presenting unconfirmed titles, credentials, or governance claims.
        </p>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">Accountable contact</h2>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xl font-semibold">Jeremy Bowers</p>
            <p className="mt-2 text-slate-600">
              Accountable New World Kids contact for organizational and public follow-up.
            </p>
            <a
              href="mailto:info@nwkids.org"
              className="mt-4 inline-block font-semibold text-blue-950 underline underline-offset-4"
            >
              info@nwkids.org
            </a>
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">Fiscal sponsorship</h2>
          <p className="mt-4 leading-7 text-slate-700">
            New World Kids is a fiscally sponsored project of Humanitarian Social Innovations, a
            501(c)(3) public charity. Donations for New World Kids are administered through the
            fiscal sponsor. New World Kids does not represent itself as independently holding
            federal 501(c)(3) recognition.
          </p>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">What we publish — and what we do not invent</h2>
          <p className="mt-4 leading-7 text-slate-700">
            New World Kids will publish leadership roles, policies, program results, partnerships,
            and impact evidence only when those details are confirmed. Historical repository
            material, former contact information, and unverified titles are not treated as current
            public facts.
          </p>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">Related policies</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link className="font-semibold text-blue-950 underline underline-offset-4" href={privacyHref}>
              Privacy policy
            </Link>
            <Link className="font-semibold text-blue-950 underline underline-offset-4" href={safetyHref}>
              Youth safeguarding
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
