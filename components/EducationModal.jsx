import {
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  Github,
  GraduationCap,
  MapPin,
  Medal,
  Rocket,
  Trophy,
} from 'lucide-react'
import DetailsModal from "@/components/DetailsModal"

function educationContent(edu) {
  const meta = []
  if (edu.duration) meta.push({ Icon: Clock, text: edu.duration, iconClass: "text-purple-400" })
  if (edu.location) meta.push({ Icon: MapPin, text: edu.location, iconClass: "text-purple-400" })
  if (edu.remote) meta.push({ Icon: Rocket, text: "Remote", iconClass: "text-emerald-400" })
  if (edu.grade) meta.push({ Icon: Trophy, text: edu.grade, iconClass: "text-amber-400" })

  const lists = []
  if (edu.achievements?.length) {
    lists.push({
      Icon: Trophy,
      title: "Academic Achievements",
      accent: "text-amber-400",
      itemIcon: Medal,
      itemIconClass: "text-amber-400",
      items: edu.achievements,
    })
  }
  if (edu.activities?.length) {
    lists.push({
      Icon: BookOpen,
      title: "Projects & Activities",
      accent: "text-purple-400",
      itemIcon: CheckCircle2,
      itemIconClass: "text-purple-400",
      items: edu.activities,
    })
  }

  const badgeGroups = []
  if (edu.skills?.length) {
    badgeGroups.push({
      Icon: Rocket,
      title: "Skills & Technologies",
      accent: "text-purple-400",
      items: edu.skills,
    })
  }
  if (edu.coursework?.length) {
    badgeGroups.push({
      Icon: GraduationCap,
      title: "Relevant Coursework",
      accent: "text-purple-400",
      items: edu.coursework,
    })
  }

  const links = []
  if (edu.links?.website) links.push({ Icon: Building2, label: "Institution Website", href: edu.links.website })
  if (edu.links?.project) links.push({ Icon: Rocket, label: "Project", href: edu.links.project })
  if (edu.links?.github) links.push({ Icon: Github, label: "GitHub", href: edu.links.github })
  if (edu.links?.certificate) links.push({ Icon: Medal, label: "Certificate", href: edu.links.certificate })

  return {
    label: edu.field,
    title: edu.institution,
    subtitle: edu.degree,
    image: edu.image,
    imageAlt: edu.institution,
    meta,
    description: edu.description,
    lists,
    badgeGroups,
    links,
  }
}

export default function EducationModal({ education, onClose }) {
  return (
    <DetailsModal content={educationContent(education)} onClose={onClose} />
  )
}