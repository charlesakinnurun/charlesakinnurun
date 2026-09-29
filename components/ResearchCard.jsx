import { ArrowUpRight, BookOpen, FileText, FlaskConical, Github } from 'lucide-react'
import Image from "next/image"

const statusStyles = {
  Published: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  Preprint: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  "Under Review": "text-blue-400 border-blue-500/30 bg-blue-500/10",
  "In Progress": "text-amber-400 border-amber-500/30 bg-amber-500/10",
}

const statusDots = {
  Published: "bg-emerald-400",
  Preprint: "bg-purple-400",
  "Under Review": "bg-blue-400",
  "In Progress": "bg-amber-400",
}

const MAX_TOPICS = 4

export default function ResearchCard({ item, onSelect }) {
  const statusClass = statusStyles[item.status] || statusStyles.Preprint
  const statusDot = statusDots[item.status] || statusDots.Preprint
  const topics = (item.researchAreas || []).slice(0, MAX_TOPICS)
  const venue = [item.source, item.publicationVenue].filter(Boolean).join(" · ")

  return (
    <div className="bg-zinc-900 rounded-lg p-5 sm:p-6">
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border border-zinc-700/60 bg-zinc-800 flex items-center justify-center overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.title} cover`}
              fill
              sizes="56px"
              className="object-contain rounded-lg p-1.5"
            />
          ) : (
            <FlaskConical className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400">
                {[item.type, item.authors?.join(", "), item.date]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>

            {item.status && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border shrink-0 mt-0.5 ${statusClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                {item.status}
              </span>
            )}
          </div>

          {item.abstract && (
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-3">
              {item.abstract}
            </p>
          )}

          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs text-purple-300 bg-purple-900/30 rounded-full transition-colors duration-300 hover:bg-purple-800/50"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {venue && (
            <p className="text-xs text-zinc-500 mt-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{venue}</span>
            </p>
          )}

          <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onSelect}
              className="inline-flex items-center text-sm text-white hover:text-purple-400 transition-colors duration-300"
              aria-label={`View details for ${item.title}`}
            >
              View Research
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500 transition-all duration-300"
                  aria-label={`GitHub repository for ${item.title}`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {item.paperUrl && (
                <a
                  href={item.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500 transition-all duration-300"
                  aria-label={`Read paper for ${item.title}`}
                >
                  <FileText className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}