'use client'

import { ArrowUpRight, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ProjectCardMedia from "@/components/ProjectCardMedia"
import { getProjectGithubUrl, getProjectLiveUrl, getProjectTags } from '@/lib/projectImages'

const DIFFICULTY_STYLES = {
  Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Hard: "text-red-400 bg-red-500/10 border-red-500/30",
}

const DEFAULT_DIFFICULTY = "Medium"

export const difficultyStyle = (difficulty) =>
  DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES[DEFAULT_DIFFICULTY]

/**
 * Single media sizing shared by the homepage and /projects page so cards
 * are pixel-identical everywhere. Fixed mobile height, natural height on
 * desktop with a floor, 2/5 width beside the card body.
 */
export const PROJECT_CARD_MEDIA_CLASSNAME =
  "h-56 w-full shrink-0 md:h-auto md:min-h-[320px] md:w-2/5"

/**
 * Shared project card. The whole card opens the project modal; external
 * links (live demo / GitHub) stop propagation so they never trigger it.
 *
 * @param {{
 *   project: import('@/lib/projectImages').Project,
 *   onSelect: () => void,
 *   mediaClassName?: string,
 *   showDifficulty?: boolean,
 * }} props
 */
export default function ProjectCard({ project, onSelect, mediaClassName, showDifficulty = false }) {
  const tags = getProjectTags(project)
  const liveUrl = getProjectLiveUrl(project)
  const githubUrl = getProjectGithubUrl(project)

  const openDetails = (event) => {
    event.stopPropagation()
    onSelect()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          // Let nested links/buttons handle their own keys.
          if (event.target.closest('a,button')) return
          event.preventDefault()
          onSelect()
        }
      }}
      aria-label={`View details for ${project.title}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 md:flex-row"
    >
      <ProjectCardMedia
        project={project}
        className={mediaClassName}
        imageClassName="object-cover w-full h-full"
        fill={false}
        width={800}
        height={600}
      />

      <div className="md:w-[90%] p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-3 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
              {project.subtitle && (
                <p className="text-lg text-zinc-400">{project.subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {showDifficulty && (
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full border shrink-0 ${difficultyStyle(project.difficulty)}`}
                >
                  {project.difficulty || DEFAULT_DIFFICULTY}
                </span>
              )}
              <span
                aria-hidden="true"
                className="text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-purple-400"
              >
                <ArrowUpRight className="w-6 h-6" />
              </span>
            </div>
          </div>

          {project.description && (
            <p className="text-sm text-zinc-400 mb-4">{project.description}</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs text-purple-300 bg-purple-900/30 rounded-full transition-colors duration-300 hover:bg-purple-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={openDetails}
            className="inline-flex items-center text-white hover:text-purple-400 transition-colors duration-300"
            aria-label={`View details for ${project.title}`}
          >
            View Project
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center text-xs text-zinc-400 hover:text-white transition-colors duration-300"
                aria-label={`Open live demo for ${project.title} (opens in new tab)`}
              >
                Live Demo
                <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center text-black hover:text-purple-900 transition-colors duration-300"
                aria-label={`GitHub repository for ${project.title} (opens in new tab)`}
              >
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-white" tabIndex={-1}>
                  <Github className="w-4 h-4" />
                  <span className="sr-only">GitHub Repo</span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
