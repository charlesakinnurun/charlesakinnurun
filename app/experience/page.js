'use client'

import { useState } from 'react'
import ExperienceCard from "@/components/ExperienceCard"
import Pagination from "@/components/Pagination"
import {
  experiences,
  communityExperiences,
  volunteeringExperiences,
} from "@/data/experience"

const EXPERIENCES_PER_PAGE = 5

export default function ExperienceSection() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(experiences.length / EXPERIENCES_PER_PAGE)
  const startIndex = (currentPage - 1) * EXPERIENCES_PER_PAGE
  const paginatedExperiences = experiences.slice(
    startIndex,
    startIndex + EXPERIENCES_PER_PAGE
  )

  return (
    <section className="min-h-screen bg-transparent text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
           Experience
        </h2>


        <div key={currentPage} className="animate-in fade-in duration-300">
          <ExperienceCard experiences={paginatedExperiences} title="" />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <div className="mt-20">
          <ExperienceCard experiences={communityExperiences} title="Community Building" />
        </div>

        <div className="mt-20">
          <ExperienceCard experiences={volunteeringExperiences} title="Organization" />
        </div>
      </div>
    </section>
  )
}
