import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";

// Critical above-the-fold content - load immediately
const Hero = dynamic(() => import("@/components/sections/hero").then(mod => ({ default: mod.Hero })), { 
  ssr: true,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gold text-xl">Loading...</div>
    </div>
  )
});

// Non-critical content - lazy load when in viewport
const Services = dynamic(() => import("@/components/sections/services").then(mod => ({ default: mod.Services })), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-24">
      <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Services...</div>
      </div>
    </div>
  )
});

const Industries = dynamic(() => import("@/components/sections/industries").then(mod => ({ default: mod.Industries })), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-24">
      <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Industries...</div>
      </div>
    </div>
  )
});

const CallToAction = dynamic(() => import("@/components/sections/cta").then(mod => ({ default: mod.CallToAction })), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-20">
      <div className="animate-pulse bg-gold/5 rounded-lg h-64 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Call to Action...</div>
      </div>
    </div>
  )
});


export default function Home() {
  return (
    <Layout title="Home" description="VR NextGEN Solutions – Data-driven consultancy">
      <Hero />
      <LazyWrapper rootMargin="200px">
        <Services />
      </LazyWrapper>
      <LazyWrapper rootMargin="400px">
        <Industries />
      </LazyWrapper>
      <LazyWrapper rootMargin="200px">
        <CallToAction />
      </LazyWrapper>
    </Layout>
  );
}
