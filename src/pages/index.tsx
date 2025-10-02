import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import { Hero, Services, WhyChooseUs, CTABanner } from "@/components/sections";
const ClientCarousel = dynamic(() => import("@/components/widgets/ClientCarousel"), { ssr: false });
import type { ClientItem } from "@/components/widgets/ClientCarousel";

export default function Home() {
  const homeLogos: ClientItem[] = [
    { src: "/vercel.svg", title: "Vercel" },
    { src: "/next.svg", title: "Next.js" },
    { src: "/globe.svg", title: "Global Co." },
    { src: "/window.svg", title: "Window Corp." },
    { src: "/file.svg", title: "FileWorks" },
  ];
  
  return (
    <Layout title="Home" description="VR NextGEN Solutions – Data-driven consultancy">
      <Hero />
      <Services />
      <WhyChooseUs />
      <ClientCarousel items={homeLogos} />
      <CTABanner />
    </Layout>
  );
}
