"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Baby,
  Smile,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import { fireSchoolConfetti } from "./QuickActionDock";

interface WingData {
  id: string;
  name: string;
  ageGroup: string;
  badgeColor: string;
  icon: typeof Baby;
  image: string;
  description: string;
  keyFeatures: string[];
  subjects: string[];
}

const WINGS: WingData[] = [
  {
    id: "foundation",
    name: "SHEM FOUNDATION",
    ageGroup: "Play Group & Pre-Nursery (2+ to 3+ Yrs)",
    badgeColor: "bg-[#FF6B35]",
    icon: Baby,
    image: "/images/shemford/WhatsApp-Image-2025-03-20-at-10.56.56-PM-1-e1742491777870.jpeg",
    description: "Gentle motherly care with joyful discovery, sensorimotor playrooms, splash pool, and phonics.",
    keyFeatures: [
      "No-bag child-centric experiential learning",
      "ShemEduMAX™ theme-based activity curriculum",
      "Hygienic daycare & trained nurturing nannies",
      "Daily gross & fine motor skill development",
    ],
    subjects: ["Sensory Play", "Story Phonics", "Little Art", "Music & Movement"],
  },
  {
    id: "prep",
    name: "SHEM PREP WING",
    ageGroup: "Nursery & Kindergarten (4+ to 5+ Yrs)",
    badgeColor: "bg-[#0B4619]",
    icon: Smile,
    image: "/images/shemford/3661821011.jpg",
    description: "Igniting curiosity through interactive storytelling, digital smart class modules, and foundational math.",
    keyFeatures: [
      "Animated audio-visual smart board sessions",
      "Confidence-building stage shows & recitals",
      "Foundational numeracy & English conversation",
      "Safe nature play and botanical exploration",
    ],
    subjects: ["Early Numeracy", "Phonetic Reading", "Environmental Science", "Creative Arts"],
  },
  {
    id: "junior",
    name: "JUNIOR DISCOVERY",
    ageGroup: "Grades 1 to 5 (6+ to 10+ Yrs)",
    badgeColor: "bg-[#FFCA28] text-black",
    icon: BookOpen,
    image: "/images/shemford/3-e1742492023847-r35ojfacdgi9o8cbhw6ybnwkes5jgsfqcvi9tj9bl4.jpg",
    description: "Bridging concepts to hands-on practical experiments, bilingual fluency, and multi-sport coaching.",
    keyFeatures: [
      "Hands-on science activity kits & math labs",
      "Equestrian horse riding & martial arts training",
      "Inter-house competitions & moral education",
      "Individualised attention with small class sizes",
    ],
    subjects: ["CBSE Science", "Mathematics", "English & Hindi", "Computer Coding", "General Knowledge"],
  },
  {
    id: "senior",
    name: "SENIOR SCHOLARS",
    ageGroup: "Grades 6 to 12 (CBSE 10+2 Secondary & Sr. Sec)",
    badgeColor: "bg-[#1F4E3D]",
    icon: GraduationCap,
    image: "/images/shemford/WhatsApp-Image-2025-03-20-at-10.56.56-PM-e1742491732495.jpeg",
    description: "Rigorous academic coaching in Science, Commerce & Arts with competitive exam prep and state-of-the-art labs.",
    keyFeatures: [
      "Advanced Physics, Chemistry & Biology Labs",
      "Stream Specialisation: Medical, Non-Med, Commerce & Humanities",
      "CBSE Board exam mentorship & test series",
      "Career counselling & university guidance seminars",
    ],
    subjects: ["PCM / PCB / Biotechnology", "Accountancy & Economics", "Business Studies", "Applied Math & Informatics"],
  },
];

