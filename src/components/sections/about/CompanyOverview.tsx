import { StaggeredReveal, staggerChildrenVariants } from "@/components/common";
import { motion } from "framer-motion";

export default function CompanyOverview() {
  return (
    <section className="py-16 md:py-24" aria-label="Company overview">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <StaggeredReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={staggerChildrenVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-gold">Who We Are</h2>
            <p className="mt-3 text-white/80">
              At VR NextGen Solutions, we are a business consultancy committed to empowering organizations with smart, data-driven strategies. From managing inventory to delivering finished goods, we provide end-to-end coaching and insights that help businesses optimize processes, reduce waste, and boost profitability.
            </p>
          </motion.div>
          <motion.div variants={staggerChildrenVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-gold">Our Promise</h2>
            <p className="mt-3 text-white/80">
              We don&apos;t just consult; we create pathways for your business to thrive. Every solution is tailored to your unique needs, ensuring sustainable growth and measurable results.
            </p>
          </motion.div>
        </StaggeredReveal>
      </div>
    </section>
  );
}


