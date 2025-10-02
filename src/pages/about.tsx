import Layout from "@/components/layout/Layout";
import {
  AboutHero,
  CompanyOverview,
  OurApproach,
  TeamSection,
  ExpertiseSection,
  CountersSection
} from "@/components/sections";

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



