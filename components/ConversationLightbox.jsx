"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * Polished image lightbox for a conversation screenshot.
 * - Keeps image within viewport
 * - Close via button, outside click, or Escape
 * - Locks body scroll while open
 * - Accessible dialog labelling
 */
export default function ConversationLightbox({ conversation, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!conversation) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [conversation, onClose]);

  if (!conversation) return null;

  const title = `Conversation screenshot with ${conversation.name}`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors duration-200 z-10 p-2 rounded-full hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-label="Close screenshot viewer"
        autoFocus
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>

      <div
        className="relative w-full max-w-4xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-900">
          <Image
            src={conversation.image}
            alt={conversation.imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-4 text-center px-2">
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {conversation.name}
            {conversation.role ? (
              <span className="text-zinc-400 font-normal"> · {conversation.role}</span>
            ) : null}
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            {[conversation.company, conversation.date].filter(Boolean).join(" · ")}
          </p>
          <p className="text-xs text-zinc-500 mt-2">
            Shared with consent · redacted for privacy — not an endorsement or affiliation.
          </p>
        </div>
      </div>
    </div>
  );
}
