'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

interface TimelineEvent {
  year: string
  title: string
  description: string
  highlight?: boolean
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2014',
    title: 'The Beginning',
    description: 'New World Kids was founded with a vision to transform lives in Puerto Vallarta through holistic community programs.',
  },
  {
    year: '2016',
    title: 'Culture Shock Launches',
    description: 'Our flagship life skills program began, providing mentorship and training to underserved youth.',
  },
  {
    year: '2018',
    title: 'Proyecto Índigo Azul',
    description: 'We broke ground on our first food forest, combining environmental education with food security initiatives.',
    highlight: true,
  },
  {
    year: '2020',
    title: 'Community Response',
    description: 'During global challenges, we pivoted to provide emergency food distribution and virtual learning support.',
  },
  {
    year: '2022',
    title: 'Sports Program Expansion',
    description: 'Culture Shock Sports launched, partnering with professional athletes to mentor young people through athletics.',
  },
  {
    year: '2024',
    title: '10 Years of Impact',
    description: 'We celebrated a decade of service, having touched the lives of over 500 children and their families.',
    highlight: true,
  },
]

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-sm font-medium text-blue-900">Our Journey</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            A Decade of Transformation
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Follow our journey from a small idea to a thriving community organization.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 to-amber-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Events */}
          <div className="space-y-12 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } md:py-8`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div
                    className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ${
                      event.highlight ? 'ring-2 ring-blue-100' : ''
                    }`}
                  >
                    <span className={`inline-block text-sm font-bold mb-2 ${
                      event.highlight ? 'text-blue-600' : 'text-amber-600'
                    }`}>
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-600">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ${
                    event.highlight 
                      ? 'bg-blue-600 ring-4 ring-blue-100' 
                      : 'bg-slate-300 ring-4 ring-white'
                  }`} />
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
