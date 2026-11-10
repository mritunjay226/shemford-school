"use client";

import { useState } from "react";

const STAT_CARDS = [
  {
    number: "2365+",
    label: "Happy SHEMStars",
    bg: "bg-[#E2F2FE]",
    text: "text-[#1E2432]",
  },
  {
    number: "100+",
    label: "Branches Across India",
    bg: "bg-[#FCEAE3]",
    text: "text-[#1E2432]",
  },
  {
    number: "10K+",
    label: "Parent Satisfaction",
    bg: "bg-[#FFF3D6]",
    text: "text-[#1E2432]",
  },
  {
    number: "10+2",
    label: "CBSE Excellence",
    bg: "bg-[#F9E8EA]",
    text: "text-[#1E2432]",
  },
];

const LEARNING_CLUSTERS = [
  {
    name: "SHEM FOUNDATION",
    subtitle: "Play Group & Pre-Nursery (2+ to 3+ Yrs)",
    circleBg: "bg-[#FF8A3D]",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "SHEM PREP WING",
    subtitle: "Nursery & Preparatory (4+ to 5+ Yrs)",
    circleBg: "bg-[#3DA9FC]",
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "JUNIOR DISCOVERY",
    subtitle: "Grades 1 to 5 • Hands-On Labs",
    circleBg: "bg-[#FFCA28]",
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "SENIOR SCHOLARS",
    subtitle: "Grades 6 to 12 • Science, Commerce & Arts",
    circleBg: "bg-[#6BCB47]",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  },
];

const GALLERY_IMAGES = [
  {
    title: "Collaborative Smart Classrooms",
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Safe GPS Campus Fleet",
    url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Joyful Outdoor Discovery",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Multi-Purpose Science & Robotics Lab",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Athletics & Sports Complex",
    url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Choosing SHEMFORD Futuristic School in Village Meharbani was the best decision for our daughter. The ShemEduMAX™ practical teaching method removed exam fear completely—she now loves science experiments and public speaking!",
    author: "MRS. PRIYANKA SHARMA",
    role: "Parent of Grade 5 SHEMStar • Saharanpur",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  },
  {
    quote:
      "The Principal and faculty treat every child like family. From the clean green campus on Behat Road to the safe school transport and smart classrooms, SHEMFORD truly sets a benchmark in Saharanpur.",
    author: "MR. RAJESHWAR VERMA",
    role: "Parent of Prep Senior & Grade 8 Students",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
  },
];

