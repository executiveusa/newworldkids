'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function MissionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-sm font-medium text-blue-900">How the First 12 works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-8"
          >
            Start with what a young person already cares about.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl"
          >
            Many inner-city youth have talent and positive interests. What they often lack is a real chance to turn those interests into experience, income, and a clear next step. The First 12 is focused on young people who may have experienced juvenile court involvement, foster care, homelessness, or limited access to opportunity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            {[
              {
                number: '01',
                title: 'Match the interest',
                description: 'We start with technology, sports, food systems, art, or another interest the participant already has.',
              },
              {
                number: '02',
                title: 'Add a mentor and project',
                description: 'Each participant is connected to an experienced person and a real community project where their contribution matters.',
              },
              {
                number: '03',
                title: 'Build the next step',
                description: 'The goal is paid experience, completed work, a mentor relationship, and a clearer path into work, school, training, or another opportunity.',
              },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8 text-left hover:bg-slate-100 transition-colors duration-300"
              >
                <div className="text-sm font-bold tracking-widest text-amber-600 mb-6">{pillar.number}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 border-t border-slate-200 pt-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start"
          >
            <div>
              <p className="text-sm font-bold tracking-widest text-blue-900 uppercase">Where it started</p>
              <h3 className="mt-3 text-3xl font-bold text-slate-900">Proyecto Indigo Azul</h3>
              <p className="mt-2 text-slate-500">Puerto Vallarta, Mexico</p>
            </div>
            <div className="text-lg leading-8 text-slate-600">
              <p>
                Our Indigo Azul Project in rural Puerto Vallarta gave us a chance to see what happens when youth are given meaningful work and a chance to contribute.
              </p>
              <p className="mt-4">
                Seattle has different challenges, but the idea is the same: connect a young person's interests to real opportunities and people who can help them grow.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
