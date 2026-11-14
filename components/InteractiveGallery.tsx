"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Camera,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  School,
  FlaskConical,
  Trophy,
  PartyPopper,
} from "lucide-react";

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: "campus" | "academics" | "sports" | "celebrations";
  categoryLabel: string;
  description: string;
  featured?: boolean;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    src: "/images/shemford/WhatsApp-Image-2025-03-04-at-2.19.41-PM-scaled-1-1024x768.jpeg",
    title: "Senior Academic Complex",
    category: "campus",
    categoryLabel: "Campus & Architecture",
    description: "Modern multi-storey educational facility nestled along Village Meharbani, Behat Road.",
    featured: true,
  },
  {
    id: "g2",
    src: "/images/shemford/WhatsApp-Image-2025-03-20-at-10.56.56-PM-e1742491732495.jpeg",
    title: "STEM & Robotics Innovation Center",
    category: "academics",
    categoryLabel: "Smart Classrooms & Labs",
    description: "Hands-on discovery lab where students learn electronics, coding, and CBSE practical sciences.",
    featured: true,
  },
  {
    id: "g3",
    src: "/images/shemford/851878635.jpg",
    title: "Equestrian Academy & Horse Riding",
    category: "sports",
    categoryLabel: "Sports & Adventure",
    description: "Exclusive horse riding training fostering agility, poise, and equestrian mastery in Saharanpur.",
    featured: true,
  },
  {
    id: "g4",
    src: "/images/shemford/2DSC02334-1.jpg",
    title: "Annual Day Cultural Extravaganza",
    category: "celebrations",
    categoryLabel: "Annual Day & Arts",
    description: "Magnificent stage production showcasing classical choreography, theatrical drama, and student talents.",
    featured: true,
  },
  {
    id: "g5",
    src: "/images/shemford/WhatsApp-Image-2025-03-04-at-2.20.54-PM-scaled-1.jpeg",
    title: "Lush Green 5-Acre Grounds",
    category: "campus",
    categoryLabel: "Campus & Architecture",
    description: "Eco-friendly campus filled with sprawling lawns, pollution-free atmosphere, and wide open skies.",
  },
  {
    id: "g6",
    src: "/images/shemford/3-e1742492023847-r35ojfacdgi9o8cbhw6ybnwkes5jgsfqcvi9tj9bl4.jpg",
    title: "Interactive Smart Classrooms",
    category: "academics",
    categoryLabel: "Smart Classrooms & Labs",
    description: "Equipped with multimedia projectors, animated audio-visual CBSE modules, and interactive touch displays.",
  },
  {
    id: "g7",
    src: "/images/shemford/3106166970.jpg",
    title: "Inter-House Athletics & Track Meet",
    category: "sports",
    categoryLabel: "Sports & Adventure",
    description: "Annual sports championship featuring sprint races, relay relays, high jumps, and field sports.",
  },
  {
    id: "g8",
    src: "/images/shemford/2542500367.jpg",
    title: "Classical Indian & Contemporary Dance",
    category: "celebrations",
    categoryLabel: "Annual Day & Arts",
    description: "Expressive performing arts curriculum nurturing rhythm, grace, and India's rich cultural heritage.",
  },
  {
    id: "g9",
    src: "/images/shemford/1-e1742491917441.jpg",
    title: "Main Campus Entrance & Boulevard",
    category: "campus",
    categoryLabel: "Campus & Architecture",
    description: "Welcoming grand gateway ensuring complete 24/7 security, turnstiles, and landscaped walkways.",
  },
  {
    id: "g10",
    src: "/images/shemford/WhatsApp-Image-2025-03-20-at-10.56.56-PM-1-e1742491777870.jpeg",
    title: "Kindergarten Shem Foundation Activity Zone",
    category: "academics",
    categoryLabel: "Smart Classrooms & Labs",
    description: "Child-safe play learning hub with Montessori tools, tactile toys, and creative play corners.",
  },
  {
    id: "g11",
    src: "/images/shemford/3191016174.jpg",
    title: "Martial Arts & Taekwondo Training",
    category: "sports",
    categoryLabel: "Sports & Adventure",
    description: "Discipline, self-defense, and fitness instilled through belt-graded martial arts coaching.",
  },
  {
    id: "g12",
    src: "/images/shemford/1754710445.jpg",
    title: "Live Symphony & Youth Choir",
    category: "celebrations",
    categoryLabel: "Annual Day & Arts",
    description: "Vocal harmonies and instrumental instruction on keyboards, guitar, tabla, and percussion.",
  },
  {
    id: "g13",
    src: "/images/shemford/WhatsApp-Image-2025-03-20-at-10.56.57-PM-e1742491865274.jpeg",
    title: "Morning Assembly & Value Talks",
    category: "campus",
    categoryLabel: "Campus & Architecture",
    description: "Whole-school morning gathering inspiring moral integrity, current affairs, and leadership thoughts.",
  },
  {
    id: "g14",
    src: "/images/shemford/1872233610.jpg",
    title: "High-Speed Computer & Cyber Lab",
    category: "academics",
    categoryLabel: "Smart Classrooms & Labs",
    description: "Modern computer terminal stations for AI, programming, internet research, and computational thinking.",
  },
  {
    id: "g15",
    src: "/images/shemford/3220475076.jpg",
    title: "Yoga, Pranayama & Holistic Wellness",
    category: "sports",
    categoryLabel: "Sports & Adventure",
    description: "Daily morning yoga and breathing practices ensuring sharp concentration and peaceful mental health.",
  },
  {
    id: "g16",
    src: "/images/shemford/1639146306.jpg",
    title: "Visual Arts & Clay Sculpting Studio",
    category: "celebrations",
    categoryLabel: "Annual Day & Arts",
    description: "Vibrant gallery of student oil paintings, origami, crafts, and handmade pottery sculptures.",
  },
  {
    id: "g17",
    src: "/images/shemford/3232619759.jpg",
    title: "Badminton & Indoor Gymnasium",
    category: "sports",
    categoryLabel: "Sports & Adventure",
    description: "All-weather indoor court designed for high-paced badminton tournaments and shuttle training.",
  },
  {
    id: "g18",
    src: "/images/shemford/1406865842.jpg",
    title: "CBSE Science & Innovation Fair",
    category: "academics",
    categoryLabel: "Smart Classrooms & Labs",
    description: "Working student models demonstrating renewable energy, hydraulic cranes, and eco-initiatives.",
  },
  {
    id: "g19",
    src: "/images/shemford/3661821011.jpg",
    title: "Joyful Splash Pool & Activity Play",
    category: "sports",
    categoryLabel: "Sports & Adventure",
    description: "Supervised water play and splash fun helping pre-primary stars build water confidence.",
  },
  {
    id: "g20",
    src: "/images/shemford/1895469132.jpg",
    title: "Annual Merit & Academic Felicitation",
    category: "celebrations",
    categoryLabel: "Annual Day & Arts",
    description: "Honoring academic toppers, house captains, and sports prodigies with trophies and scholarships.",
  },
];

