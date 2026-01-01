"use client";

import { useState } from "react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "milestone" | "achievement" | "impact" | "community";
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2023-01-15",
    title: "Project Launch",
    description: "Proyecto Indigo Azul officially launches in Mexico City, partnering with local schools to introduce sustainable grow tower technology.",
    category: "milestone",
  },
  {
    id: "2",
    date: "2023-03-20",
    title: "First Tower Assembly Workshop",
    description: "50 students participate in assembling their first grow towers from recycled plastic bottles.",
    category: "achievement",
  },
  {
    id: "3",
    date: "2023-06-10",
    title: "Community Garden Established",
    description: "The first community garden powered by youth-built grow towers feeds 30 families.",
    category: "impact",
  },
  {
    id: "4",
    date: "2023-09-05",
    title: "Youth Leadership Training",
    description: "15 young leaders trained to teach grow tower assembly in their communities.",
    category: "community",
  },
  {
    id: "5",
    date: "2024-01-20",
    title: "Expansion to 5 Cities",
    description: "Proyecto Indigo Azul expands to Guadalajara, Monterrey, Puebla, and Tijuana.",
    category: "milestone",
  },
  {
    id: "6",
    date: "2024-06-15",
    title: "1,000 Towers Built",
    description: "Major milestone achieved: 1,000 grow towers built by youth across Mexico.",
    category: "achievement",
  },
  {
    id: "7",
    date: "2024-09-30",
    title: "UN Recognition",
    description: "Proyecto Indigo Azul recognized by UN Sustainable Development Goals initiative.",
    category: "impact",
  },
];

const categoryColors = {
  milestone: "bg-blue-500",
  achievement: "bg-green-500",
  impact: "bg-purple-500",
  community: "bg-orange-500",
};

const categoryLabels = {
  milestone: "Milestone",
  achievement: "Achievement",
  impact: "Impact",
  community: "Community",
};

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = selectedCategory
    ? timelineEvents.filter((event) => event.category === selectedCategory)
    : timelineEvents;

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proyecto Indigo Azul
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            Follow our journey empowering youth through sustainable technology
          </p>
        </header>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-white text-slate-900"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            All Events
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === key
                  ? "bg-white text-slate-900"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo-500/30 transform md:-translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row gap-4 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Date Marker */}
                <div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full ${
                    categoryColors[event.category]
                  } transform -translate-x-1/2 ring-4 ring-slate-900 z-10`}
                />

                {/* Content Card */}
                <div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium text-white ${
                          categoryColors[event.category]
                        }`}
                      >
                        {categoryLabels[event.category]}
                      </span>
                      <time className="text-sm text-indigo-300">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-300">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Be Part of Our Story
          </h2>
          <p className="text-indigo-200 mb-6 max-w-xl mx-auto">
            Your support helps us empower more youth and communities with
            sustainable technology.
          </p>
          <a
            href="/donate"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Donate Now
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
