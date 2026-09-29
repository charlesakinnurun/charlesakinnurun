import { ArrowUpRight, Building2, CheckCircle2, Gauge, Github, Tags } from 'lucide-react'
import DetailsModal from '@/components/DetailsModal'
import ProjectGallery from '@/components/ProjectGallery'
import { getProjectImage } from '@/lib/projectImages'

function projectContent(project) {
  const meta = []
  if (project.difficulty) {
    meta.push({ Icon: Gauge, text: `Difficulty: ${project.difficulty}`, iconClass: "text-amber-400" })
  }
  if (project.subtitle) {
    meta.push({ Icon: Building2, text: project.subtitle, iconClass: "text-purple-400" })
  }

  const lists = []
  if (project.tags?.length) {
    lists.push({
      Icon: Tags,
      title: "Technologies & Tools",
      accent: "text-purple-400",
      itemIcon: CheckCircle2,
      itemIconClass: "text-purple-400",
      items: project.tags,
    })
  }

  const links = []
  if (project.link) links.push({ Icon: ArrowUpRight, label: "View Project", href: project.link })
  if (project.github) links.push({ Icon: Github, label: "View Code", href: project.github })

  return {
    label: "Project",
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
    </DetailsModal>
  )
}
