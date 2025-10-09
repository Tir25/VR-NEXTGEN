import Link from "next/link";
import { Button, Container } from "@/components/common";

export default function CTABanner() {
  return (
    <section id="cta" className="section-hero py-12 md:py-16 bg-black border-t border-white/10" aria-label="Call to action">
      <Container size="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Transform your business with VR NextGen Solutions.
          </h2>
          <Link href="/contact" aria-label="Contact us">
            <Button variant="primary" size="md">
              Contact
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}


