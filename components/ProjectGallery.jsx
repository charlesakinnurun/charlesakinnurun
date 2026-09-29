'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, ImageOff, Images } from 'lucide-react'
import { getProjectImages } from '@/lib/projectImages'
import ProjectImageLightbox from '@/components/ProjectImageLightbox'

const SWIPE_THRESHOLD = 48

const navButtonClass =
  "absolute top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-white backdrop-blur transition-all duration-300 hover:border-purple-500 hover:bg-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"

const fallbackClass =
  "flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-950 px-4 text-center"

/**
 * Project image gallery. Renders every image the project declares, in order.
 *
 * - One image  -> image only, all carousel controls hidden.
 * - Many images -> prev/next controls, position counter, clickable thumbnails,
 *                  arrow-key navigation and horizontal swipe.
 *
 * Images that fail to load (or a project with no images) fall back to a
 * placeholder instead of breaking the modal.
 *
 * @param {{ project: import('@/lib/projectImages').Project }} props
 */
export default function ProjectGallery({ project }) {
  const images = useMemo(() => getProjectImages(project), [project])
  const imageKey = images.join('|')

  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(() => [])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const pointerStart = useRef(null)

  const count = images.length
  const hasMultiple = count > 1
  const current = images[index] ?? null
  const currentFailed = Boolean(current) && failed.includes(current)

  useEffect(() => {
    setIndex(0)
    setFailed([])
    pointerStart.current = null
  }, [project?.title, imageKey])

  useEffect(() => {
    if (count === 0) {
      setIndex(0)
      return
    }
    if (index > count - 1) setIndex(count - 1)
  }, [count, index])

  const goTo = useCallback(
    (next) => {
      if (count === 0) return
      setIndex(((next % count) + count) % count)
    },
    [count]
  )

  const showPrevious = useCallback(() => goTo(index - 1), [goTo, index])
  const showNext = useCallback(() => goTo(index + 1), [goTo, index])

  const markFailed = useCallback((src) => {
    setFailed((previous) => (previous.includes(src) ? previous : [...previous, src]))
  }, [])

  const onKeyDown = (event) => {
    // The lightbox handles its own keyboard input while open.
    if (lightboxOpen || !hasMultiple) return

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(count - 1)
    }
  }

  const onPointerDown = (event) => {
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start || !hasMultiple) return

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return
    }

    if (deltaX > 0) showPrevious()
    else showNext()
  }

  const altFor = (position) =>
    count > 1
      ? `${project?.title} — image ${position + 1} of ${count}`
      : `${project?.title} preview`

  // Warm the neighbours so prev/next feels instant without preloading the whole set.
  const neighbours =
    count > 1
      ? [...new Set([images[(index - 1 + count) % count], images[(index + 1) % count]])]
      : []

  return (
    <div className="space-y-3" onKeyDown={onKeyDown}>
      <div
        className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {current && !currentFailed ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group/zoom block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-500"
            aria-label={`Open fullscreen viewer for ${project?.title}`}
          >
            <Image
              key={current}
              src={current}
              alt={altFor(index)}
              fill
              sizes="(max-width: 640px) 92vw, 640px"
              className="object-contain animate-in fade-in duration-300"
              onError={() => markFailed(current)}
            />
            <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-zinc-200 opacity-0 backdrop-blur transition-opacity duration-300 group-hover/zoom:opacity-100 group-focus/zoom:opacity-100 focus-within:opacity-100">
              <Expand className="h-3 w-3 text-purple-400" />
              Fullscreen
            </span>
          </button>
        ) : (
          <div className={fallbackClass}>
            <ImageOff className="h-6 w-6 text-zinc-600" />
            <p className="text-xs text-zinc-500">
              {count === 0 ? 'No preview available' : 'Image unavailable'}
            </p>
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className={`${navButtonClass} left-2 sm:left-3`}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className={`${navButtonClass} right-2 sm:right-3`}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span
              className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur"
              aria-live="polite"
            >
              <Images className="h-3 w-3 text-purple-400" />
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label={`${project?.title} image thumbnails`}
        >
          {images.map((src, position) => {
            const isActive = position === index
            const isFailed = failed.includes(src)

            return (
              <button
                key={src}
                type="button"
                onClick={() => goTo(position)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Show image ${position + 1} of ${count}`}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:h-16 sm:w-24 ${
                  isActive
                    ? 'border-purple-500 opacity-100 ring-2 ring-purple-500/40'
                    : 'border-zinc-800 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                  onError={() => markFailed(src)}
                />
                {isFailed && (
                  <span className="absolute inset-0 flex items-center justify-center bg-zinc-900/85 text-zinc-500">
                    <ImageOff className="h-4 w-4" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {neighbours.length > 0 && (
        <div className="hidden" aria-hidden="true">
          {neighbours.map((src) => (
            <Image key={`preload-${src}`} src={src} alt="" width={1280} height={960} />
          ))}
        </div>
      )}

      {lightboxOpen && current && !currentFailed && (
        <ProjectImageLightbox
          images={images}
          index={index}
          title={project?.title}
          onSelect={goTo}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
