'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImageOff, Images } from 'lucide-react'
import { getProjectImages } from '@/lib/projectImages'

const HOVER_INTERVAL_MS = 2500
const SWIPE_THRESHOLD = 48

/**
 * Shared project card media.
 *
 * Single image (or the legacy `image`) renders exactly as before — static.
 * Multiple images add a subtle, professional layer on top:
 *
 * - Desktop: hovering the media crossfades through the images every ~2.5s
 *   and returns to the first image when the cursor leaves.
 * - Touch: horizontal swipe advances/rewinds; a swipe never triggers the
 *   surrounding card's click-to-open behaviour.
 * - Dots bottom-center show position and are tappable/keyboard accessible.
 * - `prefers-reduced-motion` disables the auto-cycle (dots/swipe still work).
 *
 * The caller supplies the exact container `className` it already used, so
 * surrounding card layout is untouched. Opening the card is opt-in through
 * `onSelect`.
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
  const images = getProjectImages(project)
  const count = images.length
  const hasMultiple = count > 1

  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [failed, setFailed] = useState(() => [])
  const [reduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const pointerStart = useRef(null)
  const suppressClick = useRef(false)

  const imageKey = images.join('|')
  const current = images[active] ?? null
  const currentFailed = Boolean(current) && failed.includes(current)

  useEffect(() => {
    setActive(0)
    setFailed([])
    pointerStart.current = null
    suppressClick.current = false
  }, [imageKey])

  // Hover auto-cycle: subtle rotation, reset to first image on leave.
  useEffect(() => {
    if (!hovering || !hasMultiple || reduceMotion) return
    const id = setInterval(() => {
      setActive((previous) => (previous + 1) % count)
    }, HOVER_INTERVAL_MS)
    return () => clearInterval(id)
  }, [hovering, hasMultiple, reduceMotion, count])

  const goTo = (next) => {
    if (count === 0) return
    setActive(((next % count) + count) % count)
  }

  const markFailed = (src) => {
    setFailed((previous) => (previous.includes(src) ? previous : [...previous, src]))
  }

  const stopClick = (event) => {
    // A swipe ends in a click — swallow it so the card doesn't open.
    if (suppressClick.current) {
      suppressClick.current = false
      event.stopPropagation()
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

    suppressClick.current = true
    if (deltaX > 0) goTo(active - 1)
    else goTo(active + 1)
  }

  const singleMedia =
    current && !currentFailed ? (
      <Image
        src={current}
        alt={`${project.title} preview`}
        className={imageClassName}
        onError={() => markFailed(current)}
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

  const stackedMedia = (
    <>
      {images.map((src, position) => {
        if (failed.includes(src)) return null
        const isActive = position === active
        return (
          <Image
            key={`${src}-${position}`}
            src={src}
            alt={isActive ? `${project.title} preview` : ""}
            aria-hidden={!isActive}
            fill
            sizes={sizes || "(max-width: 768px) 100vw, 40vw"}
            className={`${imageClassName} absolute inset-0 transition-opacity duration-700 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            onError={() => markFailed(src)}
          />
        )
      })}
      {currentFailed && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-zinc-950">
          <ImageOff className="h-6 w-6 text-zinc-600" />
          <span className="sr-only">No preview available</span>
        </div>
      )}
    </>
  )

  const badge =
    hasMultiple && (
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur transition-colors duration-300 group-hover:border-purple-500/60">
        <Images className="h-3 w-3 text-purple-400" />
        {count} images
      </span>
    )

  const dots =
    hasMultiple && (
      <div
        className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur"
        role="group"
        aria-label={`${project.title} image ${active + 1} of ${count}`}
      >
        {images.map((src, position) => {
          const isActive = position === active
          const dotClass = `h-1.5 w-1.5 rounded-full transition-all duration-300 ${
            isActive ? "bg-white" : "bg-white/40"
          }`
          // Inside the legacy <button> wrapper, dots are position-only —
          // nested buttons are invalid HTML, so no interactivity there.
          if (onSelect) {
            return <span key={`dot-${src}-${position}`} className={dotClass} aria-hidden="true" />
          }
          return (
            <button
              key={`dot-${src}-${position}`}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                goTo(position)
              }}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Show image ${position + 1} of ${count}`}
              className={`${dotClass} ${isActive ? "" : "hover:bg-white/70"} focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400`}
            />
          )
        })}
      </div>
    )

  const liveRegion = (
    <span className="sr-only" aria-live="polite">
      {hasMultiple ? `Image ${active + 1} of ${count}` : null}
    </span>
  )

  const interactiveProps = hasMultiple
    ? {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => {
          setHovering(false)
          setActive(0)
        },
        onPointerDown,
        onPointerUp,
        onClickCapture: stopClick,
      }
    : {}

  if (!onSelect) {
    return (
      <div className={`relative ${className}`} {...interactiveProps}>
        {hasMultiple ? stackedMedia : singleMedia}
        {badge}
        {dots}
        {liveRegion}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        if (suppressClick.current) {
          suppressClick.current = false
          return
        }
        onSelect(event)
      }}
      onMouseEnter={hasMultiple ? () => setHovering(true) : undefined}
      onMouseLeave={
        hasMultiple
          ? () => {
              setHovering(false)
              setActive(0)
            }
          : undefined
      }
      onPointerDown={hasMultiple ? onPointerDown : undefined}
      onPointerUp={hasMultiple ? onPointerUp : undefined}
      className={`relative ${className} group block w-full cursor-pointer border-0 bg-transparent p-0 text-left`}
      aria-label={`View details for ${project.title}`}
    >
      {hasMultiple ? stackedMedia : singleMedia}
      {badge}
      {dots}
      {liveRegion}
    </button>
  )
}
