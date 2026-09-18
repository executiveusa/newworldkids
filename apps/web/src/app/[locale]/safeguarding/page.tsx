import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Youth Safeguarding | New World Kids',
  description:
    'Current youth-safeguarding commitments and pre-launch safety controls for New World Kids.',
}

export default function SafeguardingPage() {
  return (
    <main className="bg-white text-slate-900">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Participant safety
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          Youth safeguarding
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          New World Kids is building the First 12 as a 2027 pilot. The program is not presented as
          fully operational today. Safety controls will be completed and verified before youth-facing
          intake or direct participant placement opens.
        </p>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">Current public commitments</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
            <li>
              Mentor interest does not equal placement. Required screening must be completed before
              participant contact is authorized.
            </li>
            <li>
              The current public website is not intended to collect sensitive participant
              information directly from minors.
            </li>
            <li>
              Youth-facing forms will not open until consent, access, retention, and safeguarding
              controls for those workflows are documented.
            </li>
            <li>
              Media involving participants will be published only through an approved consent and
              media-rights process.
            </li>
            <li>
              Project providers must disclose adult supervision, safety considerations, and
              accessibility considerations before an opportunity can be reviewed.
            </li>
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">Controls still being finalized</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Background-check details, incident-reporting procedures, one-to-one contact boundaries,
            and parent or guardian consent requirements will be published only after the operating
            policy is approved. Until then, the website will not describe those controls as if they
            are already complete.
          </p>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">Report a concern</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Safeguarding questions or concerns can be sent to{' '}
            <a
              className="font-semibold text-blue-950 underline underline-offset-4"
              href="mailto:info@nwkids.org"
            >
              info@nwkids.org
            </a>
            . Jeremy Bowers is the accountable New World Kids contact for organizational follow-up.
          </p>
        </section>
      </article>
    </main>
  )
}
