import ScrollVideoCanvas from "@/components/ScrollVideoCanvas";

export const metadata = {
  title: "Scroll Video Experience",
  description: "Ultra-smooth 60fps scroll-driven video background powered by extracted frame sequences",
};

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <ScrollVideoCanvas />
    </main>
  );
}
