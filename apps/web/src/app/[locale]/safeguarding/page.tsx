import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Youth Safeguarding | New World Kids',
  description:
    'Youth safeguarding standards for New World Kids programs, mentors, volunteers, partners, and project providers.',
}

export default function SafeguardingPage() {
  return (
    <main className="bg-white text-slate-900">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Participant safety
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          Youth safeguarding policy
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          New World Kids is committed to providing environments where young people are treated with
          dignity, listened to, and protected from abuse, exploitation, harassment, neglect, and
          avoidable harm. These standards apply to New World Kids staff, mentors, volunteers,
          contractors, partners, project providers, and other adults acting on behalf of a New
          World Kids program.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Interim operating standard · effective September 18, 2026 · review before the First 12
          participant intake opens
        </p>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">1. Safer participation</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
            <li>Youth participation must be appropriate to the participant&apos;s age, abilities, and the risks of the activity.</li>
            <li>Participants under 18 must have appropriate parent or guardian consent before direct program participation, except where applicable law or an approved safeguarding procedure provides otherwise.</li>
            <li>Project providers must disclose supervision, location, transportation, tools, physical activity, online-contact, accessibility, and other material safety considerations before an opportunity is approved.</li>
            <li>Young people must be told who they can contact if something feels unsafe, inappropriate, coercive, or uncomfortable.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">2. Screening and suitability</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
            <li>Mentor or volunteer interest does not equal approval or placement.</li>
            <li>Adults with direct or ongoing youth contact must complete the screening required for their role before unsupervised or recurring participant contact is authorized.</li>
            <li>Screening may include identity verification, interviews, references, criminal-history or sex-offender-registry checks where lawful and appropriate, and review of role suitability.</li>
            <li>New World Kids may decline or end a placement when safety, conduct, reliability, or suitability concerns are identified.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">3. Adult-youth boundaries</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
            <li>Activities should use observable and interruptible settings whenever practical.</li>
            <li>New World Kids favors a two-adult or otherwise observable supervision model for in-person youth activities. One-to-one contact must be specifically permitted by the program plan, appropriate to the activity, and subject to documented safeguards.</li>
            <li>Adults may not use their role to pursue romantic, sexual, exploitative, coercive, or secret relationships with participants.</li>
            <li>Adults may not ask a participant to keep program-related contact or conduct secret from a parent, guardian, supervisor, or safeguarding contact.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">4. Digital communication</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
            <li>Program communication should use approved channels and remain professional, purpose-specific, and capable of appropriate oversight.</li>
            <li>Private or disappearing-message channels should not be used for routine adult-youth program communication.</li>
            <li>Adults should not move a youth relationship into private social-media contact unless the program has specifically authorized that channel and appropriate safeguards are in place.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">5. Photography, video, and stories</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
            <li>Images, video, names, testimonials, or identifying stories involving participants are published only through an approved media-consent process.</li>
            <li>Consent for program participation does not automatically equal consent for public media use.</li>
            <li>New World Kids will avoid publishing sensitive personal information that could create a safety or privacy risk for a participant.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">6. Reporting concerns</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
            <li>Any person may raise a concern about abuse, neglect, harassment, exploitation, grooming, unsafe conduct, retaliation, or another safeguarding issue.</li>
            <li>Concerns must be taken seriously, documented appropriately, shared only with people who need the information to respond, and escalated without retaliation against the person who reported them.</li>
            <li>Suspected abuse or danger must be reported to the appropriate authorities when required by applicable law. Immediate danger should be reported to emergency services.</li>
            <li>New World Kids will not conduct an internal process in a way that obstructs a required report to law enforcement, child-protection authorities, or another competent authority.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">7. Safeguarding leadership and review</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Jeremy Bowers is the interim accountable safeguarding contact while New World Kids
            completes the First 12 operating procedures. Before direct participant intake opens,
            New World Kids will maintain written procedures for reporting and escalation, screening,
            consent, supervision, transportation where applicable, media rights, and record access.
            This policy will be reviewed before launch and whenever program operations materially
            change.
          </p>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold">Report a concern</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Safeguarding questions or concerns can be sent to{' '}
            <a className="font-semibold text-blue-950 underline underline-offset-4" href="mailto:info@nwkids.org">
              info@nwkids.org
            </a>
            . If someone is in immediate danger, contact local emergency services rather than waiting for an email response.
          </p>
        </section>
      </article>
    </main>
  )
}
