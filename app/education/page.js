'use client'

import { useState } from 'react'
import EducationCard from "@/components/EducationCard"
import EducationModal from "@/components/EducationModal"
import Pagination from "@/components/Pagination"
import { education } from "@/data/education"

const EDUCATION_PER_PAGE = 6

export default function EducationPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEducation, setSelectedEducation] = useState(null)

  const totalPages = Math.ceil(education.length / EDUCATION_PER_PAGE)
  const startIndex = (currentPage - 1) * EDUCATION_PER_PAGE
  const paginatedEducation = education.slice(
    startIndex,
    startIndex + EDUCATION_PER_PAGE
  )

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Education
        </h2>

        <div key={currentPage} className="animate-in fade-in duration-300">
          <EducationCard
            entries={paginatedEducation}
            onSelect={setSelectedEducation}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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