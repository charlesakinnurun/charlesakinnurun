import { ArrowUpRight, Building2, CheckCircle2, Gauge, Github, Lightbulb, ListChecks, Tags, Trophy, UserRound } from 'lucide-react'
import DetailsModal from '@/components/DetailsModal'
import ProjectGallery from '@/components/ProjectGallery'
import { getProjectGithubUrl, getProjectImage, getProjectLiveUrl, getProjectTags } from '@/lib/projectImages'

function ExtraSection({ icon: Icon, title, accent, children }) {
  return (
    <section>
      <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${accent}`}>
        <Icon className="w-4 h-4" />
        {title}
      </h4>
      {children}
    </section>
  )
}

/**
 * Optional showcase sections. Every field is optional and data-driven —
 * sections with no data render nothing, and nothing is invented here.
 */
function ProjectExtras({ project }) {
  const features = Array.isArray(project.features)
    ? project.features.filter((f) => typeof f === 'string' && f.trim())
    : []

  if (!project.problem && features.length === 0 && !project.contribution && !project.results) {
    return null
  }

  return (
    <>
      {project.problem && (
        <ExtraSection icon={Lightbulb} title="Problem & Motivation" accent="text-amber-400">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.problem}
          </p>
        </ExtraSection>
      )}

      {features.length > 0 && (
        <ExtraSection icon={ListChecks} title="Key Features" accent="text-cyan-400">
          <ul className="space-y-2.5">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-sm text-zinc-300 leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                {feature}
              </li>
            ))}
          </ul>
        </ExtraSection>
      )}

      {project.contribution && (
        <ExtraSection icon={UserRound} title="My Contribution" accent="text-purple-400">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.contribution}
          </p>
        </ExtraSection>
      )}

      {project.results && (
        <ExtraSection icon={Trophy} title="Results & Impact" accent="text-emerald-400">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.results}
          </p>
        </ExtraSection>
      )}
    </>
  )
}

function projectContent(project) {
  const meta = []
  if (project.category) {
    meta.push({ Icon: Tags, text: project.category, iconClass: "text-cyan-400" })
  }
  if (project.difficulty) {
    meta.push({ Icon: Gauge, text: `Difficulty: ${project.difficulty}`, iconClass: "text-amber-400" })
  }
  if (project.subtitle) {
    meta.push({ Icon: Building2, text: project.subtitle, iconClass: "text-purple-400" })
  }

  const tags = getProjectTags(project)
  const lists = []
  if (tags.length) {
    lists.push({
      Icon: Tags,
      title: "Technologies & Tools",
      accent: "text-purple-400",
      itemIcon: CheckCircle2,
      itemIconClass: "text-purple-400",
      items: tags,
    })
  }

  const liveUrl = getProjectLiveUrl(project)
  const githubUrl = getProjectGithubUrl(project)
  const links = []
  if (liveUrl) {
    links.push({
      Icon: ArrowUpRight,
      label: project.liveUrl ? "Live Demo" : "View Project",
      href: liveUrl,
    })
  }
  if (githubUrl) links.push({ Icon: Github, label: "View Code", href: githubUrl })

  return {
    label: project.category || "Project",
    title: project.title,
    subtitle: project.subtitle,
    image: getProjectImage(project),
    imageAlt: project.title,
    meta,
    description: project.description,
    lists,
    badgeGroups: [],
    links,
  }
}

export default function ProjectModal({ project, onClose }) {
  return (
    <DetailsModal content={projectContent(project)} onClose={onClose}>
      <ProjectGallery project={project} />
      <ProjectExtras project={project} />
    </DetailsModal>
  )
}
