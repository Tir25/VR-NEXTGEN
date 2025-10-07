import Link from "next/link";
import SocialIcon from "@/components/common/SocialIcons";
import { COMPANY_INFO } from "@/utils/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gold mb-4">VR NextGEN Solutions</h3>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>
            <div className="text-sm text-white/60 space-y-1">
              <p>{COMPANY_INFO.address}</p>
              <p>Phone: {COMPANY_INFO.phone}</p>
              <p>Email: {COMPANY_INFO.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/70 hover:text-gold transition-colors duration-300">Home</Link></li>
                <li><Link href="/what-we-do" className="text-white/70 hover:text-gold transition-colors duration-300">What We Do</Link></li>
                <li><Link href="/who-we-are" className="text-white/70 hover:text-gold transition-colors duration-300">Who We Are</Link></li>
                <li><Link href="/contact" className="text-white/70 hover:text-gold transition-colors duration-300">Contact</Link></li>
                <li><Link href="/nextgen-blog" className="text-white/70 hover:text-gold transition-colors duration-300">Blog</Link></li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <nav aria-label="Services navigation">
              <ul className="space-y-2">
                <li><Link href="/services/business-consulting" className="text-white/70 hover:text-gold transition-colors duration-300">Business Consulting</Link></li>
                <li><Link href="/services/data-analytics" className="text-white/70 hover:text-gold transition-colors duration-300">Data Analytics</Link></li>
                <li><Link href="/services/automation-solutions" className="text-white/70 hover:text-gold transition-colors duration-300">Automation Solutions</Link></li>
                <li><Link href="/services/process-optimization" className="text-white/70 hover:text-gold transition-colors duration-300">Process Optimization</Link></li>
              </ul>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Follow us for latest updates</h4>
            <p className="text-sm text-white/70 mb-6">
              Stay connected with us for the latest insights, industry updates, and business solutions.
            </p>
            <div className="flex flex-wrap gap-4" aria-label="Social media links">
              <SocialIcon 
                type="instagram" 
                href={COMPANY_INFO.socialMedia.instagram}
                size="md"
              />
              <SocialIcon 
                type="x" 
                href={COMPANY_INFO.socialMedia.x}
                size="md"
              />
              <SocialIcon 
                type="facebook" 
                href={COMPANY_INFO.socialMedia.facebook}
                size="md"
              />
              <SocialIcon 
                type="youtube" 
                href={COMPANY_INFO.socialMedia.youtube}
                size="md"
              />
              <SocialIcon 
                type="linkedin" 
                href={COMPANY_INFO.socialMedia.linkedin}
                size="md"
              />
              <SocialIcon 
                type="gmail" 
                href={`mailto:${COMPANY_INFO.socialMedia.gmail}`}
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/60">
              <p>&copy; {year} VR NextGEN Solutions. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-white/60 hover:text-gold transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-white/60 hover:text-gold transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


