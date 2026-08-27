'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

function AnimatedStat({ value, suffix = '', prefix = '', label, duration = 2 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(easeOut * value))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tabular-nums">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-lg text-white/70 font-medium">{label}</div>
    </div>
  )
}

export function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: 12, label: 'First 12 participants' },
    { value: 4, label: 'Pathways into opportunity' },
    { value: 1, label: 'Mentor relationship per participant' },
    { value: 1, label: 'Clear next step' },
  ]

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-blue-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="text-sm font-medium text-white/80">What success looks like</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Did they actually move forward?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We will measure whether each participant completed real work, earned income, learned something useful, built a mentor relationship, and left with a stronger next step.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AnimatedStat value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
