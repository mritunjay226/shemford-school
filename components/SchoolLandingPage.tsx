"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Trophy,
  Bus,
  Clock,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import InteractiveGallery from "./InteractiveGallery";
import InteractiveWings from "./InteractiveWings";
import QuickActionDock, { fireSchoolConfetti } from "./QuickActionDock";
import ScrollVideoCanvas from "./ScrollVideoCanvas";

const STAT_CARDS = [
  {
    number: "2,365+",
    label: "Happy SHEMStars",
    sub: "Nurtured since 2013",
    bg: "bg-[#E2F2FE]",
    text: "text-[#0F5499]",
    border: "border-[#3DA9FC]/30",
  },
  {
    number: "100%",
    label: "CBSE Board Results",
    sub: "Grade 10 & 12 Excellence",
    bg: "bg-[#FFF3D6]",
    text: "text-[#B7791F]",
    border: "border-[#FFCA28]/30",
  },
  {
    number: "5 Acres",
    label: "Lush Eco-Campus",
    sub: "Village Meharbani, Behat Rd",
    bg: "bg-[#E6F4EA]",
    text: "text-[#0B4619]",
    border: "border-emerald-600/30",
  },
  {
    number: "100+",
    label: "National Branches",
    sub: "India, Nepal & Bangladesh",
    bg: "bg-[#FCEAE3]",
    text: "text-[#C53030]",
    border: "border-[#FF6B35]/30",
  },
];

const TICKER_ITEMS_1 = [
  "🌟 ADMISSIONS OPEN 2026–27 (SHEM FOUNDATION TO CLASS 12)",
  "🏆 100% CBSE BOARD RESULTS IN SCIENCE & COMMERCE",
  "🐎 EQUESTRIAN HORSE RIDING ACADEMY",
  "🤖 MODERN ROBOTICS & MULTI-PURPOSE STEM LABS",
  "🚌 SAFE GPS-ENABLED BUS FLEET ACROSS SAHARANPUR",
  "🌱 5-ACRE POLLUTION-FREE ECO-CAMPUS ON BEHAT ROAD",
];

const TICKER_ITEMS_2 = [
  "💡 SHEMEDUMAX™ PRACTICAL EXPERIENTIAL LEARNING",
  "🥋 MARTIAL ARTS, TAEKWONDO & DAILY YOGA",
  "🎥 SHEMFORD VALUE CINEMA & PERSONALITY BUILDING",
  "👨‍🏫 EXPERIENCED CBSE FACULTY & SMALL CLASS SIZES",
  "🎉 JOYFUL PRE-PRIMARY PLAYZONE & SPLASH POOL",
  "📍 VILLAGE MEHARBANI, BEHAT ROAD, SAHARANPUR",
];

