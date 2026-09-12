import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

function CardItem({ presentation, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full text-left cursor-pointer bg-zinc-900 rounded-lg p-6 transition-all duration-300 hover:text-[#6b21a8] hover:bg-zinc-800 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      aria-label={`View details for ${presentation.title} — ${presentation.subtitle || presentation.line}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {presentation.image && (
              <Image
                src={presentation.image}
                alt={`${presentation.imageAlt} logo`}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <h3 className="text-2xl sm:text-3xl font-semibold hover:text-[#6b21a8] transition-colors">
              {presentation.title}
            </h3>
          </div>
          <p className="text-zinc-400">{presentation.line}</p>
          <p className="text-sm sm:text-base text-zinc-300">
            {presentation.description}
          </p>
        </div>

        <span className="inline-flex items-center gap-1 shrink-0 text-sm font-semibold text-purple-400 mt-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          View Details
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </button>
  )
}

export default function DetailsCard({ title, items, present, onSelect }) {
  return (
    <div className="space-y-8">
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">{title}</h2>
      )}
      {items.map((item) => (
        <CardItem
          key={item.id}
          presentation={present(item)}
          onSelect={() => onSelect(item)}
        />
      ))}
    </div>
  )
}