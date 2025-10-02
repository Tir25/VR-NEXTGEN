import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/sections/hero/Hero"), { ssr: true });
import Services from "@/components/sections/services/Services";
import WhyChooseUs from "@/components/sections/why-choose-us/WhyChooseUs";
const ClientCarousel = dynamic(() => import("@/components/widgets/ClientCarousel"), { ssr: false });
import type { ClientItem } from "@/components/widgets/ClientCarousel";
import CTABanner from "@/components/sections/cta/CTABanner";

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
