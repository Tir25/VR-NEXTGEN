import Link from "next/link";
import SocialIcon from "@/components/common/SocialIcons";
import { COMPANY_INFO } from "@/utils/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div>
          <p className="text-sm text-white/70">&copy; {year} VR NextGEN Solutions.</p>
          <p className="text-sm text-white/70">All rights reserved.</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-4 justify-start md:justify-center">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li><Link href="/what-we-do" className="hover:text-gold">What We Do</Link></li>
            <li><Link href="/who-we-are" className="hover:text-gold">Who We Are</Link></li>
            <li><Link href="/nextgen-blog" className="hover:text-gold">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </nav>
        <div className="flex gap-4 justify-start md:justify-end" aria-label="Social links">
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
    </footer>
  );
}


