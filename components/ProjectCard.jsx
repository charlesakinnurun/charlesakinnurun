'use client'

import { useState } from 'react'
import { CalendarDays, Github } from 'lucide-react'
import { getProjectGithubUrl, getProjectTags } from '@/lib/projectImages'

/**
 * @deprecated Difficulty badges removed — Projects now match the minimal
 * Education/Experience layout. Kept so existing imports don't break.
 */
export const difficultyStyle = () => ""

/**
 * @deprecated Media panel removed — cards are now full-width content only.
 * Kept so existing imports of PROJECT_CARD_MEDIA_CLASSNAME don't break.
 */
export const PROJECT_CARD_MEDIA_CLASSNAME = ""

function getProjectDate(project) {
  if (!project) return null
  const date =
    project.date ?? project.year ?? project.period ?? project.duration ?? null
  return typeof date === 'number' ? String(date) : date?.toString().trim() || null
}

/**
 * Minimal project card, consistent with Education/Experience sections.
 * Displays only: title, short description with See more toggle, tech stack
 * tags, date, and GitHub icon link.
 *
 * @param {{
 *   project: import('@/lib/projectImages').Project,
 * }} props
 */
export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)
  const tags = getProjectTags(project)
  const date = getProjectDate(project)
  const githubUrl = getProjectGithubUrl(project)
  const isLongDescription =
    typeof project.description === 'string' && project.description.length > 140

  return (
    <div className="bg-zinc-900 rounded-lg p-5 sm:p-6 transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex-1 min-w-0 text-xl sm:text-2xl font-bold text-white leading-snug break-words">
            {project.title}
          </h3>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title} (opens in new tab)`}
              className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-700/60 bg-zinc-800 text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>

        {project.description && (
          <div className="mt-0.5">
            <p
              className={`text-sm sm:text-base text-zinc-400 break-words ${expanded ? '' : 'line-clamp-2'}`}
            >
              {project.description}
            </p>
            {isLongDescription && (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-1 text-xs text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {expanded ? 'See less' : 'See more'}
              </button>
            )}
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs text-zinc-300 bg-zinc-800 border border-zinc-700/60 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {date && (
          <p className="mt-1.5 text-sm text-zinc-500 flex items-center gap-1.5 min-w-0">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{date}</span>
          </p>
        )}
      </div>
    </div>
  )
}
