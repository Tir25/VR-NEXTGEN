import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
const ClientCarousel = dynamic(() => import("@/components/widgets/ClientCarousel"), { ssr: false });
import type { ClientItem } from "@/components/widgets/ClientCarousel";

const items: ClientItem[] = [
  { src: "/vercel.svg", title: "Vercel", caseStudy: "Serverless performance uplift" },
  { src: "/next.svg", title: "Next.js", caseStudy: "DX analytics implementation" },
  { src: "/globe.svg", title: "Global Co.", caseStudy: "International growth strategy" },
  { src: "/window.svg", title: "Window Corp.", caseStudy: "Data pipeline modernization" },
  { src: "/file.svg", title: "FileWorks", caseStudy: "Reporting automation" },
];

export default function ClientsPage() {
  return (
    <Layout title="Our Clients" description="Client successes and partnerships">
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gold">Our Clients</h1>
        </header>
        <p className="max-w-3xl text-white/80 mb-10">
          Explore featured case studies and the brands we partner with.
        </p>
        <ClientCarousel items={items} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <article key={it.title} className="border border-white/10 rounded-lg p-4 bg-black/40">
              <h3 className="text-white font-semibold">{it.title}</h3>
              <p className="text-white/70 text-sm mt-1">{it.caseStudy}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}



