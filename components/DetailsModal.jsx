import { useEffect, useState } from 'react'
import { ArrowUpRight, Building2, X } from 'lucide-react'
import Image from 'next/image'

const metaClass =
  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-full border border-zinc-700"

const chipClass =
  "px-2.5 py-1 text-xs font-medium text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-md"

const linkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-white bg-zinc-800 hover:bg-purple-600 hover:text-white border border-zinc-700 px-4 py-2 rounded-lg transition-all duration-300"

function Section({ icon: Icon, title, accent, children }) {
  return (
    <section>
      <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${accent}`}>
        <Icon className="w-4 h-4" />
        {title}
      </h4>
      {children}
    </section>
  )
}

export default function DetailsModal({ content, onClose }) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden"
    }
    const onKey = (e) => {
      if (e.key === "Escape") {
        setClosing(true)
        setTimeout(onClose, 200)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = ""
      }
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm ${
          closing ? "animate-out fade-out duration-200" : "animate-in fade-in duration-200"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-modal-title"
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-purple-500/10 ${
          closing
            ? "animate-out zoom-out-95 fade-out duration-200"
            : "animate-in zoom-in-95 fade-in duration-300"
        }`}
      >
        <header className="flex items-start gap-4 p-5 sm:p-6 border-b border-zinc-800">
          <div className="relative w-14 h-14 shrink-0 rounded-xl border border-zinc-700/60 bg-zinc-800 overflow-hidden flex items-center justify-center">
            {content.image ? (
              <Image
                src={content.image}
                alt={`${content.imageAlt} logo`}
                className="object-contain rounded-xl p-1"
                fill
              />
            ) : (
              <Building2 className="w-6 h-6 text-purple-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {content.label && (
              <p className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">
                {content.label}
              </p>
            )}
            <h3
              id="details-modal-title"
              className="text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              {content.title}
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 mt-0.5">{content.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 shrink-0 rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-purple-500 transition-colors duration-300"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="p-5 sm:p-6 space-y-6">
          {content.meta.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.meta.map(({ Icon, text, iconClass }, index) => (
                <span key={index} className={metaClass}>
                  <Icon className={`w-3.5 h-3.5 ${iconClass || "text-purple-400"}`} />
                  {text}
                </span>
              ))}
            </div>
          )}

          {content.description && (
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {content.description}
            </p>
          )}

          {content.lists?.map(({ Icon, title, accent, itemIcon: ItemIcon, itemIconClass, items }) => (
            <Section key={title} icon={Icon} title={title} accent={accent}>
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
            </Section>
          ))}

          {content.badgeGroups?.map(({ Icon, title, accent, items }) => (
            <Section key={title} icon={Icon} title={title} accent={accent}>
              <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                  <span key={index} className={chipClass}>
                    {item}
                  </span>
                ))}
              </div>
            </Section>
          ))}

          {content.links?.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2 border-t border-zinc-800">
              {content.links.map(({ Icon, label, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}