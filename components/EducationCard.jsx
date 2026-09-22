'use client'

import Image from 'next/image'
import { GraduationCap } from 'lucide-react'

export default function EducationCard({ title, entries }) {
  return (
    <div className="space-y-8">
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">{title}</h2>
      )}
      {entries.map((edu) => {
        const logo = edu.logo || edu.image
        return (
          <div
            key={edu.id}
            className="bg-zinc-900 rounded-lg p-5 sm:p-6"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border border-zinc-700/60 bg-zinc-800 overflow-hidden flex items-center justify-center">
                {logo ? (
                  <Image
                    src={logo}
                    alt={`${edu.institution} logo`}
                    className="object-contain rounded-lg p-1.5"
                    fill
                    sizes="56px"
                  />
                ) : (
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {edu.institution}
                </h3>
                {(edu.field || edu.degree) && (
                  <p className="mt-0.5 text-sm sm:text-base text-zinc-400">
                    {edu.field || edu.degree}
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