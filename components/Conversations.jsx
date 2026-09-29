"use client";

import { useEffect, useRef, useState } from "react";
import { MessagesSquare, Plus } from "lucide-react";
import ConversationCard from "@/components/ConversationCard";
import ConversationLightbox from "@/components/ConversationLightbox";
import { conversations, conversationStats } from "@/data/conversations";

const PREVIEW_COUNT = 6;

export default function Conversations() {
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add("receipt-visible");
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visible = conversations.slice(0, PREVIEW_COUNT);

  return (
    <section id="conversations" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div ref={sectionRef} className="receipt-reveal max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Industry Conversations
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-10">
          Conversations with engineers, founders, researchers, and AI/ML professionals
          across the tech industry.
        </p>

        {/* Data-driven stat */}
        <div className="flex flex-col items-center mb-12" aria-label="Conversation statistics">
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {conversationStats.totalLabel}
          </p>
          <p className="text-sm text-zinc-400 mt-2">{conversationStats.supportingText}</p>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((conversation) => (
              <ConversationCard
                key={conversation.id}
                conversation={conversation}
                onViewScreenshot={() =>
                  conversation.image && conversation.imageApproved
                    ? setSelected(conversation)
                    : null
                }
              />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-12">
            <span className="mx-auto mb-4 flex w-12 h-12 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
              <MessagesSquare className="w-6 h-6 text-purple-300" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-white">
              Conversations coming soon
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              I&apos;m actively connecting with engineers, founders, researchers, and
              AI/ML professionals. New conversations — with consented, privacy-checked
              screenshots — will appear here.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add yours in <code className="text-zinc-400">data/conversations.js</code>
            </p>
          </div>
        )}

        {/* Disclaimer: networking, not affiliation */}
        <p className="text-xs text-zinc-500 text-center max-w-2xl mx-auto mt-10 leading-relaxed">
          These are informal professional networking and knowledge-sharing conversations.
          They do not imply employment, endorsement, mentorship, or official affiliation
          with any company or individual listed.
        </p>
      </div>

      {selected && (
        <ConversationLightbox
          conversation={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