export default function InteractiveWings() {
  const [selectedWing, setSelectedWing] = useState<string>("foundation");
  const [childAge, setChildAge] = useState<string>("3");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Tilt Card Ref tracking
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  // Eligibility calculation logic
  const ageNum = parseInt(childAge, 10);
  let recommendedWing = WINGS[0];
  if (ageNum >= 2 && ageNum <= 3) {
    recommendedWing = WINGS[0];
  } else if (ageNum >= 4 && ageNum <= 5) {
    recommendedWing = WINGS[1];
  } else if (ageNum >= 6 && ageNum <= 10) {
    recommendedWing = WINGS[2];
  } else if (ageNum >= 11) {
    recommendedWing = WINGS[3];
  }

  return (
    <section id="curriculum" className="relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-[#0B4619] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0B4619]" />
            <span>ShemEduMAX™ Integrated Curriculum</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)] tracking-tight">
            Academic Wings Designed for Every Stage
          </h2>

          <p className="mt-4 text-[#1E2432]/75 text-base sm:text-lg leading-relaxed">
            From the joyful beginnings of playgroup to senior secondary CBSE board excellence, our curriculum ensures your child thrives with practical confidence.
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WINGS.map((wing) => {
            const Icon = wing.icon;
            const isSelected = selectedWing === wing.id;

            return (
              <div
                key={wing.id}
                ref={(el) => {
                  cardRefs.current[wing.id] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, wing.id)}
                onMouseLeave={() => handleMouseLeave(wing.id)}
                onClick={() => setSelectedWing(wing.id)}
                className={`relative rounded-3xl overflow-hidden bg-[#FAF6F0] border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-2xl ${
                  isSelected
                    ? "ring-2 ring-[#0B4619] border-transparent shadow-xl"
                    : "border-black/10 hover:border-[#0B4619]/40"
                }`}
                style={{ willChange: "transform" }}
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={wing.image}
                      alt={wing.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-md ${wing.badgeColor}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{wing.name}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-semibold text-[#FFCA28] drop-shadow">
                        {wing.ageGroup}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-[#1E2432]/80 leading-relaxed font-normal mb-4">
                      {wing.description}
                    </p>

                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0B4619] mb-2.5">
                      Wing Highlights:
                    </h4>

                    <ul className="space-y-2">
                      {wing.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#1E2432]/75">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Subjects Pill */}
                <div className="p-6 pt-0 border-t border-black/5 mt-4">
                  <div className="pt-3 flex flex-wrap gap-1.5">
                    {wing.subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-white text-[10px] font-semibold text-[#1E2432]/70 border border-black/5 shadow-2xs"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWing(wing.id);
                      fireSchoolConfetti();
                    }}
                    className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-[#0B4619] text-white shadow-md"
                        : "bg-white hover:bg-emerald-50 text-[#0B4619] border border-emerald-900/10"
                    }`}
                  >
                    <span>{isSelected ? "Wing Selected" : "View Curriculum"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* =============================================================== */}
        {/* INTERACTIVE GRADE & AGE ELIGIBILITY EXPLORER TOOL                */}
        {/* =============================================================== */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#0B4619] to-[#1F4E3D] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle pattern background */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFCA28] text-xs font-bold uppercase tracking-wider mb-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Instant Age & Wing Eligibility Checker</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-[family-name:var(--font-display)] tracking-tight">
                Not sure which class fits your child?
              </h3>

              <p className="mt-3 text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
                Slide your child&apos;s current age to instantly find the recommended wing, entry requirements, and age compliance for CBSE 2026–27 session.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/15">
                  <span className="text-xs font-semibold text-white/70">Child&apos;s Age:</span>
                  <div className="flex items-center gap-2">
                    {[2, 3, 4, 5, 7, 10, 13, 16].map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => {
                          setChildAge(String(age));
                          fireSchoolConfetti();
                        }}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          parseInt(childAge, 10) === age
                            ? "bg-[#FFCA28] text-black shadow-lg scale-110"
                            : "bg-white/15 text-white hover:bg-white/30"
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white/80">Yrs</span>
                </div>
              </div>
            </div>

            {/* Recommended Wing Box */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 text-[#1E2432] shadow-xl border border-white/20">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                Recommended Academic Wing:
              </span>
              <h4 className="text-xl font-bold font-[family-name:var(--font-display)] text-[#0B4619] mt-1">
                {recommendedWing.name}
              </h4>
              <p className="text-xs text-[#1E2432]/70 mt-1 font-medium">
                {recommendedWing.ageGroup}
              </p>

              <div className="mt-4 pt-4 border-t border-black/10">
                <p className="text-xs text-[#1E2432]/80 leading-relaxed">
                  {recommendedWing.description}
                </p>

                <a
                  href={`https://wa.me/918923490432?text=Namaste%20SHEMFORD%20Saharanpur%2C%20I%20checked%20eligibility%20for%20my%20${childAge}-year-old%20child%20for%20${encodeURIComponent(
                    recommendedWing.name
                  )}.%20Please%20share%20admission%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => fireSchoolConfetti()}
                  className="mt-4 w-full py-3 rounded-2xl bg-[#FF6B35] hover:bg-[#ff8255] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enquire for {recommendedWing.name}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
