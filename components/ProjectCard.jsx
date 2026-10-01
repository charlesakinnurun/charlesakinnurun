import { ArrowUpRight, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
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
 * @deprecated Media panel removed — cards are now full-width content only.
 * Kept so existing imports of PROJECT_CARD_MEDIA_CLASSNAME don't break.
 */
export const PROJECT_CARD_MEDIA_CLASSNAME = ""

/**
 * Shared project card (full-width content, no image/media panel).
 * Static — no modal. External links (live demo / GitHub) open in a new tab.
 *
 * @param {{
 *   project: import('@/lib/projectImages').Project,
 *   showDifficulty?: boolean,
 * }} props
 */
export default function ProjectCard({ project, showDifficulty = false }) {
  const tags = getProjectTags(project)
  const liveUrl = getProjectLiveUrl(project)
  const githubUrl = getProjectGithubUrl(project)
  const hasLinks = Boolean(liveUrl || githubUrl)

  return (
    <div
      className="overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
    >
      <div className="w-full p-5 md:p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-3 mb-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
              {project.subtitle && (
                <p className="text-base text-zinc-400">{project.subtitle}</p>
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
            </div>
          </div>

          {project.description && (
            <p className="text-sm text-zinc-400 mb-3">{project.description}</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
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

        {hasLinks && (
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
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
        )}
      </div>
    </div>
  )
}
