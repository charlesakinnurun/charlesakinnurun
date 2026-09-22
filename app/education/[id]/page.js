import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Medal,
  Rocket,
  Trophy,
} from 'lucide-react'
import { education } from "@/data/education"

const metaClass =
  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-full border border-zinc-700"

const chipClass =
  "px-2.5 py-1 text-xs font-medium text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-md"

export function generateStaticParams() {
  return education.map((edu) => ({ id: edu.id }))
}

export default async function EducationDetailsPage({ params }) {
  const { id } = await params
  const edu = education.find((item) => item.id === id)

  if (!edu) {
    notFound()
  }

  const meta = []
  if (edu.location) meta.push({ Icon: MapPin, text: edu.location, iconClass: "text-purple-400" })
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

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/education"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-purple-400 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Education
        </Link>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-purple-500/10 overflow-hidden">
          <header className="flex items-start gap-4 p-5 sm:p-6 border-b border-zinc-800">
            <div className="relative w-14 h-14 shrink-0 rounded-xl border border-zinc-700/60 bg-zinc-800 overflow-hidden flex items-center justify-center">
              {edu.logo || edu.image ? (
                <Image
                  src={edu.logo || edu.image}
                  alt={`${edu.institution} logo`}
                  className="object-contain rounded-xl p-1"
                  fill
                />
              ) : (
                <Building2 className="w-6 h-6 text-purple-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {edu.field && (
                <p className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">
                  {edu.field}
                </p>
              )}
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {edu.institution}
              </h1>
              {edu.degree && (
                <p className="text-sm sm:text-base text-zinc-400 mt-0.5">{edu.degree}</p>
              )}
            </div>
          </header>

          <div className="p-5 sm:p-6 space-y-6">
            {meta.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {meta.map(({ Icon, text, iconClass }, index) => (
                  <span key={index} className={metaClass}>
                    <Icon className={`w-3.5 h-3.5 ${iconClass || "text-purple-400"}`} />
                    {text}
                  </span>
                ))}
              </div>
            )}

            {edu.description && (
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {edu.description}
              </p>
            )}

            {lists.map(({ Icon, title, accent, itemIcon: ItemIcon, itemIconClass, items }) => (
              <section key={title}>
                <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${accent}`}>
                  <Icon className="w-4 h-4" />
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-sm text-zinc-300 leading-relaxed"
                    >
                      <ItemIcon className={`w-4 h-4 mt-0.5 shrink-0 ${itemIconClass}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {badgeGroups.map(({ Icon, title, accent, items }) => (
              <section key={title}>
                <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${accent}`}>
                  <Icon className="w-4 h-4" />
                  {title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <span key={index} className={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ))}

            {edu.links?.website && (
              <div className="flex flex-wrap gap-3 pt-2 border-t border-zinc-800">
                <a
                  href={edu.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-zinc-800 hover:bg-purple-600 hover:text-white border border-zinc-700 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <Building2 className="w-4 h-4" />
                  Institution Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}