"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  MessageCircle,
  PhoneCall,
  MapPin,
  Sparkles,
  Send,
  X,
  FileCheck2,
} from "lucide-react";

export function fireSchoolConfetti() {
  if (typeof window === "undefined") return;

  // Dual-cannon colorful celebration confetti
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7, x: 0.3 },
    colors: ["#0B4619", "#FFCA28", "#FF6B35", "#00E5FF", "#FFFFFF"],
  });

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7, x: 0.7 },
    colors: ["#0B4619", "#FFCA28", "#FF6B35", "#00E5FF", "#FFFFFF"],
  });
}

export default function QuickActionDock() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Shem Foundation (Playgroup / Pre-Nursery)");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fireSchoolConfetti();
    setSubmitted(true);

    const message = encodeURIComponent(
      `Namaste SHEMFORD Futuristic School Saharanpur! I am ${name} (${phone}), requesting urgent admission details for ${grade}. (Sent via Official Website)`
    );

    setTimeout(() => {
      window.open(`https://wa.me/918923490432?text=${message}`, "_blank");
      setSubmitted(false);
      setModalOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Pill */}
      <aside
        aria-label="Quick Admissions and Contact Dock"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all hover:scale-105"
      >
        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/918923490432?text=Namaste%20SHEMFORD%20Saharanpur%2C%20I%20would%20like%20to%20enquire%20about%20Admissions%202026-27"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (+91 89234 90432)"
          className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Direct Call Desk */}
        <a
          href="tel:8979001453"
          title="Call Admission Desk: 897-900-1453"
          className="w-10 h-10 rounded-full bg-[#1F4E3D] hover:bg-[#0B4619] text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
        >
          <PhoneCall className="w-5 h-5" />
        </a>

        {/* Google Maps Directions */}
        <a
          href="https://maps.google.com/?q=SHEMFORD+Futuristic+School+Saharanpur+Behat+Road"
          target="_blank"
          rel="noopener noreferrer"
          title="Campus Directions: Village Meharbani, Behat Road"
          className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-transform active:scale-95 shadow-sm"
        >
          <MapPin className="w-5 h-5" />
        </a>

        {/* Quick Admission Form Trigger */}
        <button
          type="button"
          onClick={() => {
            setModalOpen(true);
            fireSchoolConfetti();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8A3D] text-white text-xs font-extrabold tracking-wide uppercase shadow-[0_2px_12px_rgba(255,107,53,0.4)] hover:brightness-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "4s" }} />
          <span>Apply Now</span>
        </button>
      </aside>

      {/* Quick Admission Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span className="text-xs uppercase font-extrabold text-[#0B4619] tracking-wider">
                Admissions Open 2026–27
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-[#1E2432] font-[family-name:var(--font-display)]">
              Express Admission Enquiry
            </h3>

            <p className="mt-1 text-xs sm:text-sm text-[#1E2432]/70">
              Village Meharbani, Behat Road Campus • CBSE Affiliated (10+2)
            </p>

            {submitted ? (
              <div className="my-8 text-center py-6 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in zoom-in-95">
                <FileCheck2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-lg font-bold text-emerald-800">
                  Enquiry Registered!
                </h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Connecting to our Admissions Counselor on WhatsApp...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E2432] mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:bg-white transition-all text-[#1E2432]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2432] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98370XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:bg-white transition-all text-[#1E2432]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2432] mb-1">
                    Grade Seeking Admission *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:bg-white transition-all text-[#1E2432]"
                  >
                    <option value="Shem Foundation (Playgroup / Pre-Nursery)">
                      Shem Foundation (2+ to 3+ Yrs)
                    </option>
                    <option value="Shem Prep Wing (Nursery & Prep)">
                      Shem Prep Wing (4+ to 5+ Yrs)
                    </option>
                    <option value="Junior Discovery (Grades 1 to 5)">
                      Junior Discovery (Grades 1 to 5)
                    </option>
                    <option value="Middle School (Grades 6 to 8)">
                      Middle School (Grades 6 to 8)
                    </option>
                    <option value="Secondary School (Grades 9 & 10)">
                      Secondary School (Grades 9 & 10)
                    </option>
                    <option value="Senior Secondary - Science (Medical / Non-Med)">
                      Senior Secondary - Science (Medical / Non-Med)
                    </option>
                    <option value="Senior Secondary - Commerce & Humanities">
                      Senior Secondary - Commerce & Humanities
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#0B4619] hover:bg-[#145d24] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-emerald-900/25 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Connect via WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-[#1E2432]/60 mt-2">
                  🔒 Your contact information is kept strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
