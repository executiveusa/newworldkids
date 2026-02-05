'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  link: string
}

const projects: Project[] = [
  {
    id: 'indigo-azul',
    title: 'Proyecto Índigo Azul',
    description: 'A regenerative food forest providing fresh produce, environmental education, and sustainable living skills to families in Puerto Vallarta.',
    image: '/images/projects/indigo-azul.jpg',
    category: 'Food Security',
    link: '/impact/indigo-azul',
  },
  {
    id: 'culture-shock',
    title: 'Culture Shock Program',
    description: 'Life skills training and mentorship for youth, covering financial literacy, communication, leadership, and career readiness.',
    image: '/images/projects/culture-shock.jpg',
    category: 'Education',
    link: '/impact/culture-shock',
  },
  {
    id: 'culture-shock-sports',
    title: 'Culture Shock Sports',
    description: 'Athletic programs pairing professional athletes with young mentees to build discipline, teamwork, and healthy lifestyles.',
    image: '/images/projects/sports.jpg',
    category: 'Athletics',
    link: '/impact/culture-shock-sports',
  },
  {
    id: 'minority-report',
    title: 'The Real Minority Report',
    description: 'A community newspaper giving voice to underrepresented stories and training youth in journalism and media production.',
    image: '/images/projects/minority-report.jpg',
    category: 'Media',
    link: '/impact/minority-report',
  },
]

export function ProjectsShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-32 bg-slate-50 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full translate-x-1/2 opacity-60" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-amber-100 rounded-full -translate-x-1/2 opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-sm font-medium text-slate-700">Our Programs</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Programs That Transform
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Each program addresses a specific need in our community, working together 
            to provide comprehensive support for children and families.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10" />
                {/* Placeholder gradient when no image */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  index === 0 ? 'from-emerald-400 to-teal-600' :
                  index === 1 ? 'from-blue-400 to-indigo-600' :
                  index === 2 ? 'from-orange-400 to-red-600' :
                  'from-purple-400 to-pink-600'
                }`} />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-white/30 text-6xl font-bold">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                <Link
                  href={project.link}
                  className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                >
                  Learn more
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/impact"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-slate-700 border-2 border-slate-300 rounded-full hover:border-blue-900 hover:text-blue-900 transition-colors"
          >
            View All Programs
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
