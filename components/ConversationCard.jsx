import Image from "next/image";
import { Building2, CalendarDays, Expand, Linkedin, ShieldCheck, Video } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Initials avatar fallback when no company logo is set.
 */
function Initials({ name }) {
  const initials = (name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span aria-hidden="true" className="text-lg font-bold text-purple-300">
      {initials}
    </span>
  );
}

export default function ConversationCard({ conversation, onViewScreenshot }) {
  const hasScreenshot = Boolean(conversation.image && conversation.imageApproved);

  return (
    <Card className="group bg-transparent hover:bg-[#242424] border-zinc-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5 p-6 flex flex-col">
      {/* Header: identity */}
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700/60">
          {conversation.companyLogo ? (
            <Image
              src={conversation.companyLogo}
              alt={`${conversation.company} logo`}
              fill
              sizes="56px"
              className="object-contain p-1"
            />
          ) : (
            <Initials name={conversation.name} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white leading-tight truncate">
            {conversation.name}
          </h3>
          <p className="text-sm text-zinc-300 truncate">
            {conversation.role}
            {conversation.company ? ` · ${conversation.company}` : null}
          </p>
          <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {conversation.company || "Industry"} · Industry Conversation
            </span>
          </p>
        </div>
      </div>

      {/* Date */}
      {conversation.date && (
        <p className="text-xs text-zinc-500 mt-3 flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {conversation.date}
        </p>
      )}

      {/* Description */}
      <p className="text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-3 flex-1">
        {conversation.description}
      </p>

      {/* Screenshot thumbnail or tasteful placeholder */}
      <div className="mt-4">
        {hasScreenshot ? (
          <button
            type="button"
            onClick={onViewScreenshot}
            className="relative block w-full aspect-video rounded-xl overflow-hidden bg-zinc-800/60 border border-zinc-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label={`View conversation screenshot with ${conversation.name}`}
          >
            <Image
              src={conversation.image}
              alt={conversation.imageAlt || `Google Meet conversation with ${conversation.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" aria-hidden="true" />
            <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
              <Expand className="w-3.5 h-3.5" aria-hidden="true" />
              View Screenshot
            </span>
          </button>
        ) : (
          <div
            className="w-full aspect-video rounded-xl bg-zinc-800/40 border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-2 text-center px-4"
            role="img"
            aria-label="Conversation screenshot coming soon"
          >
            <Video className="w-5 h-5 text-zinc-500" aria-hidden="true" />
            <p className="text-xs text-zinc-500 leading-relaxed">
              Screenshot coming soon — shared only with consent, redacted for privacy.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          Networking only
        </div>
        <div className="flex items-center gap-2">
          {hasScreenshot && (
            <button
              type="button"
              onClick={onViewScreenshot}
              className="inline-flex items-center text-sm text-white hover:text-purple-400 transition-colors duration-300"
              aria-label={`View conversation screenshot with ${conversation.name}`}
            >
              View Conversation
              <Expand className="ml-1.5 w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
          {conversation.profileUrl && (
            <a
              href={conversation.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500 transition-all duration-300"
              aria-label={`View ${conversation.name}'s profile (opens in new tab)`}
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
