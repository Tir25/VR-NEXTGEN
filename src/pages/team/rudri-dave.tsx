import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";

export default function RudriDaveProfile() {
  return (
    <Layout title="Rudri Dave - Co-founder and Principal" description="Meet Rudri Dave, Co-founder and Principal of VR NextGen Solutions">
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Back Button */}
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors mb-8"
            >
              ← Back to Team
            </Link>

            {/* Profile Header */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl">
                    <Image
                      src="/images/rudri-dave.jpg"
                      alt="Rudri Dave - Co-founder and Principal"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">Rudri Dave</h1>
                  <p className="text-xl text-white/80 mb-4">Co-founder and Principal</p>
                  <p className="text-white/70 mb-6 max-w-2xl">
                    Assistant Professor | PhD Researcher | Consultant | Senior Business Analyst | Ex-Unnati | Ex-TCS
                  </p>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm">
                      📊 Statistics Expert
                    </span>
                    <span className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm">
                      🎓 PhD Researcher
                    </span>
                    <span className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm">
                      👩‍🏫 Assistant Professor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gold mb-6">About</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 leading-relaxed mb-4">
                  Rudri Dave is an Assistant Professor at Ganpat University - V.M. Patel College of Management Studies, Gujarat, India. 
                  She has worked in renowned industries previously like TCS and Unnati. Her specific domain is Statistics, and she loves to teach Statistics.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  Her vision to shift from industry to academia is to create a bridge between theoretical knowledge and its practical life implication. 
                  She won the best research paper award at the 3rd International Conference organized by Ganpat University.
                </p>
                <p className="text-white/80 leading-relaxed">
                  She is currently pursuing her Ph.D. in Statistics and is also an experienced Business Analyst with a demonstrated history of working 
                  in the information technology and services industry. Skilled in Statistical Data Analysis, Tableau, R, Microsoft Office, and Interpersonal Communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gold mb-6">Experience</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Assistant Professor</h3>
                  <p className="text-gold font-medium">Ganpat University</p>
                  <p className="text-white/60 text-sm">Apr 2022 - Present · 3 yrs 7 mos</p>
                  <p className="text-white/60 text-sm">Mahesana, Gujarat, India</p>
                </div>
                
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Research Scholar</h3>
                  <p className="text-gold font-medium">CVM University</p>
                  <p className="text-white/60 text-sm">Sep 2021 - Present · 4 yrs 2 mos</p>
                </div>
                
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Senior Business Analyst</h3>
                  <p className="text-gold font-medium">Unlimited Unnati Pvt. Ltd.</p>
                  <p className="text-white/60 text-sm">Jun 2021 - Apr 2022 · 11 mos</p>
                  <p className="text-white/60 text-sm">Ahmedabad, Gujarat, India</p>
                </div>
                
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Process Analyst</h3>
                  <p className="text-gold font-medium">Tata Consultancy Services</p>
                  <p className="text-white/60 text-sm">May 2019 - May 2021 · 2 yrs 1 mo</p>
                  <p className="text-white/60 text-sm">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gold mb-6">Education</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Master&apos;s degree, Statistics</h3>
                  <p className="text-gold font-medium">Gujarat University</p>
                  <p className="text-white/60 text-sm">Jun 2019 - Apr 2021</p>
                </div>
                
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Bachelor&apos;s degree, Statistics</h3>
                  <p className="text-gold font-medium">St. Xavier&apos;s College, Ahmedabad</p>
                  <p className="text-white/60 text-sm">2016 - 2019</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gold mb-6">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Statistical Data Analysis", "Tableau", "R Programming", "Microsoft Office", 
                  "Interpersonal Communication", "Business Analysis", "Research", "Teaching",
                  "Data Visualization", "Process Analysis"
                ].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm hover:bg-gold/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gold mb-6">Get In Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <a 
                        href="mailto:info@vrnextgensolutions.com" 
                        className="text-gold hover:text-white transition-colors"
                      >
                        info@vrnextgensolutions.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="text-white/60 text-sm">Phone / WhatsApp</p>
                      <a 
                        href="https://wa.me/919426722001" 
                        className="text-gold hover:text-white transition-colors"
                      >
                        +91 9426722001
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💼</span>
                    <div>
                      <p className="text-white/60 text-sm">LinkedIn</p>
                      <a 
                        href="https://linkedin.com/in/rudri-dave-09091a183" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold hover:text-white transition-colors"
                      >
                        linkedin.com/in/rudri-dave-09091a183
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📷</span>
                    <div>
                      <p className="text-white/60 text-sm">Instagram</p>
                      <a 
                        href="https://www.instagram.com/rudri__dave?utm_source=ig_web_button_share_sheet&igsh=NjFxcDJ2bGlsYTM4" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold hover:text-white transition-colors"
                      >
                        @rudri__dave
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