const CAMPUS_FACILITIES = [
  {
    icon: "💻",
    title: "Digital Smart Classes",
    desc: "Curriculum modules from Shem Foundation to Class XII with animated figures, 3D concepts, and interactive displays.",
    image: "/images/shemford/3-e1742492023847-r35ojfacdgi9o8cbhw6ybnwkes5jgsfqcvi9tj9bl4.jpg",
  },
  {
    icon: "🔬",
    title: "Science & Robotics Lab",
    desc: "Physics, Chemistry, Biology & Robotics facilities where hands-on experiments replace dry theory.",
    image: "/images/shemford/WhatsApp-Image-2025-03-20-at-10.56.56-PM-e1742491732495.jpeg",
  },
  {
    icon: "🐎",
    title: "Horse Riding Academy",
    desc: "Professional equestrian training grounds instilling courage, balance, and poise in young scholars.",
    image: "/images/shemford/851878635.jpg",
  },
  {
    icon: "🚌",
    title: "Safe Transport Fleet",
    desc: "Dedicated GPS-tracked school buses covering Saharanpur city and surrounding Behat Road villages.",
    image: "/images/shemford/WhatsApp-Image-2025-03-04-at-2.20.54-PM-scaled-1.jpeg",
  },
  {
    icon: "🎭",
    title: "Performance Hall & Arts",
    desc: "Indoor amphitheatre, classical dance studio, music academy, and creative clay sculpting workshops.",
    image: "/images/shemford/2DSC02334-1.jpg",
  },
  {
    icon: "🤸",
    title: "Kindergarten Joy Hub",
    desc: "Montessori sensory activity areas, safe splash pool, sand pit, and gross-motor skill apparatus.",
    image: "/images/shemford/WhatsApp-Image-2025-03-20-at-10.56.56-PM-1-e1742491777870.jpeg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Enrolling our daughter at SHEMFORD Futuristic School, Village Meharbani was the most rewarding choice for our family. The practical ShemEduMAX™ approach eliminated exam tension—she loves science experiments, stage recitals, and her confidence has skyrocketed!",
    author: "Mrs. Priyanka Sharma",
    role: "Parent of Grade 5 Scholar • Saharanpur",
    avatar: "/images/avatars/parent1.jpg",
    rating: 5,
  },
  {
    quote:
      "The dedicated Principal, Chairman Ashok Aggarwal sir, and faculty treat every student like their own child. From safe GPS bus transport to the serene green environment on Behat Road, SHEMFORD is miles ahead of ordinary schools.",
    author: "Mr. Rajeshwar Verma",
    role: "Parent of Prep & Grade 8 Students • Behat Road",
    avatar: "/images/avatars/parent2.jpg",
    rating: 5,
  },
  {
    quote:
      "My son was naturally shy, but the Shemford Cinema sessions and horse riding academy completely transformed him. He speaks fluently on stage and won the inter-school science exhibition last month!",
    author: "Dr. Ananya Goel",
    role: "Parent of Grade 7 Student • Chander Nagar",
    avatar: "/images/avatars/parent3.jpg",
    rating: 5,
  },
];

