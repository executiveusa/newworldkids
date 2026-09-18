'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

type Props = { locale: string }

const compensationOptions = [
  'Paid',
  'Stipend-supported',
  'Sponsored',
  'Unpaid / community service',
]

export default function OpportunityForm({ locale }: Props) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setMessage('')

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/opportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result?.error || 'Submission failed.')

      form.reset()
      setState('success')
      setMessage(
        'Your project was submitted. We review each project submission and normally respond within 5 business days.'
      )
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(35)
      }
    } catch (error) {
      setState('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not submit the project. Please try again or email info@nwkids.org.'
      )
    }
  }

  const input =
    'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/15'
  const label = 'block text-sm font-semibold text-slate-900'

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          The First 12 · Seattle 2027
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-6xl">
          Bring us a real project.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Businesses, nonprofits, schools, community groups, coaches, mentors, creatives, and
          legitimate individuals can submit work that young people ages 16–19 can contribute to.
          Paid, stipend-supported, sponsored, and unpaid community-service opportunities are all
          considered, but compensation must be disclosed clearly.
        </p>

        <form onSubmit={onSubmit} className="mt-12 space-y-8 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <label className={label}>
              Contact name *
              <input className={input} name="contactName" required autoComplete="name" />
            </label>
            <label className={label}>
              Organization / business *
              <input className={input} name="organization" required autoComplete="organization" />
            </label>
            <label className={label}>
              Email *
              <input className={input} name="email" type="email" required autoComplete="email" />
            </label>
            <label className={label}>
              Phone
              <input className={input} name="phone" type="tel" autoComplete="tel" />
            </label>
          </div>

          <label className={label}>
            Project title *
            <input className={input} name="projectTitle" required />
          </label>

          <label className={label}>
            Project description *
            <textarea className={input} name="projectDescription" rows={5} required />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className={label}>
              Location / remote *
              <input className={input} name="location" required placeholder="Seattle, remote, hybrid…" />
            </label>
            <label className={label}>
              Desired timeline *
              <input className={input} name="timeline" required placeholder="Month, dates, or flexible window" />
            </label>
            <label className={label}>
              Skills involved *
              <input className={input} name="skills" required />
            </label>
            <label className={label}>
              Estimated hours *
              <input className={input} name="estimatedHours" required placeholder="e.g. 8–12 hours" />
            </label>
          </div>

          <fieldset>
            <legend className={label}>Compensation type *</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {compensationOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm">
                  <input type="radio" name="compensationType" value={option} required />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <label className={label}>
            Compensation amount / details *
            <input className={input} name="compensationDetails" required placeholder="Rate, stipend, sponsor support, or 'none'" />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className={label}>
              Number of youth involved *
              <input className={input} name="youthCount" type="number" min="1" max="12" required />
            </label>
            <label className={label}>
              Adult supervision / contact *
              <input className={input} name="adultSupervision" required />
            </label>
          </div>

          <label className={label}>
            Safety considerations *
            <textarea className={input} name="safetyConsiderations" rows={3} required placeholder="Tools, travel, site access, physical activity, online contact, or none" />
          </label>

          <label className={label}>
            Accessibility considerations
            <textarea className={input} name="accessibilityConsiderations" rows={3} />
          </label>

          <label className={label}>
            Anything participants must provide
            <textarea className={input} name="participantRequirements" rows={3} />
          </label>

          <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <input className="mt-1" type="checkbox" name="contactConsent" value="yes" required />
            <span>
              I agree that New World Kids may contact me about this submission and closely related
              follow-up. Submitting this form does not subscribe me to marketing.
            </span>
          </label>

          <p className="text-sm leading-6 text-slate-600">
            We use this information to review whether the opportunity is appropriate for New World
            Kids participants. See our{' '}
            <Link className="font-semibold text-blue-900 underline underline-offset-4" href={`/${locale}/privacy-policy`}>
              Privacy Policy
            </Link>.
          </p>

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-950 px-7 py-3 font-semibold text-white transition hover:bg-blue-900 disabled:cursor-wait disabled:opacity-60"
          >
            {state === 'submitting' ? 'Submitting…' : 'Submit project'}
          </button>

          {message && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl p-4 text-sm ${state === 'success' ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}
            >
              {message}
            </div>
          )}
        </form>

        <p className="mt-8 text-sm text-slate-600">
          Need another route? Email{' '}
          <a className="font-semibold text-blue-900 underline underline-offset-4" href="mailto:info@nwkids.org">
            info@nwkids.org
          </a>.
        </p>
      </section>
    </main>
  )
}
