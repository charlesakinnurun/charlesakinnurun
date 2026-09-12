'use client'

import { useState } from 'react'
import ExperienceCard from "@/components/ExperienceCard"
import ExperienceModal from "@/components/ExperienceModal"
import Pagination from "@/components/Pagination"
import {
  experiences,
  communityExperiences,
  volunteeringExperiences,
} from "@/data/experience"

const EXPERIENCES_PER_PAGE = 4

export default function ExperienceSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedExperience, setSelectedExperience] = useState(null)

  const totalPages = Math.ceil(experiences.length / EXPERIENCES_PER_PAGE)
  const startIndex = (currentPage - 1) * EXPERIENCES_PER_PAGE
  const paginatedExperiences = experiences.slice(
    startIndex,
    startIndex + EXPERIENCES_PER_PAGE
  )

  return (
    <section className="w-full min-h-screen bg-transparent text-white py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Experience  
        </h2>
        
        
        <div key={currentPage} className="animate-in fade-in duration-300">
          <ExperienceCard experiences={paginatedExperiences} title="" onSelect={setSelectedExperience} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        
        <div className="mt-20">
          <ExperienceCard experiences={communityExperiences} title="Community Building" onSelect={setSelectedExperience} />
        </div>

        <div className="mt-20">
          <ExperienceCard experiences={volunteeringExperiences} title="Volunteering" onSelect={setSelectedExperience} />
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