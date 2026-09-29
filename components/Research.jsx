'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ResearchCard from '@/components/ResearchCard'
import ResearchModal from '@/components/ResearchModal'
import { research } from '@/data/research'

const PREVIEW_COUNT = 3

export default function Research() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Research
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-10">
          Research papers, technical investigations, and experimental studies
          across machine learning, natural language processing, and AI systems.
        </p>

        <div className="space-y-8">
          {research.slice(0, PREVIEW_COUNT).map((item) => (
            <ResearchCard
              key={item.id}
              item={item}
              onSelect={() => setSelected(item)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/research">
            <Button
              variant="outline"
              size="lg"
              className="text-black bg-white border-white hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Research
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {selected && (
        <ResearchModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}