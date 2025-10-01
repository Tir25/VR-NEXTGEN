import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/sections/about/AboutHero";
import CompanyOverview from "@/components/sections/about/CompanyOverview";
import TeamSection from "@/components/sections/about/TeamSection";
import ExpertiseSection from "@/components/sections/about/ExpertiseSection";
import OurApproach from "@/components/sections/about/OurApproach";
import CountersSection from "@/components/sections/about/CountersSection";

export default function AboutPage() {
  return (
    <Layout title="About" description="About VR NextGEN Solutions">
      <AboutHero />
      <CompanyOverview />
      <OurApproach />
      <TeamSection />
      <ExpertiseSection />
      <CountersSection />
    </Layout>
  );
}



