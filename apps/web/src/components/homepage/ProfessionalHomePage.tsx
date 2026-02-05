'use client'

import { useEffect } from 'react'
import {
  NonprofitHero,
  MissionSection,
  ImpactStats,
  ProjectsShowcase,
  TimelineSection,
  TestimonialsSection,
  DonationCTA,
} from '@/components/homepage'
import { useGSAPScrollTrigger } from '@/lib/gsap-config'

/**
 * Professional Homepage for New World Kids
 * 
 * Design Philosophy:
 * - Clean, trustworthy aesthetic for donor confidence
 * - Clear visual hierarchy following Steve Krug's "Don't Make Me Think"
 * - Smooth scroll animations that enhance without distracting
 * - Mobile-first responsive design
 * - Accessibility-focused interactions
 */
export default function ProfessionalHomePage() {
  // Initialize GSAP ScrollTrigger
  useGSAPScrollTrigger()

  return (
    <main className="relative overflow-x-hidden">
      {/* Hero Section - Make an emotional first impression */}
      <NonprofitHero />

      {/* Mission Section - Explain why we exist */}
      <MissionSection />

      {/* Impact Stats - Show measurable results */}
      <ImpactStats />

      {/* Programs - Showcase what we do */}
      <ProjectsShowcase />

      {/* Timeline - Tell our story */}
      <TimelineSection />

      {/* Testimonials - Social proof */}
      <TestimonialsSection />

      {/* Donation CTA - Clear call to action */}
      <DonationCTA />
    </main>
  )
}
