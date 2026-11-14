import ScrollVideoCanvas from "@/components/ScrollVideoCanvas";
import SchoolLandingPage from "@/components/SchoolLandingPage";

export const metadata = {
  title:
    "SHEMFORD Futuristic School, Saharanpur | Best CBSE School in Village Meharbani, Behat Road",
  description:
    "Official portal of SHEMFORD Futuristic School, Saharanpur (near Village Meharbani, Behat Road). CBSE affiliated Senior Secondary (10+2) with ShemEduMAX™ curriculum, smart classes, modern labs, and expansive sports campus.",
};

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#FAF6F0]">
      {/* ================================================================= */}
      {/* 1. TOP FOREST-GREEN ANNOUNCEMENT BAR                              */}
      {/* ================================================================= */}
      <div className="relative z-50 w-full bg-[#1F4E3D] text-white text-xs py-2.5 px-4 sm:px-12 flex flex-wrap items-center justify-between gap-2 shadow-md">
        <div className="flex items-center gap-3">
          <span className="opacity-80">Follow SHEMFORD Saharanpur:</span>
          <a href="#contact" className="hover:text-[#FFCA28] transition-colors">
            Facebook
          </a>
          <span>•</span>
          <a href="#contact" className="hover:text-[#FFCA28] transition-colors">
            Instagram
          </a>
          <span>•</span>
          <a href="#contact" className="hover:text-[#FFCA28] transition-colors">
            YouTube
          </a>
        </div>

        <div className="font-medium tracking-wide text-center">
          🎉 <span className="text-[#FFCA28] font-bold">Admissions Open 2026–27!</span> Enroll Your Child Today at Village Meharbani, Behat Road Campus 🎉
        </div>

        <div className="hidden xl:flex items-center gap-4 font-[family-name:var(--font-mono)] text-[11px]">
          <a href="tel:8979001453" className="hover:text-[#FFCA28]">
            📞 897-900-1453
          </a>
          <span>|</span>
          <a href="tel:8923490432" className="hover:text-[#FFCA28]">
            📱 89234 90432
          </a>
          <span>|</span>
          <a href="mailto:shemfordsre@gmail.com" className="hover:text-[#FFCA28]">
            ✉️ shemfordsre@gmail.com
          </a>
        </div>
      </div>

      {/* 2. Full-screen 3D Scroll Video Experience */}
      <ScrollVideoCanvas />

      {/* 3. Warm Playful School Landing Page */}
      <SchoolLandingPage />
    </main>
  );
}
