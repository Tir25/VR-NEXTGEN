import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/10" aria-label="Call to action">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Transform your business with VR Next Gen Solutions.
        </h2>
        <Link
          href="/contact"
          aria-label="Contact us"
          className="inline-block bg-gold text-black font-semibold px-6 py-3 rounded shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}


