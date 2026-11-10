import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title:
    "SHEMFORD Futuristic School, Saharanpur | Best CBSE School in Village Meharbani, Behat Road",
  description:
    "Official portal of SHEMFORD Futuristic School, Saharanpur (near Village Meharbani, Behat Road). CBSE affiliated Senior Secondary (10+2) with ShemEduMAX™ curriculum, smart classes, modern labs, and expansive sports campus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${jakarta.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="bg-[#FAF6F0] text-[#1E2432] font-[family-name:var(--font-sans)] antialiased selection:bg-[#FF6B35]/20 selection:text-[#FF6B35] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}