'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Building2, CalendarDays } from 'lucide-react'

function LogoBox({ logo, company }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border border-zinc-700/60 light:border-zinc-200 bg-zinc-800 light:bg-zinc-100 overflow-hidden flex items-center justify-center">
      {logo && !failed ? (
        <Image
          src={logo}
          alt={`${company} logo`}
          className="object-contain rounded-lg p-1.5"
          fill
          sizes="56px"
          onError={() => setFailed(true)}
        />
      ) : (
        <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 light:text-purple-700" />
      )}
    </div>
  )
}

/**
 * Minimal static experience list: logo, company, role, period.
 * Deliberately non-interactive — no hover effects, no click, no modal.
 * Every card is a fixed, uniform size: all text lines truncate to one line
 * and a min-height guard covers entries missing optional fields.
 */
export default function ExperienceCard({ title, experiences }) {
  return (
    <div className="space-y-8">
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-zinc-900 mb-10">{title}</h2>
      )}
      {experiences.map((exp) => {
        const company = exp.company || exp.community || exp.organization
        return (
          <div
            key={exp.id}
            className="bg-zinc-900 light:bg-white light:ring-1 light:ring-zinc-900/10 light:shadow-sm rounded-lg p-5 sm:p-6 min-h-[120px] sm:min-h-[132px]"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <LogoBox logo={exp.logo} company={company} />

              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white light:text-zinc-900 leading-snug truncate">
                  {company}
                </h3>
                {exp.role && (
                  <p className="mt-0.5 text-sm sm:text-base text-zinc-400 light:text-zinc-600 truncate">
                    {exp.role}
                  </p>
                )}
                {exp.period && (
                  <p className="mt-1.5 text-sm text-zinc-500 flex items-center gap-1.5 min-w-0">
                    <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{exp.period}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
