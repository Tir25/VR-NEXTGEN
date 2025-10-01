import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/common/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-black text-white border-b border-white/10 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <nav
        className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between"
        aria-label="Primary"
      >
        {/* Logo (left corner) */}
        <Link href="/" aria-label="VR NextGEN Home" className="flex items-center gap-2">
          <Logo className="h-8 w-auto md:h-10" />
        </Link>

        {/* Centered navigation (desktop) */}
        <ul className="hidden md:flex items-center gap-6 mx-auto">
          <li>
            <Link href="/" aria-label="Go to Home" className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" aria-label="Learn About us" className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/clients" aria-label="View our Clients" className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition">
              Our Clients
            </Link>
          </li>
          <li>
            <Link href="/contact" aria-label="Contact us" className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile menu toggle (right) */}
        <button
          className="md:hidden p-2 rounded bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden>☰</span>
        </button>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-black border-t border-white/10">
            <ul className="flex flex-col py-2">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-3 hover:bg-white/5 hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-3 hover:bg-white/5 hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/clients"
                  className="block px-4 py-3 hover:bg-white/5 hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  Our Clients
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-4 py-3 hover:bg-white/5 hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}