type CategoryKey = "all" | "campus" | "academics" | "sports" | "celebrations";

export default function InteractiveGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : 0
    );
  }, [lightboxIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
    );
  }, [lightboxIndex, filteredPhotos.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, handleNext, handlePrev, handleClose]);

  return (
    <section id="gallery" className="relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-[#FAF6F0] overflow-hidden">
      {/* Decorative Background Aurora Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-[#0B4619] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-[#0B4619]" />
            <span>Campus Moments & Life at SHEMFORD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)] tracking-tight leading-tight">
            A Glimpse Into Our Vibrant Campus
          </h2>

          <p className="mt-4 text-[#1E2432]/75 text-base sm:text-lg leading-relaxed">
            Step inside our 5-acre futuristic campus on Behat Road. Explore smart interactive classrooms, high-tech labs, equestrian horse riding, and heartwarming annual celebrations.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setLightboxIndex(null);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm ${
              activeCategory === "all"
                ? "bg-[#0B4619] text-white shadow-emerald-900/30 scale-105"
                : "bg-white text-[#1E2432]/70 hover:text-[#0B4619] hover:bg-emerald-50 border border-black/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Moments ({GALLERY_PHOTOS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCategory("campus");
              setLightboxIndex(null);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm ${
              activeCategory === "campus"
                ? "bg-[#0B4619] text-white shadow-emerald-900/30 scale-105"
                : "bg-white text-[#1E2432]/70 hover:text-[#0B4619] hover:bg-emerald-50 border border-black/5"
            }`}
          >
            <School className="w-4 h-4" />
            <span>Campus & Grounds</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCategory("academics");
              setLightboxIndex(null);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm ${
              activeCategory === "academics"
                ? "bg-[#0B4619] text-white shadow-emerald-900/30 scale-105"
                : "bg-white text-[#1E2432]/70 hover:text-[#0B4619] hover:bg-emerald-50 border border-black/5"
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Smart Labs & Wings</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCategory("sports");
              setLightboxIndex(null);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm ${
              activeCategory === "sports"
                ? "bg-[#0B4619] text-white shadow-emerald-900/30 scale-105"
                : "bg-white text-[#1E2432]/70 hover:text-[#0B4619] hover:bg-emerald-50 border border-black/5"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Sports & Horse Riding</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCategory("celebrations");
              setLightboxIndex(null);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm ${
              activeCategory === "celebrations"
                ? "bg-[#0B4619] text-white shadow-emerald-900/30 scale-105"
                : "bg-white text-[#1E2432]/70 hover:text-[#0B4619] hover:bg-emerald-50 border border-black/5"
            }`}
          >
            <PartyPopper className="w-4 h-4" />
            <span>Annual Day & Arts</span>
          </button>
        </div>

        {/* Bento Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[280px]">
          {filteredPhotos.map((photo, index) => {
            const isFeatured = photo.featured && activeCategory === "all";

            return (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-black/5 ${
                  isFeatured
                    ? "sm:col-span-2 sm:row-span-2 auto-rows-auto"
                    : "col-span-1 row-span-1"
                }`}
              >
                {/* Photo Element */}
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 100vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Dark Cinematic Vignette & Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase">
                    {photo.categoryLabel}
                  </span>
                  {photo.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-[#FFCA28] text-black text-[10px] font-extrabold uppercase shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Top-Right Expand Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-[#FF6B35]">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Title & Description Panel */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end text-white">
                  <h3
                    className={`font-bold font-[family-name:var(--font-display)] tracking-tight drop-shadow-md group-hover:text-[#FFCA28] transition-colors ${
                      isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                    }`}
                  >
                    {photo.title}
                  </h3>
                  <p
                    className={`mt-1 text-white/80 line-clamp-2 leading-snug drop-shadow ${
                      isFeatured ? "text-xs sm:text-sm" : "text-xs"
                    }`}
                  >
                    {photo.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* FULLSCREEN CINEMA LIGHTBOX MODAL                                   */}
      {/* =================================================================== */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 select-none transition-all duration-300 animate-in fade-in"
        >
          {/* Top Bar with Title, Counter & Close Button */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-semibold">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#FFCA28] font-bold">
                {filteredPhotos[lightboxIndex].categoryLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close photo preview"
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-red-600 text-white flex items-center justify-center transition-all border border-white/20 active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Slide Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-[#FF6B35] text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20 active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Slide Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-[#FF6B35] text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20 active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Central Active Photo Container */}
          <div className="relative w-full max-w-5xl h-[70vh] sm:h-[78vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Bottom Photo Caption */}
            <div className="mt-4 text-center max-w-2xl px-4">
              <h4 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                {filteredPhotos[lightboxIndex].title}
              </h4>
              <p className="mt-1 text-sm text-white/80">
                {filteredPhotos[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
