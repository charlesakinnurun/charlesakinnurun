'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImageOff, Images } from 'lucide-react'
import { getProjectImage, getProjectImages } from '@/lib/projectImages'

/**
 * Shared project card media.
 *
 * Uses the project's primary image (`images[0]`, or the legacy `image`) and
 * keeps the surrounding card layout untouched — the caller supplies the exact
 * container `className` it already used. A count badge appears only when the
 * project actually has more than one image, and opening the card is opt-in
 * through `onSelect`.
 *
 * @param {{
 *   project: import('@/lib/projectImages').Project,
 *   className?: string,
 *   imageClassName?: string,
 *   sizes?: string,
 *   fill?: boolean,
 *   width?: number,
 *   height?: number,
 *   onSelect?: () => void,
 * }} props
 */
export default function ProjectCardMedia({
  project,
  className = "",
  imageClassName = "object-cover",
  sizes,
  fill = true,
  width = 800,
  height = 600,
  onSelect,
}) {
  const src = getProjectImage(project)
  const imageCount = getProjectImages(project).length
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  const media =
    src && !failed ? (
      <Image
        src={src}
        alt={`${project.title} preview`}
        className={imageClassName}
        onError={() => setFailed(true)}
        {...(fill
          ? { fill: true, sizes: sizes || "(max-width: 768px) 100vw, 40vw" }
          : { width, height })}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-zinc-950">
        <ImageOff className="h-6 w-6 text-zinc-600" />
        <span className="sr-only">No preview available</span>
      </div>
    )

  const badge =
    imageCount > 1 && (
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur transition-colors duration-300 group-hover:border-purple-500/60">
        <Images className="h-3 w-3 text-purple-400" />
        {imageCount} images
      </span>
    )

  if (!onSelect) {
    return (
      <div className={`relative ${className}`}>
        {media}
        {badge}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative ${className} group block w-full cursor-pointer border-0 bg-transparent p-0 text-left`}
      aria-label={`View details for ${project.title}`}
    >
      {media}
      {badge}
    </button>
  )
}
