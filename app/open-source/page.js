'use client'

import { useState } from 'react'
import { Github } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ContributionCard from "@/components/ContributionCard"
import Pagination from "@/components/Pagination"
import { openSourceContributions } from "@/data/openSource"

const CONTRIBUTIONS_PER_PAGE = 6

export default function OpenSourcePage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(openSourceContributions.length / CONTRIBUTIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * CONTRIBUTIONS_PER_PAGE
  const paginatedContributions = openSourceContributions.slice(
    startIndex,
    startIndex + CONTRIBUTIONS_PER_PAGE
  )

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Open Source Contributions
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
          Open-source projects, contributions, and experiments in data science,
          machine learning, and software engineering. Building in the open and
          giving back to the developer community.
        </p>

        <div key={currentPage} className="space-y-4 animate-in fade-in duration-300">
          {paginatedContributions.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <div className="mt-16 text-center">
          <Link
            href="https://github.com/charlesakinnurun"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="text-black bg-white border-white hover:bg-black hover:text-white transition-colors duration-300"
            >
              <Github className="mr-2 h-4 w-4" />
              View My GitHub Profile
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}