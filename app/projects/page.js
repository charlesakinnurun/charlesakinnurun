'use client'

import { useState } from 'react'
import Pagination from "@/components/Pagination"
import ProjectCard, { PROJECT_CARD_MEDIA_CLASSNAME } from "@/components/ProjectCard"
import ProjectModal from "@/components/ProjectModal"
import { projects } from "@/data/projects"

const PROJECTS_PER_PAGE = 6

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState(null)

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE)

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
           My Projects
          </h2>
        <div key={currentPage} className="space-y-12 animate-in fade-in duration-300">
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.id ?? project.title}
              project={project}
              onSelect={() => setSelected(project)}
              mediaClassName={PROJECT_CARD_MEDIA_CLASSNAME}
              showDifficulty
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}

