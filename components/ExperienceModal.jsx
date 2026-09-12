import {
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Github,
  MapPin,
  Medal,
  Rocket,
  Trophy,
} from 'lucide-react'
import DetailsModal from "@/components/DetailsModal"

function experienceContent(exp) {
  const meta = []
  if (exp.period) meta.push({ Icon: CalendarDays, text: exp.period, iconClass: "text-purple-400" })
  if (exp.duration) meta.push({ Icon: Clock, text: exp.duration, iconClass: "text-purple-400" })
  if (exp.location) meta.push({ Icon: MapPin, text: exp.location, iconClass: "text-purple-400" })
  if (exp.remote) meta.push({ Icon: Rocket, text: "Remote", iconClass: "text-emerald-400" })

  const lists = []
  if (exp.responsibilities?.length) {
    lists.push({
      Icon: Briefcase,
      title: "Key Responsibilities",
      accent: "text-purple-400",
      itemIcon: CheckCircle2,
      itemIconClass: "text-purple-400",
      items: exp.responsibilities,
    })
  }
  if (exp.achievements?.length) {
    lists.push({
      Icon: Trophy,
      title: "Achievements",
      accent: "text-amber-400",
      itemIcon: Medal,
      itemIconClass: "text-amber-400",
      items: exp.achievements,
    })
  }

  const badgeGroups = []
  if (exp.skills?.length) {
    badgeGroups.push({
      Icon: Rocket,
      title: "Skills & Technologies",
      accent: "text-purple-400",
      items: exp.skills,
    })
  }

  const links = []
  if (exp.links?.companyUrl) links.push({ Icon: Building2, label: "Company Website", href: exp.links.companyUrl })
  if (exp.links?.project) links.push({ Icon: Rocket, label: "Project", href: exp.links.project })
  if (exp.links?.github) links.push({ Icon: Github, label: "GitHub", href: exp.links.github })
  if (exp.links?.certificate) links.push({ Icon: Medal, label: "Certificate", href: exp.links.certificate })

  return {
    label: exp.type,
    title: exp.company || exp.community || exp.organization,
    subtitle: exp.role,
    image: exp.logo,
    imageAlt: exp.company || exp.community || exp.organization,
    meta,
    description: exp.description,
    lists,
    badgeGroups,
    links,
  }
}

export default function ExperienceModal({ experience, onClose }) {
  return (
    <DetailsModal content={experienceContent(experience)} onClose={onClose} />
  )
}