export default function SchoolLandingPage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Shem Foundation (Play Group - 2+ Yrs)");
  const [message, setMessage] = useState("");
  const [enquirySent, setEnquirySent] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fireSchoolConfetti();
    setEnquirySent(true);

    const text = encodeURIComponent(
      `Namaste SHEMFORD Futuristic School Saharanpur! I am ${parentName} (${phone}), enquiring about admission for ${grade}. ${message} (Campus: Village Meharbani, Behat Road)`
    );

    setTimeout(() => {
      window.open(`https://wa.me/918923490432?text=${text}`, "_blank");
      setEnquirySent(false);
    }, 1500);
  };

  return (
    <div className="relative z-20 w-full bg-[#FAF6F0] text-[#1E2432]">
      {/* =================================================================== */}
      {/* 1. STICKY MAIN NAVBAR                                               */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-black/10 px-4 sm:px-8 lg:px-14 py-3.5 flex items-center justify-between shadow-xs">
        {/* Brand Crest & Title */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/images/shemford/shemford-logo.png"
              alt="SHEMFORD Futuristic School Crest"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-black tracking-tight leading-none text-[#1E2432]">
              SHEM<span className="text-[#FF6B35]">FORD</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B4619]">
              Futuristic School • Saharanpur
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wide text-[#1E2432]/75">
          <a href="#about" className="hover:text-[#0B4619] transition-colors">
            About & Legacy
          </a>
          <a href="#curriculum" className="hover:text-[#0B4619] transition-colors">
            Curriculum
          </a>
          <a href="#facilities" className="hover:text-[#0B4619] transition-colors">
            Facilities
          </a>
          <a href="#virtual-tour" className="hover:text-[#0B4619] transition-colors text-[#0B4619] font-extrabold flex items-center gap-1">
            <span>3D Drone Tour</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
          </a>
          <a href="#leadership" className="hover:text-[#0B4619] transition-colors">
            Leadership
          </a>
          <a href="#gallery" className="hover:text-[#0B4619] transition-colors">
            Gallery
          </a>
          <a href="#testimonials" className="hover:text-[#0B4619] transition-colors">
            Parents Say
          </a>
          <a href="#location" className="hover:text-[#0B4619] transition-colors">
            Visit Campus
          </a>
        </nav>

        {/* Action Button & Contact */}
        <div className="flex items-center gap-3">
          <a
            href="tel:8979001453"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4619] hover:text-emerald-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#0B4619]" />
            <span>897-900-1453</span>
          </a>

          <a
            href="#contact"
            onClick={() => fireSchoolConfetti()}
            className="px-5 py-2.5 rounded-full bg-[#0B4619] hover:bg-[#155a25] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Admissions Open
          </a>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. DOUBLE-DECKER INFINITE KINETIC MARQUEE TICKERS                   */}
      {/* =================================================================== */}
      <div className="w-full bg-[#0B4619] text-white py-2.5 overflow-hidden border-b border-emerald-800 select-none shadow-sm">
        <div className="animate-marquee-left flex items-center whitespace-nowrap">
          {TICKER_ITEMS_1.concat(TICKER_ITEMS_1).map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center mx-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-white/95"
            >
              {item}
              <span className="ml-6 text-amber-300">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="w-full bg-[#FFCA28] text-black py-2 overflow-hidden border-b border-amber-300 select-none shadow-inner">
        <div className="animate-marquee-right flex items-center whitespace-nowrap font-bold text-[11px] sm:text-xs tracking-wider uppercase">
          {TICKER_ITEMS_2.concat(TICKER_ITEMS_2).map((item, idx) => (
            <span key={idx} className="inline-flex items-center mx-6">
              {item}
              <span className="ml-6 text-[#0B4619]">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. HERO SHOWCASE WITH AUTHENTIC CAMPUS MEDIA                       */}
      {/* =================================================================== */}
      <section id="hero" className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-20">
        {/* Glow backdrop */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Admissions Callouts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-[#0B4619] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0B4619] animate-spin" style={{ animationDuration: "5s" }} />
              <span>CBSE Affiliated Senior Secondary (10+2) • Village Meharbani</span>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl lg:text-[62px] font-extrabold leading-[1.08] tracking-tight text-[#1E2432]">
              WHERE <span className="text-[#0B4619] underline decoration-[#FFCA28] decoration-4 underline-offset-8">WONDER</span> SPARKS <br className="hidden sm:inline" />
              LIFELONG <span className="text-[#FF6B35]">EXCELLENCE</span>
            </h1>

            <p className="text-base sm:text-lg text-[#1E2432]/80 leading-relaxed max-w-2xl font-normal">
              Empowering young minds in Saharanpur since 2013. Blending India’s landmark <strong className="text-[#0B4619]">ShemEduMAX™</strong> experiential curriculum with high-tech science labs, equestrian horse riding, and individualised care on a 5-acre green campus.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                onClick={() => fireSchoolConfetti()}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0B4619] hover:bg-[#145d24] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-900/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Enroll For 2026–27</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-neutral-50 text-[#1E2432] font-bold text-sm border border-black/15 shadow-sm transition-all hover:scale-105"
              >
                <span>View Campus Gallery</span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
              </a>
            </div>

            {/* Parent Ratings & Verified Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-black/10 text-xs text-[#1E2432]/75">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-sm">★★★★★</span>
                <span className="font-bold text-[#1E2432]">4.9 / 5</span>
                <span>(300+ Saharanpur Parent Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-[#1E2432]">Zero-Bullying Zone</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Real Campus Photo Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/images/shemford/WhatsApp-Image-2025-03-04-at-2.19.41-PM-scaled-1-1024x768.jpeg"
                alt="SHEMFORD Futuristic School Saharanpur Campus"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Verified Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/20 text-[#0B4619] text-xs font-black shadow-lg flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#FFCA28]" />
                <span>CBSE Senior Secondary (10+2)</span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 inset-x-4 z-10 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#FFCA28]">
                  Official Campus Facade
                </div>
                <h3 className="text-base sm:text-lg font-bold font-[family-name:var(--font-display)]">
                  SHEMFORD Futuristic School, Saharanpur
                </h3>
                <p className="text-xs text-white/80 mt-0.5">
                  Village Meharbani, Behat Road • Safe, Green & Inspiring
                </p>
              </div>
            </div>

            {/* Overlapping Floating Small Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-xl border border-black/10">
              <div className="w-12 h-12 rounded-xl bg-[#0B4619] text-white flex items-center justify-center font-bold text-xl">
                10+
              </div>
              <div className="text-xs">
                <strong className="block text-[#1E2432] font-bold">Years in Saharanpur</strong>
                <span className="text-emerald-700 font-semibold">Empowering 2013–2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pastel / Gradient Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {STAT_CARDS.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.border} border p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
            >
              <div>
                <div className={`font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold ${stat.text}`}>
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-[#1E2432] mt-1">
                  {stat.label}
                </div>
              </div>
              <div className="text-xs text-[#1E2432]/65 font-medium mt-3 pt-3 border-t border-black/5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. ABOUT & FROM THE CHAIRMAN'S DESK (AUTHENTIC CONTENT)            */}
      {/* =================================================================== */}
      <section id="about" className="relative w-full py-20 px-4 sm:px-8 lg:px-12 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-emerald-900/10 text-[#0B4619] text-xs font-extrabold uppercase tracking-widest">
              From The Leadership Desk
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)] tracking-tight mt-3">
              A World in Miniature: Training for Life
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Photo of Campus Gate / Entry */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/shemford/1-e1742491917441.jpg"
                  alt="School Campus Gate & Boulevard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs font-mono text-[#FFCA28]">ESTABLISHED 2013</span>
                  <h4 className="font-bold text-base">Main Campus Entrance & Boulevard</h4>
                </div>
              </div>
            </div>

            {/* Right Message: Chairman Ashok Aggarwal */}
            <div className="lg:col-span-7 space-y-5 bg-[#FAF6F0] p-8 sm:p-10 rounded-3xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#0B4619]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B4619]">
                  From The Chairman’s Desk • Ashok Aggarwal
                </span>
              </div>

              <blockquote className="text-base sm:text-lg text-[#1E2432]/85 italic leading-relaxed font-serif">
                “A school is always a &apos;World in miniature&apos; where one receives a &apos;training for life&apos;, where effective, meaningful and joyful learning takes place. It is here we begin to learn our lessons of life—to accept challenges, face competition, defeat, and failure, and rejoice at victory and success.”
              </blockquote>

              <p className="text-xs sm:text-sm text-[#1E2432]/75 leading-relaxed">
                I dreamt to set up a school in which students are groomed to become responsible citizens of tomorrow, imbued with strong ethical values, scientific temperament, and emotional resilience. At SHEMFORD Futuristic School Saharanpur, every child is nurtured to realize their fullest individual potential.
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-black/10">
                <div>
                  <h4 className="font-bold font-[family-name:var(--font-display)] text-sm text-[#1E2432]">
                    Shri Ashok Aggarwal
                  </h4>
                  <span className="text-xs text-[#0B4619] font-semibold">
                    Chairman, SHEMFORD Group of Futuristic Schools
                  </span>
                </div>
                <div className="text-2xl">✍️</div>
              </div>
            </div>
          </div>

          {/* Dual Leadership Cards: Managing Director & Campus Principal */}
          <div id="leadership" className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            {/* MD Amol Arora */}
            <div className="rounded-3xl bg-[#FAF6F0] p-6 sm:p-8 border border-black/10 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white bg-amber-100">
                <Image
                  src="/md.jpeg"
                  alt="Managing Director Amol Arora"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B35]">
                  National Leadership
                </span>
                <h3 className="font-bold font-[family-name:var(--font-display)] text-xl text-[#1E2432]">
                  Mr. Amol Arora
                </h3>
                <span className="text-xs text-[#0B4619] font-bold block">
                  Managing Director, SHEMFORD Group
                </span>
                <p className="text-xs text-[#1E2432]/75 leading-relaxed italic">
                  “Our 100+ schools across India, Nepal, and Bangladesh represent an unbroken legacy of making learning joyful, practical, and stress-free.”
                </p>
              </div>
            </div>

            {/* Campus Principal */}
            <div className="rounded-3xl bg-[#FAF6F0] p-6 sm:p-8 border border-black/10 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white bg-emerald-100">
                <Image
                  src="/principle.jpeg"
                  alt="Principal Mam - SHEMFORD Saharanpur"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Campus Leadership
                </span>
                <h3 className="font-bold font-[family-name:var(--font-display)] text-xl text-[#1E2432]">
                  Principal Mam
                </h3>
                <span className="text-xs text-[#0B4619] font-bold block">
                  Head of School, Saharanpur Campus
                </span>
                <p className="text-xs text-[#1E2432]/75 leading-relaxed italic">
                  “Every child at our Meharbani campus is mentored with individual attention, small batch sizes, and encouragement to shine both academically and creatively.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. INTERACTIVE ACADEMIC WINGS & CURRICULUM EXPLORER                 */}
      {/* =================================================================== */}
      <InteractiveWings />

      {/* =================================================================== */}
      {/* 6. INFRASTRUCTURE & WORLD-CLASS FACILITIES                         */}
      {/* =================================================================== */}
      <section id="facilities" className="w-full py-24 px-4 sm:px-8 lg:px-12 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-emerald-900/10 text-[#0B4619] text-xs font-extrabold uppercase tracking-widest">
              State of The Art Campus
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)] tracking-tight mt-3">
              Infrastructure Built For Future Innovators
            </h2>
            <p className="mt-4 text-[#1E2432]/75 text-base sm:text-lg leading-relaxed">
              Comprising spacious academic blocks, broad safety staircases, fire safety compliance, hygienic RO drinking water, and lush open sports greens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAMPUS_FACILITIES.map((facility) => (
              <div
                key={facility.title}
                className="group rounded-3xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white flex items-center gap-2">
                      <span className="text-2xl">{facility.icon}</span>
                      <h3 className="font-bold font-[family-name:var(--font-display)] text-lg">
                        {facility.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-[#1E2432]/80 leading-relaxed font-normal">
                      {facility.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4619] hover:text-emerald-700 transition-colors"
                  >
                    <span>Tour this facility</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6.5. 3D AERIAL VIRTUAL CAMPUS FLIGHT (DRONE TOUR)                   */}
      {/* =================================================================== */}
      <section id="virtual-tour" className="relative w-full bg-black text-white">
        {/* Section Intro Banner */}
        <div className="w-full bg-[#0B4619] border-y border-emerald-700 py-12 px-4 sm:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFCA28] text-xs font-bold uppercase tracking-wider">
              <span>🛸 Interactive 3D Drone Flight</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-[family-name:var(--font-display)] tracking-tight">
              Fly Over Our 5-Acre Futuristic Campus
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Experience the lush green grounds, spacious academic blocks, and pollution-free atmosphere along Behat Road from above. Scroll down to steer the flight!
            </p>
          </div>
        </div>

        {/* The 3D Scroll Video Canvas */}
        <ScrollVideoCanvas />
      </section>

      {/* =================================================================== */}
      {/* 7. BRAND-NEW INTERACTIVE SCHOOL GALLERY (20 CURATED LOCAL PHOTOS)    */}
      {/* =================================================================== */}
      <InteractiveGallery />

      {/* =================================================================== */}
      {/* 8. WHAT OUR PARENTS SAY (TESTIMONIALS SLIDER)                      */}
      {/* =================================================================== */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-900/10 text-[#0B4619] text-xs font-extrabold uppercase tracking-widest">
              Saharanpur Parent Voices
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-[#1E2432] leading-tight">
              Why Families Trust SHEMFORD
            </h2>
            <p className="text-sm text-[#1E2432]/75 leading-relaxed">
              Hear directly from parents across Saharanpur, Behat Road, and Meharbani on how their children flourished with ShemEduMAX™.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setTestimonialIdx((prev) =>
                    prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                  )
                }
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-black/15 bg-white hover:bg-[#0B4619] hover:text-white flex items-center justify-center transition-colors shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)
                }
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-black/15 bg-white hover:bg-[#0B4619] hover:text-white flex items-center justify-center transition-colors shadow-sm active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono font-bold text-[#1E2432]/60 ml-2">
                {testimonialIdx + 1} of {TESTIMONIALS.length}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-black/10 relative">
            <div className="flex items-center gap-1 text-amber-500 mb-4">
              {[...Array(TESTIMONIALS[testimonialIdx].rating)].map((_, i) => (
                <span key={i} className="text-base">★</span>
              ))}
            </div>

            <p className="text-base sm:text-lg text-[#1E2432]/85 italic leading-relaxed font-serif">
              “{TESTIMONIALS[testimonialIdx].quote}”
            </p>

            <div className="mt-6 pt-6 border-t border-black/10 flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-600 shrink-0">
                <Image
                  src={TESTIMONIALS[testimonialIdx].avatar}
                  alt={TESTIMONIALS[testimonialIdx].author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E2432] font-[family-name:var(--font-display)]">
                  {TESTIMONIALS[testimonialIdx].author}
                </h4>
                <p className="text-xs text-[#0B4619] font-medium">
                  {TESTIMONIALS[testimonialIdx].role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 9. ADMISSION ENQUIRY & OFFICIAL CONTACT DETAILS                     */}
      {/* =================================================================== */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Desk & Age Guidelines */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/10 text-[#0B4619] text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions Open For 2026–27</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)] tracking-tight leading-tight">
              Begin Your Child&apos;s Journey With Us
            </h2>

            <p className="text-sm sm:text-base text-[#1E2432]/80 leading-relaxed">
              Admissions counseling desk is open from Monday to Saturday at our Meharbani, Behat Road campus.
            </p>

            {/* Direct Official Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Direct Admission Desk</span>
                  <div className="text-sm font-extrabold text-[#1E2432]">+91 89234 90432 / 897-900-1453</div>
                </div>
                <a
                  href="tel:8979001453"
                  className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0B4619] text-xs font-bold hover:bg-emerald-200 transition-colors"
                >
                  Call Now
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Principal&apos;s Office</span>
                  <div className="text-sm font-extrabold text-[#1E2432]">897-900-1454</div>
                </div>
                <a
                  href="tel:8979001454"
                  className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0B4619] text-xs font-bold hover:bg-emerald-200 transition-colors"
                >
                  Contact Office
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Transport & Bus Coordinator</span>
                  <div className="text-sm font-extrabold text-[#1E2432]">897-900-1452 / shemfordsre@gmail.com</div>
                </div>
                <a
                  href="tel:8979001452"
                  className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0B4619] text-xs font-bold hover:bg-emerald-200 transition-colors"
                >
                  Inquire Route
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-black/10">
            <h3 className="text-2xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)]">
              Admission Registration
            </h3>
            <p className="text-xs text-[#1E2432]/70 mt-1">
              Submit details to connect instantly with our Senior Counselor on WhatsApp.
            </p>

            {enquirySent ? (
              <div className="my-8 text-center py-8 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2 animate-bounce" />
                <h4 className="text-lg font-bold text-emerald-900">
                  Enquiry Transmitted!
                </h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Opening WhatsApp to finalize your counseling session...
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E2432] mb-1">
                    Parent / Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Mr. Alok Tyagi"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:bg-white transition-all text-[#1E2432]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2432] mb-1">
                    Mobile / WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 89234XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:bg-white transition-all text-[#1E2432]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2432] mb-1">
                    Admission Seeking For *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:bg-white transition-all text-[#1E2432]"
                  >
                    <option value="Shem Foundation (Play Group - 2+ Yrs)">
                      Shem Foundation (Play Group - 2+ Yrs)
                    </option>
                    <option value="Shem Foundation (Pre-Nursery - 3+ Yrs)">
                      Shem Foundation (Pre-Nursery - 3+ Yrs)
                    </option>
                    <option value="Shem Prep Wing (Nursery & KG - 4+ to 5+ Yrs)">
                      Shem Prep Wing (Nursery & KG - 4+ to 5+ Yrs)
                    </option>
                    <option value="Junior Discovery (Grades 1 to 5)">
                      Junior Discovery (Grades 1 to 5)
                    </option>
                    <option value="Middle School (Grades 6 to 8)">
                      Middle School (Grades 6 to 8)
                    </option>
                    <option value="Secondary (Grades 9 & 10)">
                      Secondary (Grades 9 & 10)
                    </option>
                    <option value="Senior Secondary - Science (Medical / Non-Med)">
                      Senior Secondary - Science (Medical / Non-Med)
                    </option>
                    <option value="Senior Secondary - Commerce & Humanities">
                      Senior Secondary - Commerce & Humanities
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2432] mb-1">
                    Questions / Campus Tour Preference (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about school bus routes, fee concessions, or schedule a campus visit..."
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:bg-white transition-all text-[#1E2432]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#0B4619] hover:bg-[#145d24] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/25 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit & Connect on WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 10. CAMPUS LOCATION MAP                                             */}
      {/* =================================================================== */}
      <section id="location" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-24">
        <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-black/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-emerald-900/10 text-[#0B4619] text-xs font-extrabold uppercase tracking-widest">
                📍 Location & Route
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)] leading-tight">
                Visit Our 5-Acre Campus
              </h2>
              <p className="text-xs sm:text-sm text-[#1E2432]/75 leading-relaxed">
                Situated in an open, pollution-free atmosphere along Behat Road at Village Meharbani, easily reachable within 15–20 minutes from central Saharanpur.
              </p>

              <div className="space-y-2.5 text-xs text-[#1E2432]/85">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-black/5">
                  <MapPin className="w-4 h-4 text-[#0B4619] shrink-0 mt-0.5" />
                  <span><strong>Campus:</strong> Village Meharbani, Behat Road, Saharanpur, UP 247120</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-black/5">
                  <Clock className="w-4 h-4 text-[#0B4619] shrink-0 mt-0.5" />
                  <span><strong>Visiting Hours:</strong> Monday – Saturday: 9:00 AM – 2:30 PM (Sunday Closed)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=SHEMFORD+Futuristic+School+Saharanpur+Behat+Road"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B4619] hover:bg-[#145d24] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-black/10 shadow-inner">
              <iframe
                title="SHEMFORD Futuristic School Saharanpur Location"
                src="https://maps.google.com/maps?q=SHEMFORD%20Futuristic%20School%2C%20Village%20Meharbani%2C%20Behat%20Road%2C%20Saharanpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 11. FOOTER                                                          */}
      {/* =================================================================== */}
      <footer className="w-full bg-[#1E2432] text-white pt-16 pb-10 px-4 sm:px-8 lg:px-12 border-t border-black/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="font-[family-name:var(--font-display)] text-2xl font-black text-white">
              SHEM<span className="text-[#FF6B35]">FORD</span>
            </div>
            <p className="text-xs text-white/70 mt-2 leading-relaxed">
              SHEMFORD Futuristic School, Saharanpur. Empowering young minds since 2013 with academic excellence and ShemEduMAX™ experiential learning.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#FFCA28] font-bold">
              <span>CBSE Affiliated 10+2</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#about" className="hover:text-white transition-colors">About Shemford</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Academic Wings (Pre-Nursery to 12th)</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">Smart Classes & Labs</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Campus Photo Gallery</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Admissions 2026–27</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-3">
              Campus Contact
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <p>📍 Village Meharbani, Behat Road, Saharanpur, UP 247120</p>
              <p>📞 Admission Desk: +91 89234 90432 / 897-900-1453</p>
              <p>📞 Principal Desk: 897-900-1454</p>
              <p>✉️ shemfordsre@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-3">
              Admissions Open 2026–27
            </h4>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              Limited seats across Shem Foundation, Prep Wing, Junior Discovery & Senior Secondary streams.
            </p>
            <a
              href="#contact"
              onClick={() => fireSchoolConfetti()}
              className="inline-block px-5 py-2.5 rounded-full bg-[#FF6B35] hover:bg-[#ff8255] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
            >
              Apply Online Now →
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <span>© 2026 SHEMFORD Futuristic School, Saharanpur. All Rights Reserved.</span>
          <span>Powered by ShemEduMAX™ Learning System</span>
        </div>
      </footer>

      {/* Floating Action Dock (WhatsApp, Call, Map, Quick Apply Modal) */}
      <QuickActionDock />
    </div>
  );
}
