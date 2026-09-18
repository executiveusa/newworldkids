import type { Metadata } from 'next'
import OpportunityForm from './OpportunityForm'

type OpportunityPageProps = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Provide a Project | New World Kids',
  description:
    'Submit a real project, paid opportunity, community-service project, or sponsored learning opportunity for the First 12.',
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const { locale } = await params
  return <OpportunityForm locale={locale} />
}
