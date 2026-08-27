'use client'

import {
  NonprofitHero,
  MissionSection,
  ImpactStats,
  ProjectsShowcase,
  DonationCTA,
} from '@/components/homepage'
import { useGSAPScrollTrigger } from '@/lib/gsap-config'

/**
 * New World Kids homepage
 *
 * Clear public story:
 * - The First 12 in Seattle
 * - who we serve and how the model works
 * - four pathways into paid experience and mentorship
 * - measurable participant outcomes
 * - Indigo Azul as proof of concept
 * - a direct partner and donor ask
 */
export default function ProfessionalHomePage() {
  useGSAPScrollTrigger()

  return (
    <main className="relative overflow-x-hidden">
      <NonprofitHero />
      <MissionSection />
      <ImpactStats />
      <ProjectsShowcase />
      <DonationCTA />
    </main>
  )
}
