"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { receipts } from "@/data/receipts";

const categoryColors = {
  Certification: "bg-blue-900/40 text-blue-300",
  Scholarship: "bg-amber-900/40 text-amber-300",
  Fellowship: "bg-purple-900/40 text-purple-300",
  Program: "bg-emerald-900/40 text-emerald-300",
  Achievement: "bg-rose-900/40 text-rose-300",
  Project: "bg-cyan-900/40 text-cyan-300",
  Competition: "bg-orange-900/40 text-orange-300",
};

function ReceiptCard({ receipt, onOpen }) {
  return (
    <div
      data-receipt-card
      role="button"
      tabIndex={0}
      aria-label={`View ${receipt.title}${
        receipt.description ? `. ${receipt.description}` : ""
      }`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/15 hover:-translate-y-1 cursor-pointer snap-start shrink-0 w-[85%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800/60 p-2">
        <Image
          src={receipt.image}
          alt={receipt.alt || receipt.title}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <Eye className="w-4 h-4" />
            <span>View</span>
          </div>
        </div>

        {receipt.category && (
          <div className="absolute top-3 right-3">
            <span
              className={`text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${
                categoryColors[receipt.category] || "bg-zinc-800/80 text-zinc-300"
              }`}
            >
              {receipt.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-white leading-snug mb-1 line-clamp-2">
          {receipt.title}
        </h3>
        <p className="text-sm text-zinc-400">
          {receipt.organization} · {receipt.date}
        </p>
        {receipt.description && (
          <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-2">
            {receipt.description}
          </p>
        )}
      </div>
    </div>
  );
}

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
            aria-label="Previous receipt"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 z-10 p-2 rounded-full hover:bg-white/10"
            aria-label="Next receipt"
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
  const trackRef = useRef(null);
  const [perView, setPerView] = useState(3);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, receipts.length - perView);

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

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

  const cardWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector("[data-receipt-card]");
    return card ? card.offsetWidth : 0;
  };

  const handleScroll = () => {
    const el = trackRef.current;
    const width = cardWidth();
    if (!el || !width) return;
    const idx = Math.round(el.scrollLeft / width);
    setCurrent(Math.min(Math.max(idx, 0), maxIndex));
  };

  const scrollPrev = () => {
    const el = trackRef.current;
    const width = cardWidth();
    if (!el || !width) return;
    const target = Math.max(0, Math.round(el.scrollLeft / width) - 1);
    el.scrollTo({ left: target * width, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = trackRef.current;
    const width = cardWidth();
    if (!el || !width) return;
    const target = Math.min(maxIndex, Math.round(el.scrollLeft / width) + 1);
    el.scrollTo({ left: target * width, behavior: "smooth" });
  };

  const goTo = (index) => {
    const el = trackRef.current;
    const width = cardWidth();
    if (!el || !width) return;
    el.scrollTo({ left: index * width, behavior: "smooth" });
  };

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

  return (
    <section id="receipts" className="py-20 px-4 sm:px-6 lg:px-8">
      <div ref={sectionRef} className="receipt-reveal max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Receipts
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          Visual proof of certifications, programs, achievements, and work
          I&apos;ve completed.
        </p>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-1"
        >
          {receipts.map((receipt, index) => (
            <ReceiptCard
              key={receipt.id}
              receipt={receipt}
              onOpen={() => openLightbox(index)}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={scrollPrev}
            disabled={current <= 0}
            aria-label="Previous receipts"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 text-zinc-400 transition-all duration-300 hover:text-white hover:border-purple-400 hover:bg-purple-500/10 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to receipts ${i + 1}`}
                aria-current={current === i}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === i
                    ? "w-8 bg-purple-400"
                    : "w-2.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            disabled={current >= maxIndex}
            aria-label="Next receipts"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 text-zinc-400 transition-all duration-300 hover:text-white hover:border-purple-400 hover:bg-purple-500/10 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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