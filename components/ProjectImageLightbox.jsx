'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const SWIPE_THRESHOLD = 48

/**
 * Fullscreen lightbox for a project's images. Sits above the project modal
 * (`z-[60]` over the modal's `z-50`) so the user never leaves the portfolio.
 *
 * Controlled by the gallery: `index` / `onSelect` stay in sync, so closing
 * the lightbox returns to the same image in the modal gallery.
 *
 * - Escape closes (capture-phase, so the underlying modal's own Escape
 *   handler never fires while this is open).
 * - Arrow keys move between images; clicking the backdrop closes.
 * - Body scroll lock preserves whatever value the modal set, restoring it
 *   on unmount instead of blanking it.
 * - Focus moves to the close button on open and is restored on close.
 *
 * @param {{
 *   images: string[],
 *   index: number,
 *   title?: string,
 *   onSelect: (index: number) => void,
 *   onClose: () => void,
 * }} props
 */
export default function ProjectImageLightbox({ images, index, title, onSelect, onClose }) {
  const overlayRef = useRef(null)
  const closeRef = useRef(null)
  const pointerStart = useRef(null)
  const count = images.length
  const current = images[index] ?? null

  const goTo = useCallback(
    (next) => {
      if (count === 0) return
      onSelect(((next % count) + count) % count)
    },
    [count, onSelect]
  )

  const showPrevious = useCallback(() => goTo(index - 1), [goTo, index])
  const showNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    const previouslyFocused =
      typeof document !== 'undefined' ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    // Capture phase: runs before the modal's bubble-phase window listener,
    // so Escape/arrows never reach the modal underneath.
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      } else if (event.key === 'ArrowLeft' && count > 1) {
        event.preventDefault()
        event.stopPropagation()
        showPrevious()
      } else if (event.key === 'ArrowRight' && count > 1) {
        event.preventDefault()
        event.stopPropagation()
        showNext()
      }
    }
    window.addEventListener('keydown', handleKey, true)

    return () => {
      window.removeEventListener('keydown', handleKey, true)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [count, onClose, showNext, showPrevious])

  if (!current) return null

  const onPointerDown = (event) => {
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start || count <= 1) return
    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return
    if (deltaX > 0) showPrevious()
    else showNext()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — fullscreen image viewer` : 'Fullscreen image viewer'}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:right-6 sm:top-6"
        aria-label="Close fullscreen viewer"
      >
        <X className="h-6 w-6" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showPrevious()
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <div
        className="flex max-h-full w-full max-w-6xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="relative max-h-[75vh] w-full flex-1"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <Image
            key={current}
            src={current}
            alt={
              count > 1
                ? `${title} — image ${index + 1} of ${count}`
                : `${title} preview`
            }
            width={1920}
            height={1080}
            sizes="100vw"
            className="mx-auto h-auto max-h-[75vh] w-auto max-w-full animate-in fade-in object-contain duration-300"
            priority
          />
        </div>

        {count > 1 && (
          <>
            <p className="mt-3 text-xs text-zinc-400" aria-live="polite">
              {index + 1} / {count}
            </p>
            <div
              className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1"
              role="group"
              aria-label={`${title} fullscreen thumbnails`}
            >
              {images.map((src, position) => {
                const isActive = position === index
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => goTo(position)}
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`Show image ${position + 1} of ${count}`}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:h-14 sm:w-20 ${
                      isActive
                        ? 'border-purple-500 opacity-100 ring-2 ring-purple-500/40'
                        : 'border-zinc-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
