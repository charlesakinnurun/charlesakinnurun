'use client'

import { useState } from 'react'
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import EducationCard from "@/components/EducationCard"
import EducationModal from "@/components/EducationModal"
import { education } from "@/data/education"

const PREVIEW_COUNT = 3

export default function EducationSection() {
  const [selectedEducation, setSelectedEducation] = useState(null)

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Education
        </h2>

        <EducationCard
          entries={education.slice(0, PREVIEW_COUNT)}
          onSelect={setSelectedEducation}
        />

        <div className="mt-12 text-center">
          <Link href="/education">
            <Button
              variant="outline"
              size="lg"
              className="text-black bg-white border-white hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Education
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {selectedEducation && (
        <EducationModal
          education={selectedEducation}
          onClose={() => setSelectedEducation(null)}
        />
      )}
    </section>
  )
}