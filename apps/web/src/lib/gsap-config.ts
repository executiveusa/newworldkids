'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * GSAP Animation Configurations for Professional Nonprofit Site
 * Following Steve Krug's "Don't Make Me Think" - animations should enhance, not distract
 */

// Smooth fade-in animation for sections
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

// Stagger animation for children
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Counter animation for impact stats
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  duration: number = 2,
  prefix: string = '',
  suffix: string = ''
) {
  const obj = { value: 0 }
  
  gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true,
    },
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`
    },
  })
}

// Parallax effect for backgrounds
export function createParallax(element: HTMLElement, speed: number = 0.5) {
  gsap.to(element, {
    yPercent: -speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Text reveal animation
export function revealText(element: HTMLElement, delay: number = 0) {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
      clipPath: 'inset(100% 0% 0% 0%)',
    },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true,
      },
    }
  )
}

// Section pin animation for storytelling
export function pinSection(trigger: HTMLElement, pin: HTMLElement, scrubDuration: number = 1) {
  ScrollTrigger.create({
    trigger,
    pin,
    start: 'top top',
    end: `+=${scrubDuration * 100}%`,
    scrub: 1,
  })
}

// Hook to initialize GSAP ScrollTrigger
export function useGSAPScrollTrigger() {
  useEffect(() => {
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}

// Clean up all ScrollTriggers
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export { gsap, ScrollTrigger }
