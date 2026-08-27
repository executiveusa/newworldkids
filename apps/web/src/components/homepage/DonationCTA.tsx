'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const donationTiers = [
  {
    amount: 25,
    impact: 'Helps cover transportation or basic project supplies',
    popular: false,
  },
  {
    amount: 50,
    impact: 'Helps cover sports, art, gardening, or technology materials',
    popular: false,
  },
  {
    amount: 100,
    impact: 'Helps fund participant wages for paid project work',
    popular: true,
  },
  {
    amount: 250,
    impact: 'Supports participant wages plus project materials',
    popular: false,
  },
  {
    amount: 500,
    impact: 'Helps sponsor a First 12 paid opportunity',
    popular: false,
  },
]

export function DonationCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="support"
      ref={ref}
      className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="text-sm font-medium text-white/80">Help prove the First 12</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Fund the opportunity around the young person.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Donations help cover participant wages, transportation, project materials, equipment, mentor support, and the coordination it takes to keep each opportunity moving.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12"
        >
          {donationTiers.map((tier, index) => (
            <motion.div
              key={tier.amount}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border-2 transition-all duration-300 hover:bg-white/20 ${
                tier.popular
                  ? 'border-amber-400 ring-2 ring-amber-400/20'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-amber-400 text-blue-900 text-xs font-bold rounded-full">
                    Popular
                  </span>
                </div>
              )}
              <div className="text-4xl font-bold text-white mb-3">${tier.amount}</div>
              <p className="text-white/70 text-sm leading-6">{tier.impact}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/donate"
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-blue-900 bg-white rounded-full hover:bg-amber-50 transition-all duration-300 shadow-2xl hover:shadow-white/20"
          >
            Support the First 12
          </Link>

          <div className="mt-8 max-w-3xl mx-auto text-sm leading-6 text-white/60">
            <p>
              Donations are processed through our fiscal sponsor, Humanitarian Social Innovations. If your receipt lists Humanitarian Social Innovations, that is correct. Please reference "NEW WORLD KIDS."
            </p>
            <p className="mt-3">
              New World Kids is a fiscally sponsored project. Donations are tax-deductible to the extent allowed by law.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
