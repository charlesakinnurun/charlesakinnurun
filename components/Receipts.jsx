"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { receipts } from "@/data/receipts";

// Slight tilt for each photo, like junaidshaukat.com community strip
const tilts = [
  { rot: "-3.2deg", y: "4px" },
  { rot: "2.1deg", y: "-6px" },
  { rot: "-1.6deg", y: "2px" },
  { rot: "2.8deg", y: "5px" },
  { rot: "-2.4deg", y: "-4px" },
  { rot: "1.8deg", y: "3px" },
];

function Lightbox({ isOpen, receipt, currentIndex, total, onClose, onPrev, onNext }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !receipt) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={receipt.title}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors duration-200 z-10 p-2 rounded-full hover:bg-white/10"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {total > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 z-10 p-2 rounded-full hover:bg-white/10"
            aria-label="Previous proof"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 z-10 p-2 rounded-full hover:bg-white/10"
            aria-label="Next proof"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div
        className="relative w-full max-w-4xl max-h-[80vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900 p-2">
          <Image
            src={receipt.image}
            alt={receipt.alt || receipt.title}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {receipt.title}
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            {receipt.organization} · {receipt.date}
          </p>
          {total > 1 && (
            <p className="text-xs text-zinc-500 mt-2">
              {currentIndex + 1} / {total}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Receipts() {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState({ isOpen: false, currentIndex: 0 });

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

  const openLightbox = (index) =>
    setLightbox({ isOpen: true, currentIndex: index });
  const closeLightbox = () => setLightbox((prev) => ({ ...prev, isOpen: false }));
  const prevReceipt = () =>
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + receipts.length) % receipts.length,
    }));
  const nextReceipt = () =>
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % receipts.length,
    }));

  const certCount = receipts.filter((r) => r.category === "Certification").length;

  return (
    <section id="receipts" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div ref={sectionRef} className="receipt-reveal max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-7 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Community
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto text-[15px] leading-[1.75]">
          Learning in public is one way to grow. The other is proving it —
          shipping work, earning certifications, and sharing proof so the next
          person in the room can follow the same path.
        </p>

        {/* Photo strip — tilted thumbnails, click to zoom */}
        <div className="-mx-4 overflow-x-auto px-4 pt-6 pb-6 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex w-max gap-3 sm:w-auto sm:flex-wrap sm:justify-center sm:gap-4">
            {receipts.map((receipt, index) => {
              const tilt = tilts[index % tilts.length];
              return (
                <button
                  key={receipt.id}
                  type="button"
                  title={receipt.title}
                  aria-label={`Open proof: ${receipt.title}`}
                  onClick={() => openLightbox(index)}
                  style={{ "--rot": tilt.rot, "--y": tilt.y }}
                  className="relative h-24 w-24 shrink-0 cursor-zoom-in overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-800 transition-transform duration-300 hover:scale-105 hover:border-purple-400/60"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block"
                    style={{ transform: `rotate(var(--rot)) translateY(var(--y))` }}
                  >
                    <Image
                      src={receipt.image}
                      alt={receipt.alt || receipt.title}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Proof stat strip */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] text-zinc-500">
          <span className="text-white">{receipts.length} verified proofs</span>
          <span className="h-3 w-px bg-zinc-800" aria-hidden="true" />
          <span>{certCount} certifications</span>
          <span className="h-3 w-px bg-zinc-800" aria-hidden="true" />
          <span>AWS · Anthropic · Google</span>
        </div>

        {/* Community-style entries */}
        <div className="mt-10 space-y-6">
          {receipts.map((receipt) => (
            <article
              key={receipt.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 transition-colors duration-300 hover:border-zinc-700"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[16px] font-medium text-white">
                  {receipt.title}
                  <span className="ml-2 text-[14px] font-normal text-zinc-400">
                    {receipt.organization}
                  </span>
                </h3>
                <span className="font-mono text-[11px] text-zinc-500">
                  {receipt.date}
                </span>
              </div>

              {receipt.description && (
                <p className="mt-3 text-[15px] leading-[1.75] text-zinc-400">
                  {receipt.description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {receipt.category && (
                  <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-[11px] text-zinc-300">
                    {receipt.category}
                  </span>
                )}
                <span className="inline-flex items-center rounded-full border border-zinc-800 px-3 py-1 font-mono text-[11px] text-zinc-500">
                  {receipt.organization}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(receipts.findIndex((r) => r.id === receipt.id))
                  }
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 underline decoration-zinc-700 underline-offset-[3px] transition-colors hover:text-white"
                >
                  View proof
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightbox.isOpen}
        receipt={receipts[lightbox.currentIndex]}
        currentIndex={lightbox.currentIndex}
        total={receipts.length}
        onClose={closeLightbox}
        onPrev={prevReceipt}
        onNext={nextReceipt}
      />
    </section>
  );
}
