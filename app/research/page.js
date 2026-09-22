'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import ResearchCard from '@/components/ResearchCard'
import ResearchModal from '@/components/ResearchModal'
import Pagination from '@/components/Pagination'
import { research } from '@/data/research'

const RESEARCH_PER_PAGE = 6

const unique = (values) => [...new Set(values)]

export default function ResearchPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')
  const [area, setArea] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState(null)

  const researchTypes = useMemo(
    () => unique(research.map((r) => r.type).filter(Boolean)),
    []
  )
  const researchStatuses = useMemo(
    () => unique(research.map((r) => r.status).filter(Boolean)),
    []
  )
  const researchAreas = useMemo(
    () => unique(research.flatMap((r) => r.researchAreas || [])),
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return research.filter((r) => {
      if (q) {
        const haystack = [
          r.title,
          r.abstract,
          r.type,
          r.status,
          r.source,
          r.publicationVenue,
          r.doi,
          ...(r.authors || []),
          ...(r.researchAreas || []),
          ...(r.methodologies || []),
          ...(r.tools || []),
          ...(r.datasets || []),
        ]
          .join(" ")
          .toLowerCase()

        if (!haystack.includes(q)) return false
      }

      if (type !== "all" && r.type !== type) return false
      if (status !== "all" && r.status !== status) return false
      if (area !== "all" && !(r.researchAreas || []).includes(area)) return false

      return true
    })
  }, [query, type, status, area])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, type, status, area])

  const totalPages = Math.max(1, Math.ceil(filtered.length / RESEARCH_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * RESEARCH_PER_PAGE
  const paginated = filtered.slice(startIndex, startIndex + RESEARCH_PER_PAGE)

  const hasFilters =
    query.trim() !== "" || type !== "all" || status !== "all" || area !== "all"

  const clearFilters = () => {
    setQuery("")
    setType("all")
    setStatus("all")
    setArea("all")
  }

  const selectClass =
    "w-full sm:w-auto bg-zinc-900 border border-zinc-700 text-zinc-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 [&>option]:bg-zinc-900"

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Research
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-10">
          Research papers, literature reviews, technical investigations, and
          experimental studies across AI and data science.
        </p>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-3 mb-6">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, topic, or keyword..."
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              aria-label="Search research"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selectClass}
              aria-label="Filter by research type"
            >
              <option value="all">All Types</option>
              {researchTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={selectClass}
              aria-label="Filter by research status"
            >
              <option value="all">All Statuses</option>
              {researchStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={selectClass}
              aria-label="Filter by research area"
            >
              <option value="all">All Areas</option>
              {researchAreas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-400">
            Showing{" "}
            <span className="text-white">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "research item" : "research items"}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-sm text-purple-300 hover:text-purple-400 transition-colors duration-300"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {paginated.length > 0 ? (
          <div
            key={`${type}-${status}-${area}-${safePage}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300"
          >
            {paginated.map((item) => (
              <ResearchCard
                key={item.id}
                item={item}
                onSelect={() => setSelected(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-300 text-lg mb-2">No research found</p>
            <p className="text-zinc-500 text-sm">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {selected && (
        <ResearchModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}