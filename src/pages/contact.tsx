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
      <section className="relative min-h-screen py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gold/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Get In Touch
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gold mb-6">
              Let&apos;s Start Your Journey
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? We&apos;re here to help you achieve your goals with data-driven strategies and expert guidance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl" />
              <div className="relative bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gold mb-4">Send us a Message</h2>
                  <p className="text-white/70">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  aria-label="Contact form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2 group">
                      <span className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Name
                      </span>
                      <input
                        {...register("name")}
                        aria-invalid={!!errors.name}
                        aria-label="Your name"
                        className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold/50 transition-all duration-300 group-hover:border-gold/30"
                        placeholder="Your full name"
                      />
                      {errors.name && <span className="text-red-400 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name.message}
                      </span>}
                    </label>
                    
                    <label className="flex flex-col gap-2 group">
                      <span className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Email
                      </span>
                      <input
                        type="email"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        aria-label="Your email"
                        className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold/50 transition-all duration-300 group-hover:border-gold/30"
                        placeholder="your@email.com"
                      />
                      {errors.email && <span className="text-red-400 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email.message}
                      </span>}
                    </label>
                  </div>
                  
                  <label className="flex flex-col gap-2 group">
                    <span className="text-sm font-medium text-white/80 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      Message
                    </span>
                    <textarea
                      rows={5}
                      {...register("message")}
                      aria-invalid={!!errors.message}
                      aria-label="Your message"
                      className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold/50 transition-all duration-300 group-hover:border-gold/30 resize-none"
                      placeholder="Tell us about your project or how we can help..."
                    />
                    {errors.message && <span className="text-red-400 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.message.message}
                    </span>}
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      variant="primary"
                      size="lg"
                      aria-label="Send message"
                      className="btn-enhanced flex-1"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    {isSubmitSuccessful && (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Message sent successfully!
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Company Info */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold">VR</span>
                  </div>
                  {COMPANY_INFO.name}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-gold mb-6">Follow Us</h2>
                <div className="flex gap-4">
                  <SocialIcon 
                    type="gmail" 
                    href={`mailto:${COMPANY_INFO.email}`}
                    size="lg"
                  />
                  <SocialIcon 
                    type="instagram" 
                    href={COMPANY_INFO.instagram}
                    size="lg"
                  />
                </div>
              </div>

              {/* Map */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-gold mb-6">Our Location</h2>
                <div className="aspect-video rounded-lg overflow-hidden border border-white/10">
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
          </div>
        </div>
      </section>
    </Layout>
  );
}



