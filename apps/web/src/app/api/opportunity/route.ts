import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const requiredFields = [
  'contactName',
  'organization',
  'email',
  'projectTitle',
  'projectDescription',
  'location',
  'timeline',
  'skills',
  'estimatedHours',
  'compensationType',
  'compensationDetails',
  'youthCount',
  'adultSupervision',
  'safetyConsiderations',
  'contactConsent',
] as const

function clean(value: unknown, max = 4000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    for (const field of requiredFields) {
      if (!clean(body[field])) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const email = clean(body.email, 320)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    const submission = {
      contact_name: clean(body.contactName, 200),
      organization: clean(body.organization, 250),
      email,
      phone: clean(body.phone, 80) || null,
      project_title: clean(body.projectTitle, 250),
      project_description: clean(body.projectDescription),
      location: clean(body.location, 250),
      timeline: clean(body.timeline, 250),
      skills: clean(body.skills, 500),
      estimated_hours: clean(body.estimatedHours, 120),
      compensation_type: clean(body.compensationType, 120),
      compensation_details: clean(body.compensationDetails, 500),
      youth_count: Math.max(1, Math.min(12, Number(body.youthCount) || 1)),
      adult_supervision: clean(body.adultSupervision, 500),
      safety_considerations: clean(body.safetyConsiderations),
      accessibility_considerations: clean(body.accessibilityConsiderations) || null,
      participant_requirements: clean(body.participantRequirements) || null,
      contact_consent: clean(body.contactConsent) === 'yes',
      status: 'new',
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Opportunity intake storage is not configured.')
      return NextResponse.json(
        { error: 'Project intake is temporarily unavailable. Please email info@nwkids.org.' },
        { status: 503 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const { error: storageError } = await supabase
      .from('project_opportunity_submissions')
      .insert(submission)

    if (storageError) {
      console.error('Opportunity intake storage failed:', storageError.message)
      return NextResponse.json(
        { error: 'We could not save your submission. Please try again or email info@nwkids.org.' },
        { status: 500 }
      )
    }

    const resendKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.OPPORTUNITY_EMAIL_FROM
    const notifyAddress = process.env.OPPORTUNITY_EMAIL_TO || 'info@nwkids.org'

    if (resendKey && fromAddress) {
      const subject = `New project submission: ${submission.project_title}`
      const text = [
        'A new First 12 project opportunity was submitted.',
        '',
        `Contact: ${submission.contact_name}`,
        `Organization: ${submission.organization}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone || 'Not provided'}`,
        `Project: ${submission.project_title}`,
        `Location: ${submission.location}`,
        `Timeline: ${submission.timeline}`,
        `Compensation: ${submission.compensation_type} — ${submission.compensation_details}`,
        `Youth count: ${submission.youth_count}`,
        '',
        'Open the operational database for the full submission, including safety/accessibility notes.',
      ].join('\n')

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [notifyAddress],
          subject,
          text,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Opportunity notification email failed:', await emailResponse.text())
      }
    } else {
      console.warn('Opportunity email notification not configured; database record was saved.')
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('Opportunity intake failed:', error)
    return NextResponse.json(
      { error: 'We could not process your submission. Please try again or email info@nwkids.org.' },
      { status: 500 }
    )
  }
}
