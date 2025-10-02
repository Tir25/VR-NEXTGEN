
export default function CompanyOverview() {
  return (
    <section className="py-16 md:py-24" aria-label="Company overview">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gold">Who We Are</h2>
            <p className="mt-3 text-white/80">
              At VR NextGen Solutions, we are a business consultancy committed to empowering organizations with smart, data-driven strategies. From managing inventory to delivering finished goods, we provide end-to-end coaching and insights that help businesses optimize processes, reduce waste, and boost profitability.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gold">Our Promise</h2>
            <p className="mt-3 text-white/80">
              We don&apos;t just consult; we create pathways for your business to thrive. Every solution is tailored to your unique needs, ensuring sustainable growth and measurable results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


