import { ArrowUpRight, GitPullRequest, Github } from 'lucide-react'
import { Card } from "@/components/ui/card"
import Image from 'next/image'
import Link from "next/link"

const statusStyles = {
  Merged: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  Open: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  Closed: "text-red-400 border-red-500/30 bg-red-500/10",
  Draft: "text-zinc-400 border-zinc-500/30 bg-zinc-500/10",
}

const dotStyles = {
  Merged: "bg-purple-400",
  Open: "bg-emerald-400",
  Closed: "bg-red-400",
  Draft: "bg-zinc-400",
}

function formatDate(iso) {
  if (!iso) return ""
  const [year, month] = iso.split("-")
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  return `${months[Number(month) - 1]} ${year}`
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export default function ContributionCard({ contribution }) {
  const status = contribution.prStatus || "Open"

  return (
    <Card className="group bg-transparent hover:bg-[#242424] border-zinc-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5 p-6">
      <div className="flex items-start gap-5">
        <div className="relative w-14 h-14 shrink-0 rounded-lg border border-zinc-700/60 bg-zinc-800 overflow-hidden flex items-center justify-center">
          {contribution.organizationLogo ? (
            <Image
              src={contribution.organizationLogo}
              alt={`${contribution.organization} logo`}
              fill
              className="object-contain rounded-lg p-1"
            />
          ) : (
            <span className="text-sm font-bold text-purple-300">
              {getInitials(contribution.organization)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white leading-tight mb-1 truncate">
                {contribution.repo}
              </h3>
              <p className="text-sm text-zinc-400 truncate">
                <Github className="w-3.5 h-3.5 inline-block mb-0.5 mr-1" />
                {contribution.organization} · {contribution.contributionType}
                {contribution.prNumber ? ` · PR #${contribution.prNumber}` : ""} ·{" "}
                {formatDate(contribution.date)}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border shrink-0 mt-0.5 ${
                statusStyles[status] || statusStyles.Open
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  dotStyles[status] || dotStyles.Open
                }`}
              />
              {status}
            </span>
          </div>

          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            {contribution.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {contribution.tech.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs text-zinc-300 bg-zinc-800 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-3">
            <Link
              href={contribution.prUrl || contribution.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-white hover:text-purple-400 transition-colors duration-300"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              View Contribution
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}