export default function SchoolLandingPage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Shem Foundation (Play Group - 2+ Yrs)");
  const [message, setMessage] = useState("");

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Namaste SHEMFORD Futuristic School Saharanpur! I am ${parentName} (${phone}), enquiring about admission for ${grade}. ${message}`
    );
    window.open(`https://wa.me/919837027654?text=${text}`, "_blank");
  };

  return (
    <div className="relative z-20 w-full bg-[#FAF6F0] text-[#1E2432] overflow-hidden">


      {/* Main Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF6F0]/95 backdrop-blur-md border-b border-black/5 px-6 sm:px-14 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <div className="flex items-center font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight">
            <span className="text-[#1E2432]">SHEM</span>
            <span className="text-[#FF6B35]">F</span>
            <span className="text-[#3DA9FC]">O</span>
            <span className="text-[#6BCB47]">R</span>
            <span className="text-[#C77DFF]">D</span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#FFE8D6] text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider">
            Saharanpur
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#1E2432]/80">
          <a href="#hero" className="hover:text-[#FF6B35] transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-[#FF6B35] transition-colors">
            About & ShemEduMAX™
          </a>
          <a href="#leadership" className="hover:text-[#FF6B35] transition-colors">
            MD & Principal
          </a>
          <a href="#gallery" className="hover:text-[#FF6B35] transition-colors">
            Campus Life
          </a>
          <a href="#testimonials" className="hover:text-[#FF6B35] transition-colors">
            Parents Say
          </a>
          <a href="#location" className="hover:text-[#FF6B35] transition-colors">
            Campus Map
          </a>
          <a href="#contact" className="hover:text-[#FF6B35] transition-colors">
            Admission
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs font-bold text-[#1E2432]/60 mr-2">
            CBSE 10+2
          </span>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#e85a25] text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-0.5"
          >
            CONTACT US
          </a>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. PLAYFUL HERO SECTION (BOO THEME WITH ORGANIC BLOBS & DOODLES)  */}
      {/* ================================================================= */}
      <section
        id="hero"
        className="relative max-w-7xl mx-auto px-6 sm:px-12 pt-10 pb-20"
      >
        {/* Top Row: Left Headline + Right Orange Blob Boy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 relative">
            <span className="inline-block text-xs font-extrabold uppercase tracking-[0.25em] text-[#FF6B35]">
              WELCOME TO SHEMFORD FUTURISTIC SCHOOL • SAHARANPUR
            </span>

            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl lg:text-[64px] font-bold leading-[1.08] tracking-tight text-[#1E2432]">
              WHERE <span className="text-[#C77DFF]">WONDER</span> AWAKENS{" "}
              <span className="text-[#FF6D7A]">CURIOSITY</span> EVERYDAY
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FF6B35] hover:bg-[#e85a25] text-white font-bold text-sm shadow-[0_10px_25px_rgba(255,107,53,0.35)] transition-all hover:scale-105"
              >
                <span>Apply Admission</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#FF6B35] flex items-center justify-center font-extrabold text-xs">
                  →
                </span>
              </a>

              {/* Parent Reviews Pill */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Parent"
                    className="w-9 h-9 rounded-full border-2 border-[#FAF6F0] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Parent"
                    className="w-9 h-9 rounded-full border-2 border-[#FAF6F0] object-cover"
                  />
                  <div className="w-9 h-9 rounded-full border-2 border-[#FAF6F0] bg-[#FF8A3D] text-white text-[11px] font-bold flex items-center justify-center">
                    10k+
                  </div>
                </div>
                <a
                  href="#testimonials"
                  className="text-xs font-bold underline decoration-[#1E2432]/40 hover:text-[#FF6B35]"
                >
                  Parent Reviews
                </a>
              </div>
            </div>

            {/* Hand-drawn Curved Arrow Doodle */}
            <svg
              className="hidden md:block absolute right-12 -bottom-10 w-16 h-16 text-[#1E2432]"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M15 60 C 35 55, 50 40, 55 15 M55 15 L43 22 M55 15 L63 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Right Orange Framed Student */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Green Set-Square Ruler Doodle */}
            <svg
              className="absolute -top-4 left-4 w-12 h-12 text-[#6BCB47] -rotate-12 z-10"
              viewBox="0 0 64 64"
              fill="currentColor"
            >
              <path
                d="M8 8 L56 56 L8 56 Z M16 28 L16 48 L36 48 Z"
                stroke="#1E2432"
                strokeWidth="3"
              />
            </svg>

            {/* Blue Calculator Doodle */}
            <div className="absolute top-6 right-2 z-10 w-11 h-12 rounded-xl bg-[#3DA9FC] border-2 border-[#1E2432] p-1.5 rotate-12 shadow-md">
              <div className="w-full h-3 bg-white rounded border border-[#1E2432] mb-1" />
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-1.5 bg-white rounded-sm" />
                ))}
              </div>
            </div>

            <div className="relative w-72 sm:w-80 h-80 sm:h-96 rounded-[2.5rem] bg-[#FF8A3D] overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80"
                alt="Happy SHEMFORD Student"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Bottom Hero Row: Left Blue Framed Girl + Right Description & 4 Pastel Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mt-10">
          {/* Left Blue Organic Shape Student */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Pencil Cup Doodle */}
            <div className="absolute -top-6 right-6 z-10 bg-[#FF85A1] border-2 border-[#1E2432] px-2.5 py-2 rounded-xl rotate-6 shadow">
              <span className="text-lg">✏️📏</span>
            </div>

            <div className="relative w-72 sm:w-80 h-80 sm:h-96 rounded-[2.5rem] bg-[#3DA9FC] overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
                alt="SHEMStar Girl Student"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Dark Circular School Stamp Badge at Bottom-Left */}
            <div className="absolute -bottom-6 left-2 sm:left-6 w-24 h-24 rounded-full bg-[#1E2432] border-4 border-[#FFCA28] text-white flex flex-col items-center justify-center text-center p-2 shadow-xl">
              <span className="text-lg">🏫</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFCA28] leading-tight mt-0.5">
                Every Child Is A Star
              </span>
            </div>
          </div>

          {/* Right Description & 4 Pastel Counter Cards */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-sm sm:text-base text-[#1E2432]/75 leading-relaxed max-w-2xl">
              Located in a lush, pollution-free environment at{" "}
              <strong className="text-[#1E2432]">
                Village Meharbani, Pargana, Behat Road, Saharanpur
              </strong>
              , SHEMFORD Futuristic School is the Senior School Chain of{" "}
              <strong className="text-[#1E2432]">SHEMROCK</strong> (India’s oldest preschool chain). Powered by our in-house{" "}
              <strong className="text-[#FF6B35]">ShemEduMAX™</strong> learning system, we blend stress-free practical discovery with academic excellence.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STAT_CARDS.map((card) => (
                <div
                  key={card.label}
                  className={`${card.bg} ${card.text} p-6 rounded-2xl text-center shadow-sm hover:-translate-y-1 transition-transform`}
                >
                  <div className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold">
                    {card.number}
                  </div>
                  <div className="text-xs font-semibold opacity-75 mt-1">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. COLORFUL SCHOOL / ACCREDITATION RIBBON                         */}
      {/* ================================================================= */}
      <div className="w-full border-y border-black/5 bg-white/60 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs sm:text-sm font-[family-name:var(--font-display)] font-bold tracking-wide">
          <span className="flex items-center gap-2 text-[#3DA9FC]">
            📖 ShemEduMAX™ System
          </span>
          <span className="flex items-center gap-2 text-[#FF6B35]">
            🏛️ CBSE 10+2 Curriculum
          </span>
          <span className="flex items-center gap-2 text-[#6BCB47]">
            🌱 SHEMROCK Legacy (Est. 1989)
          </span>
          <span className="flex items-center gap-2 text-[#C77DFF]">
            🔬 Multi-Purpose Robotics & Science Labs
          </span>
          <span className="flex items-center gap-2 text-[#FF8A3D]">
            ⭐ 100+ Branches in 18 States
          </span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 4. NURTURING YOUNG MINDS, ONE LESSON AT A TIME (4 CIRCULAR PODS)  */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#1E2432]">
          NURTURING YOUNG MINDS, <br />
          ONE LESSON AT A TIME
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14">
          {LEARNING_CLUSTERS.map((pod) => (
            <div
              key={pod.name}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`relative w-52 h-52 rounded-full ${pod.circleBg} overflow-hidden border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105`}
              >
                <img
                  src={pod.img}
                  alt={pod.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#1E2432] mt-5 uppercase">
                {pod.name}
              </h3>
              <p className="text-xs font-medium text-[#1E2432]/65 mt-1 max-w-[200px]">
                {pod.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Orange Slider Indicator Line */}
        <div className="w-40 h-1 bg-[#FF6B35]/25 rounded-full mx-auto mt-12 overflow-hidden">
          <div className="w-1/2 h-full bg-[#FF6B35] rounded-full" />
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. BLUE PROMO BANNER + 4 PILLARS + ABOUT & SCHOOL TIMING SECTION  */}
      {/* ================================================================= */}
      <section id="about" className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        {/* Split Kids Activity Banner */}
        <div className="relative rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#388EBD] text-white shadow-xl">
          <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
              alt="SHEMFORD Students Learning Together"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-4 relative">
            {/* Paper Airplane Doodle */}
            <svg
              className="w-12 h-12 text-white/90 absolute top-4 right-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>

            <span className="text-xs font-bold uppercase tracking-widest text-[#FFCA28]">
              EXPERIENTIAL LEARNING • SHEMEDUMAX™
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold leading-tight">
              PRACTICAL HANDS-ON LABS, ROBOTICS & CREATIVE ARTS
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              More emphasis is laid on practical teaching than theoretical notes so children correlate every concept in Maths & Science with real life.
            </p>
          </div>
        </div>

        {/* 4 Icon Feature Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-14 border-b border-black/5 text-center">
          <div className="px-4 space-y-2 border-r border-black/5 last:border-none">
            <div className="text-2xl">🧠</div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase">
              SHEMEDUMAX™ SYSTEM
            </h4>
            <p className="text-xs text-[#1E2432]/65">
              Nurturing emotional intelligence, critical thinking, and creativity.
            </p>
          </div>
          <div className="px-4 space-y-2 lg:border-r border-black/5">
            <div className="text-2xl">🚌</div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase">
              SAFE HOME PICKUP
            </h4>
            <p className="text-xs text-[#1E2432]/65">
              Dedicated bus routes connecting Saharanpur & Behat Road villages.
            </p>
          </div>
          <div className="px-4 space-y-2 border-r border-black/5">
            <div className="text-2xl">💻</div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase">
              SMART CLASSROOMS
            </h4>
            <p className="text-xs text-[#1E2432]/65">
              Interactive digital multimedia classrooms & multi-purpose labs.
            </p>
          </div>
          <div className="px-4 space-y-2">
            <div className="text-2xl">🌍</div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase">
              GLOBAL SHEMSTARS
            </h4>
            <p className="text-xs text-[#1E2432]/65">
              100+ branches across 18 Indian states, Nepal & Bangladesh.
            </p>
          </div>
        </div>

        {/* About & School Timing Block with Blue Organic Blob */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16 relative">
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-[#0F5499] overflow-hidden border-4 border-white shadow-xl flex items-end justify-center">
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80"
                alt="SHEMStar with Tablet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B35]">
              ABOUT SHEMFORD SAHARANPUR
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1E2432] uppercase">
              SCHOOL TIMING & HOLISTIC VISION
            </h2>
            <p className="text-sm sm:text-base text-[#1E2432]/75 leading-relaxed">
              At SHEMFORD Futuristic School – Meharbani, Pargana, Saharanpur, we focus on building life skills that help children develop sound judgement and good habits for long-term stability, health, and success.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3">
              <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm">
                <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase text-[#1E2432] mb-1">
                  ⏰ CAMPUS & OFFICE HOURS
                </h4>
                <p className="text-xs text-[#1E2432]/70">
                  Summer: 07:50 AM – 02:00 PM
                </p>
                <p className="text-xs text-[#1E2432]/70">
                  Winter: 08:20 AM – 02:30 PM
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm">
                <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase text-[#1E2432] mb-1">
                  📞 DIRECT CAMPUS DESK
                </h4>
                <p className="text-xs text-[#1E2432]/70">
                  Email: saharanpur@shemford.com
                </p>
                <p className="text-xs font-bold text-[#FF6B35]">
                  Phone: +91 9837027654
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#e85a25] transition-all"
              >
                Schedule Campus Visit →
              </a>
            </div>
          </div>

          {/* Orange Basketball Doodle */}
          <div className="hidden sm:flex absolute right-4 -bottom-5 w-12 h-12 rounded-full bg-[#FF6B35] border-2 border-[#1E2432] items-center justify-center text-xl shadow">
            🏀
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. MD & PRINCIPAL LEADERSHIP SECTION (SURPRISE FOR THE PRINCIPAL) */}
      {/* ================================================================= */}
      <section
        id="leadership"
        className="w-full bg-[#F4ECE1] py-20 px-6 sm:px-12 border-y border-black/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="px-3.5 py-1 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] text-xs font-extrabold uppercase tracking-widest">
              VISIONARY LEADERSHIP
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold text-[#1E2432] uppercase">
              GUIDING EVERY CHILD TO BECOME A STAR
            </h2>
            <p className="text-sm text-[#1E2432]/70">
              Meet the educational pioneers behind SHEMFORD’s national pedagogical research and our dedicated Saharanpur Campus leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 1: Managing Director */}
            <div className="rounded-[2.5rem] bg-[#FAF6F0] p-8 sm:p-10 border-2 border-white shadow-xl flex flex-col sm:flex-row gap-7 items-center">
              <div className="relative shrink-0">
                <div className="w-40 h-48 sm:w-44 sm:h-52 rounded-[2rem] bg-[#FF8A3D] overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="/md.jpeg"
                    alt="Managing Director - SHEMFORD Group"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1E2432] text-[#FFCA28] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow">
                  Managing Director
                </span>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B35]">
                  THE MD’S DESK • SHEMFORD GROUP
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#1E2432]">
                  Mr. Amol Arora
                </h3>
                <p className="text-xs sm:text-sm text-[#1E2432]/75 leading-relaxed italic">
                  “When we launched SHEMFORD as the senior wing of SHEMROCK, our mission was clear: create a school where children wake up excited to learn every morning. Through ShemEduMAX™, we empower Saharanpur’s children with 21st-century life skills, curiosity, and confidence.”
                </p>
                <div className="pt-2 text-[11px] font-bold text-[#1F4E3D]">
                  ✓ 100+ Schools Across 18 States, Nepal & Bangladesh
                </div>
              </div>
            </div>

            {/* Card 2: The Principal (Saharanpur Campus) */}
            <div className="rounded-[2.5rem] bg-[#FAF6F0] p-8 sm:p-10 border-2 border-white shadow-xl flex flex-col sm:flex-row gap-7 items-center">
              <div className="relative shrink-0">
                <div className="w-40 h-48 sm:w-44 sm:h-52 rounded-[2rem] bg-[#3DA9FC] overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="/principle.jpeg"
                    alt="Principal - SHEMFORD Futuristic School Saharanpur"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FF6B35] text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow">
                  Campus Principal
                </span>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#3DA9FC]">
                  PRINCIPAL’S MESSAGE • SAHARANPUR
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#1E2432]">
                  The Principal
                </h3>
                <p className="text-xs sm:text-sm text-[#1E2432]/75 leading-relaxed italic">
                  “At SHEMFORD Futuristic School, Village Meharbani, every child is unique. We do not merely prepare students for board examinations—we nurture compassionate thinkers, innovators, and disciplined leaders who bring pride to their families and nation.”
                </p>
                <div className="pt-2 text-[11px] font-bold text-[#1F4E3D]">
                  ✓ Personalized Mentorship & Stress-Free Learning Environment
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. STUDENT GALLERY STRIP                                          */}
      {/* ================================================================= */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase text-[#1E2432]">
            STUDENT GALLERY & CAMPUS LIFE
          </h2>
          <p className="text-xs sm:text-sm text-[#1E2432]/65 mt-2">
            Moments of joy, scientific discovery, and athletic triumph at SHEMFORD Saharanpur.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.title}
              className="group relative h-52 sm:h-60 rounded-2xl overflow-hidden shadow-md border-2 border-white"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
                <span className="text-white text-xs font-bold leading-tight block">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. WHAT OUR HAPPY PARENTS SAY (TESTIMONIALS)                      */}
      {/* ================================================================= */}
      <section
        id="testimonials"
        className="max-w-7xl mx-auto px-6 sm:px-12 py-16 border-t border-black/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B35]">
              10,000+ PARENTS TRUST US
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold uppercase text-[#1E2432]">
              WHAT OUR HAPPY PARENTS SAY
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2432]/70">
              Hear directly from families across Saharanpur, Behat Road, and Meharbani about their children’s transformation.
            </p>
          </div>

          <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 sm:p-10 shadow-lg border border-black/5 relative flex flex-col sm:flex-row items-center gap-6">
            <img
              src={TESTIMONIALS[testimonialIdx].avatar}
              alt={TESTIMONIALS[testimonialIdx].author}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#E2F2FE] shrink-0"
            />

            <div className="space-y-3">
              <p className="text-sm sm:text-base text-[#1E2432]/80 italic leading-relaxed">
                “{TESTIMONIALS[testimonialIdx].quote}”
              </p>
              <div>
                <span className="font-[family-name:var(--font-display)] font-bold text-sm text-[#1E2432]">
                  {TESTIMONIALS[testimonialIdx].author}
                </span>
                <span className="text-xs text-[#FF6B35] font-semibold ml-2">
                  — {TESTIMONIALS[testimonialIdx].role}
                </span>
              </div>
            </div>

            {/* Giant Quote Mark & Prev/Next Buttons */}
            <div className="sm:ml-auto flex sm:flex-col items-center justify-between gap-4">
              <span className="font-serif text-5xl text-[#FF8A3D]/30 leading-none select-none">
                ”
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIdx((prev) =>
                      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                    )
                  }
                  className="w-9 h-9 rounded-full border border-black/15 hover:bg-[#FF6B35] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)
                  }
                  className="w-9 h-9 rounded-full border border-black/15 hover:bg-[#FF6B35] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. SKY-BLUE BUS TIMING & SAFE TRANSPORT BANNER                    */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="rounded-[2.5rem] bg-[#D9EEFD] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 rounded-full bg-white text-[#0F5499] text-xs font-bold uppercase tracking-wider">
              🚌 GPS-Enabled School Fleet
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase text-[#1E2432]">
              SAFE BUS TIMING & DOORSTEP CONNECTIVITY
            </h3>
            <p className="text-xs sm:text-sm text-[#1E2432]/75 leading-relaxed max-w-xl">
              Our verified yellow school bus fleet covers Village Meharbani, Pargana, Behat Road, and major residential sectors across Saharanpur with trained attendants and CCTV monitoring.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <strong className="block uppercase text-[#1E2432]">
                  MORNING PICKUP WINDOW
                </strong>
                <span className="text-[#1E2432]/70">
                  06:45 AM – 07:45 AM (Route Wise)
                </span>
              </div>
              <div>
                <strong className="block uppercase text-[#1E2432]">
                  TRANSPORT HELPLINE
                </strong>
                <span className="text-[#FF6B35] font-bold">
                  +91 9837027654 • saharanpur@shemford.com
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=700&q=80"
              alt="Yellow School Bus"
              className="w-full max-w-sm h-52 object-cover rounded-2xl shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 10. ADMISSIONS CRITERIA & CONTACT SECTION                         */}
      {/* ================================================================= */}
      <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Official Age Criteria & Documents */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B35]">
              ADMISSIONS OPEN 2026–27
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold uppercase text-[#1E2432]">
              OFFICIAL AGE CRITERIA & ADMISSION PROCESS
            </h2>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-black/5 space-y-3">
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[#1E2432]">
                🎂 Minimum Age Eligibility
              </h3>
              <div className="divide-y divide-black/5 text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between">
                  <span>Shem Foundation (Play Group)</span>
                  <strong className="text-[#FF6B35]">2+ Years</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>Shem Foundation (Pre-Nursery)</span>
                  <strong className="text-[#FF6B35]">3+ Years</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>Shem Prep Junior / Nursery</span>
                  <strong className="text-[#FF6B35]">4+ Years</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>Shem Prep Senior / Preparatory</span>
                  <strong className="text-[#FF6B35]">5+ Years</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>Grade 1 to Senior Secondary (10+2)</span>
                  <strong className="text-[#1F4E3D]">6+ Years Onwards</strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-[#FFF3D6]">
                <strong className="font-[family-name:var(--font-display)] text-sm block mb-1.5">
                  📋 Documents Required
                </strong>
                <p>• Birth Certificate from a civic body (proof of age).</p>
                <p className="mt-1">
                  • Two passport-sized photographs at registration.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#E2F2FE]">
                <strong className="font-[family-name:var(--font-display)] text-sm block mb-1.5">
                  🤝 3-Step Counseling Process
                </strong>
                <p>1. Shortlisting & phone/in-person intimation.</p>
                <p>2. Parent counseling session on campus.</p>
                <p>3. Fee receipt & admission record entry.</p>
              </div>
            </div>
          </div>

          {/* Right: Direct Admission Form */}
          <form
            onSubmit={handleEnquirySubmit}
            className="lg:col-span-6 bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-black/5 space-y-5"
          >
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#1E2432]">
              ENQUIRE FOR ADMISSION
            </h3>
            <p className="text-xs text-[#1E2432]/65">
              Fill in your details below to schedule a campus tour and counseling session at Village Meharbani, Behat Road, Saharanpur.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1.5">
                  Parent’s Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Mr. / Mrs. Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-black/10 text-sm focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-black/10 text-sm focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5">
                Select Program / Grade *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-black/10 text-sm focus:outline-none focus:border-[#FF6B35]"
              >
                <option>Shem Foundation (Play Group - 2+ Yrs)</option>
                <option>Shem Foundation (Pre-Nursery - 3+ Yrs)</option>
                <option>Shem Prep Junior / Nursery (4+ Yrs)</option>
                <option>Shem Prep Senior / Preparatory (5+ Yrs)</option>
                <option>Grade 1 to Grade 5 (Primary Wing)</option>
                <option>Grade 6 to Grade 12 (Middle & Senior Wing)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5">
                Message / Question (Optional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about fee structure, bus route, or scholarship..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-black/10 text-sm focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#FF6B35] hover:bg-[#e85a25] text-white font-bold text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(255,107,53,0.35)] transition-all"
            >
              Submit Admission Enquiry →
            </button>
          </form>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 11. CAMPUS LOCATION & GOOGLE MAP SECTION                          */}
      {/* ================================================================= */}
      <section
        id="location"
        className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-20"
      >
        <div className="rounded-[2.5rem] bg-white p-6 sm:p-10 shadow-xl border border-black/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Location & Route Guide Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="px-3.5 py-1 rounded-full bg-[#E2F2FE] text-[#3DA9FC] text-xs font-extrabold uppercase tracking-widest">
                📍 VISIT OUR CAMPUS
              </span>

              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#1E2432] leading-tight">
                FIND SHEMFORD SAHARANPUR
              </h2>

              <p className="text-xs sm:text-sm text-[#1E2432]/75 leading-relaxed">
                Our serene, pollution-free campus is conveniently situated on Behat Road near Village Meharbani, easily accessible with daily transport from all key sectors across Saharanpur.
              </p>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF6F0]">
                  <span className="text-xl">🏫</span>
                  <div>
                    <strong className="block text-[#1E2432] font-bold">Campus Address:</strong>
                    <span className="text-[#1E2432]/75 leading-relaxed">
                      Village Meharbani (Pargana), Behat Road, Near Chander Nagar, Saharanpur, UP – 247120
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF6F0]">
                  <span className="text-xl">🚌</span>
                  <div>
                    <strong className="block text-[#1E2432] font-bold">Safe GPS Transport Fleet:</strong>
                    <span className="text-[#1E2432]/75">
                      Dedicated speed-governed bus routes covering city neighborhoods and nearby rural sectors.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF6F0]">
                  <span className="text-xl">⏰</span>
                  <div>
                    <strong className="block text-[#1E2432] font-bold">Visiting & Office Hours:</strong>
                    <span className="text-[#1E2432]/75">
                      Monday to Saturday: 9:00 AM – 2:30 PM (Sunday Closed)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=SHEMFORD+Futuristic+School+Village+Meharbani+Behat+Road+Saharanpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF6B35] hover:bg-[#e85a25] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105"
                >
                  <span>Get Driving Directions</span>
                  <span>↗</span>
                </a>

                <a
                  href="tel:+919837027654"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF6F0] hover:bg-[#FFE8D6] text-[#1E2432] text-xs font-bold border border-black/10 transition-colors"
                >
                  <span>📞 Call Desk</span>
                </a>
              </div>
            </div>

            {/* Right: Interactive Google Map Iframe */}
            <div className="lg:col-span-7 h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border-2 border-black/5 shadow-inner relative">
              <iframe
                title="SHEMFORD Futuristic School Saharanpur Campus Map"
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

      {/* ================================================================= */}
      {/* 12. 4-COLUMN FOOTER (MATCHING REFERENCE BOTTOM BAR)               */}
      {/* ================================================================= */}
      <footer className="w-full bg-white border-t border-black/10 pt-14 pb-8 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-black/5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full border-2 border-[#1E2432] flex items-center justify-center text-lg shrink-0">
              💬
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase">
                HAVING QUERIES?
              </h4>
              <p className="text-xs text-[#1E2432]/65 mt-1">
                Admissions Counseling Desk open Mon–Sat for parents.
              </p>
            </div>
          </div>

          <a
            href="#location"
            className="flex items-start gap-4 group hover:bg-[#FAF6F0] p-2.5 -m-2.5 rounded-2xl transition-colors"
          >
            <div className="w-11 h-11 rounded-full border-2 border-[#1E2432] flex items-center justify-center text-lg shrink-0 group-hover:bg-[#FF6B35] group-hover:text-white group-hover:border-[#FF6B35] transition-colors">
              📍
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase group-hover:text-[#FF6B35] transition-colors">
                LOCATE US (VIEW MAP)
              </h4>
              <p className="text-xs text-[#1E2432]/65 mt-1">
                Village Meharbani, Pargana, Behat Road, Distt. Saharanpur, UP
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full border-2 border-[#1E2432] flex items-center justify-center text-lg shrink-0">
              📞
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase">
                CALL US TODAY
              </h4>
              <p className="text-xs text-[#1E2432]/65 mt-1">
                Saharanpur Desk: +91 9837027654 <br />
                HO Helpline: +91 9871094906
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full border-2 border-[#1E2432] flex items-center justify-center text-lg shrink-0">
              ✉️
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase">
                GET IN INBOX
              </h4>
              <p className="text-xs text-[#1E2432]/65 mt-1">
                saharanpur@shemford.com <br />
                marketing@shemford.com
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#1E2432]/60">
          <span>
            © 2026 SHEMFORD Futuristic School, Saharanpur (Village Meharbani, Behat Road). All Rights Reserved.
          </span>
          <span>Powered by ShemEduMAX™ Learning System</span>
        </div>
      </footer>
    </div>
  );
}