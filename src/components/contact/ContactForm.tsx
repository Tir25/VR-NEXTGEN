import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
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

export default function ContactForm() {
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
      // Error handling is managed by the form state
      throw error; // Re-throw to show error in UI
    }
  };

  return (
    <section id="contact-form" className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl" />
      <div className="relative bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gold mb-4">Send us a Message</h2>
          <p className="text-white/70">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {isSubmitSuccessful && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">
              ✅ Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              {...register("name")}
              type="text"
              placeholder="Your Name"
              error={errors.name?.message}
              className="w-full"
            />
          </div>

          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Your Email"
              error={errors.email?.message}
              className="w-full"
            />
          </div>

          <div>
            <textarea
              {...register("message")}
              placeholder="Your Message"
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
            />
            {errors.message && (
              <p className="mt-2 text-red-400 text-sm">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full btn-enhanced"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
}
