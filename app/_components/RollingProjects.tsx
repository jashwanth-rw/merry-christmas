'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  name: string
  description: string
  link: string
}
const menuItems = [
    { name: 'Fortune Cookie', href: 'https://randomwalk.ai/fortunecookie/' },
    { name: 'Chateleon', href: 'https://chateleon.com/' },
    { name: 'Brandcut', href: 'https://randomwalk.ai/brandcut/' },
    { name: 'AI Readiness Index', href: 'https://randomwalk.ai/ai-readiness-index/' },
  ]
const projects: Project[] = [
  { name: "Fortune Cookie", description: "A secure chat-based platform allows employees to perform tasks, search for data, run queries, get alerts, and generate content across numerous enterprise applications.", link: "https://randomwalk.ai/fortunecookie/" },
  { name: "Chateleon", description: "ignite Your Website With you mascots", link: "https://chateleon.com/" },
  { name: "Brandcut", description: "Measure Your Brand Sponsorship Strategy with AI Brand Detection", link: "https://randomwalk.ai/brandcut/" },
  { name: "AI Readiness Index", description: "Discover your AI readiness In just 15 minutes using our AI Readiness & Digital Maturity Assessment Index", link: "https://randomwalk.ai/ai-readiness-index/" },
]

export default function RollingProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-center text-xs font-normal text-gray-400">
          Do checkout our other products
        </p>
      <div className="relative w-full max-w-md h-48 overflow-hidden">
        {projects.map((project, index) => (
          <Link
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            <div className="bg-white shadow-md rounded-lg p-6 h-full flex flex-col justify-start ">
              <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
              <p className="text-gray-400">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

