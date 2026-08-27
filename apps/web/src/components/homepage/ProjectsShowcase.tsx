'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  category: string
}

const projects: Project[] = [
  {
    id: 'built-for-good',
    title: 'Built for Good',
    description: 'Technology projects that let participants solve a real digital problem for a nonprofit, community group, or social-purpose business.',
    category: 'Technology',
  },
  {
    id: 'beyond-the-game',
    title: 'Beyond the Game',
    description: 'Sports-based opportunities that expose participants to the work around the game, including coaching, media, events, operations, wellness, and content.',
    category: 'Sports',
  },
  {
    id: 'ground-up',
    title: 'Ground Up',
    description: 'Hands-on work in urban gardening and food systems, including projects shaped by what we learned through Proyecto Indigo Azul.',
    category: 'Urban Gardening + Food Systems',
  },
  {
    id: 'make-your-mark',
    title: 'Make Your Mark',
    description: 'Community art projects built around restoration, design, creation, and visible work participants can point to when the project is finished.',
    category: 'Art',
  },
]

export function ProjectsShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pathways" ref={ref} className="relative py-32 bg-slate-50 overflow-hidden scroll-mt-20">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full translate-x-1/2 opacity-60" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-amber-100 rounded-full -translate-x-1/2 opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-sm font-medium text-slate-700">Four pathways</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Four ways to start. One goal.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            These are four entry points into the same youth-development model: paid opportunities, an experienced mentor, and a clear next step.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className={`h-3 bg-gradient-to-r ${
                index === 0 ? 'from-blue-500 to-indigo-600' :
                index === 1 ? 'from-orange-400 to-red-600' :
                index === 2 ? 'from-emerald-400 to-teal-600' :
                'from-purple-400 to-pink-600'
              }`} />

              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-sm font-bold tracking-widest text-amber-600">0{index + 1}</span>
                  <span className="px-3 py-1 bg-slate-100 text-xs font-semibold text-slate-700 rounded-full text-right">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 border-t border-slate-200 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-widest text-blue-900 uppercase mb-3">Partner with us</p>
            <p className="text-xl text-slate-700 leading-relaxed">
              Bring us a real project, mentor, site, or opportunity where one of the First 12 can contribute useful work.
            </p>
          </div>
          <Link
            href="mailto:info@nwkids.org"
            className="inline-flex shrink-0 items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-blue-900 rounded-full hover:bg-blue-800 transition-colors"
          >
            Bring us an opportunity
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
