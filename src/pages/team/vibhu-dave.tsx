import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";

export default function VibhuDaveProfile() {
  return (
    <Layout title="Vibhu Dave - Co-founder and Principal" description="Meet Vibhu Dave, Co-founder and Principal of VR NextGen Solutions">
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
                      src="/images/vibhu-dave.jpg"
                      alt="Vibhu Dave - Co-founder and Principal"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">Vibhu Dave</h1>
                  <p className="text-xl text-white/80 mb-4">Co-founder and Principal</p>
                  <p className="text-white/70 mb-6 max-w-2xl">
                    System Engineer at Tata Consultancy Services | Data Analyst | Statistics Expert
                  </p>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm">
                      📊 Data Analyst
                    </span>
                    <span className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm">
                      🏢 TCS Engineer
                    </span>
                    <span className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm">
                      📈 Visualization Expert
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
                  Vibhu Dave is an experienced Data Analyst with expertise in Statistics, Tableau, Alteryx, Python, SQL, and Excel. 
                  He is very keen to learn new things and sharpen his skills as much as possible to improve himself day by day.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  Currently working on Data Visualization projects and making interactive, clean, and more effective dashboards 
                  which can speak more than words. He enjoys the work of Data Analysis, Data Visualization, and Cricket Analysis/Stats.
                </p>
                <p className="text-white/80 leading-relaxed">
                  As a System Engineer at Tata Consultancy Services, he brings extensive industry experience in data analytics 
                  and visualization to VR NextGen Solutions, helping businesses transform their data into actionable insights.
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
                  <h3 className="text-xl font-semibold text-white">Assistant System Engineer</h3>
                  <p className="text-gold font-medium">Tata Consultancy Services</p>
                  <p className="text-white/60 text-sm">Dec 2021 - Present · 3 yrs 11 mos</p>
                  <p className="text-white/60 text-sm">Skills: Tableau, Microsoft Excel, Data Analysis, Python, SQL</p>
                </div>
                
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Assistant System Engineering Trainee</h3>
                  <p className="text-gold font-medium">Tata Consultancy Services</p>
                  <p className="text-white/60 text-sm">Jul 2021 - Nov 2021 · 5 mos</p>
                  <p className="text-white/60 text-sm">Bengaluru, Karnataka, India</p>
                </div>
                
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Analytics and Insights Intern</h3>
                  <p className="text-gold font-medium">Tata Consultancy Services</p>
                  <p className="text-white/60 text-sm">Internship Program</p>
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
                  <h3 className="text-xl font-semibold text-white">Master of Science - MS, Big Data Analytics</h3>
                  <p className="text-gold font-medium">St. Xavier&apos;s College (Autonomous), Ahmedabad</p>
                  <p className="text-white/60 text-sm">2019 - 2021</p>
                </div>
                
                <div className="border-l-4 border-gold pl-6">
                  <h3 className="text-xl font-semibold text-white">Bachelor of Science, Statistics</h3>
                  <p className="text-gold font-medium">St. Xavier&apos;s College (Autonomous), Ahmedabad</p>
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
                  "Statistics", "Tableau", "Alteryx", "Python", "SQL", "Excel", 
                  "Data Analysis", "Data Visualization", "Big Data Analytics", 
                  "Cricket Analysis", "Interactive Dashboards", "System Engineering"
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

        {/* Interests Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gold mb-6">Interests & Specializations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Professional Interests</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Data Analysis & Visualization</li>
                    <li>• Interactive Dashboard Creation</li>
                    <li>• Big Data Analytics</li>
                    <li>• Statistical Modeling</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Personal Interests</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Cricket Analysis & Statistics</li>
                    <li>• Continuous Learning</li>
                    <li>• Skill Development</li>
                    <li>• Data-Driven Insights</li>
                  </ul>
                </div>
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
                        href="https://wa.me/919727719798" 
                        className="text-gold hover:text-white transition-colors"
                      >
                        +91 9727719798
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
                        href="https://linkedin.com/in/vibhu-dave-b59918164" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold hover:text-white transition-colors"
                      >
                        linkedin.com/in/vibhu-dave-b59918164
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📷</span>
                    <div>
                      <p className="text-white/60 text-sm">Instagram</p>
                      <a 
                        href="https://www.instagram.com/v_dave19?utm_source=ig_web_button_share_sheet&igsh=eDd6MTAxem1pajI=" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold hover:text-white transition-colors"
                      >
                        @v_dave19
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
