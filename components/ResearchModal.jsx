import {
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Database,
  FileText,
  FlaskConical,
  Github,
  Link2,
  Target,
  Trophy,
  Wrench,
} from 'lucide-react'
import DetailsModal from "@/components/DetailsModal"

function researchContent(item) {
  const meta = []
  if (item.date) meta.push({ Icon: CalendarDays, text: item.date, iconClass: "text-purple-400" })
  if (item.status) meta.push({ Icon: BadgeCheck, text: item.status, iconClass: "text-emerald-400" })
  if (item.source) meta.push({ Icon: BookOpen, text: item.source, iconClass: "text-cyan-400" })
  if (item.publicationVenue) meta.push({ Icon: Building2, text: item.publicationVenue, iconClass: "text-amber-400" })
  if (item.doi) meta.push({ Icon: Link2, text: item.doi, iconClass: "text-sky-400" })

  const lists = []
  if (item.findings) {
    lists.push({
      Icon: Trophy,
      title: "Key Findings / Results",
      accent: "text-amber-400",
      itemIcon: CheckCircle2,
      itemIconClass: "text-amber-400",
      items: Array.isArray(item.findings) ? item.findings : [item.findings],
    })
  }
  if (item.methodologies?.length) {
    lists.push({
      Icon: FlaskConical,
      title: "Methodologies & Techniques",
      accent: "text-purple-400",
      itemIcon: CheckCircle2,
      itemIconClass: "text-purple-400",
      items: item.methodologies,
    })
  }
  if (item.datasets?.length) {
    lists.push({
      Icon: Database,
      title: "Datasets",
      accent: "text-cyan-400",
      itemIcon: Database,
      itemIconClass: "text-cyan-400",
      items: item.datasets,
    })
  }

  const badgeGroups = []
  if (item.researchAreas?.length) {
    badgeGroups.push({
      Icon: Target,
      title: "Research Areas",
      accent: "text-purple-400",
      items: item.researchAreas,
    })
  }
  if (item.tools?.length) {
    badgeGroups.push({
      Icon: Wrench,
      title: "Tools & Technologies",
      accent: "text-emerald-400",
      items: item.tools,
    })
  }

  const links = []
  if (item.doi) links.push({ Icon: Link2, label: "DOI", href: `https://doi.org/${item.doi}` })
  if (item.githubUrl) links.push({ Icon: Github, label: "View Code", href: item.githubUrl })
  if (item.paperUrl) links.push({ Icon: FileText, label: "Read Paper", href: item.paperUrl })

  return {
    label: item.type,
    title: item.title,
    subtitle: (item.authors || []).join(", "),
    image: item.image || null,
    imageAlt: item.title,
    meta,
    description: item.abstract,
    lists,
    badgeGroups,
    links,
  }
}

export default function ResearchModal({ item, onClose }) {
  return (
    <DetailsModal content={researchContent(item)} onClose={onClose} />
  )
}