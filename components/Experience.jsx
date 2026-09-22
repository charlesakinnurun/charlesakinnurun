'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ExperienceCard from "@/components/ExperienceCard"
import ExperienceModal from "@/components/ExperienceModal"
import { experiences } from "@/data/experience"

const PREVIEW_COUNT = 3

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null)

  const previewExperiences = experiences.slice(0, PREVIEW_COUNT)

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Experience
        </h2>

        <ExperienceCard
          experiences={previewExperiences}
          title=""
          onSelect={setSelectedExperience}
        />

        <div className="mt-12 text-center">
          <Link href="/experience">
            <Button
              variant="outline"
              size="lg"
              className="text-black bg-white border-white hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Experience
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  )
}
