import Layout from "@/components/layout/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialIcon from "@/components/common/SocialIcons";
import Button from "@/components/common/Button";
import { COMPANY_INFO } from "@/utils/constants";
import { sanitizeInput } from "@/utils/security";

const ContactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .refine((val) => sanitizeInput(val).length > 0, "Invalid characters in name"),
  email: z.string()
    .email("Valid email required")
    .max(254, "Email is too long"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long")
    .refine((val) => sanitizeInput(val).length > 0, "Invalid characters in message"),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(ContactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Sanitize data before sending
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: data.email, // Email validation handled by Zod
        message: sanitizeInput(data.message),
      };

      // Submit to secure API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      // Reset form on success
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      // Error handling is managed by the form state
      throw error; // Re-throw to show error in UI
    }
  };

  return (
    <Layout title="Contact" description="Get in touch with VR NextGEN Solutions">
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gold">Contact</h1>
        </header>
        <p className="max-w-3xl text-white/80">
          We don&apos;t just consult; we create pathways for your business to thrive.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"
          aria-label="Contact form"
        >
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/80">Name</span>
            <input
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-label="Your name"
              className="bg-black border border-white/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/80">Email</span>
            <input
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-label="Your email"
              className="bg-black border border-white/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
          </label>
          <label className="md:col-span-2 flex flex-col gap-2">
            <span className="text-sm text-white/80">Message</span>
            <textarea
              rows={5}
              {...register("message")}
              aria-invalid={!!errors.message}
              aria-label="Your message"
              className="bg-black border border-white/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
          </label>
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              variant="primary"
              size="md"
              aria-label="Send message"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
            {isSubmitSuccessful && (
              <span className="ml-3 text-green-400 text-sm">Thanks! We&apos;ll be in touch.</span>
            )}
          </div>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gold">{COMPANY_INFO.name}</h2>
            <p className="text-white/80 mt-2">Business Consultancy</p>
            <p className="text-white/80 mt-1">Phone: {COMPANY_INFO.phone}</p>
            <p className="text-white/80 mt-1">Email: {COMPANY_INFO.email}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gold">Follow Us</h2>
            <div className="flex gap-4 mt-2">
              <SocialIcon 
                type="gmail" 
                href={`mailto:${COMPANY_INFO.email}`}
                size="md"
              />
              <SocialIcon 
                type="instagram" 
                href={COMPANY_INFO.instagram}
                size="md"
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gold">Map</h2>
            <div className="mt-2 aspect-video rounded overflow-hidden border border-white/10">
              <iframe
                title="VR Next Gen Solutions Map"
                className="w-full h-full invert contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086089205087!2d-122.40135052405496!3d37.7897221122978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d0b0b0b1%3A0x1234567890abcdef!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}



