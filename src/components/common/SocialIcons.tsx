import { useState } from "react";

interface SocialIconProps {
  type: "gmail" | "instagram" | "x" | "facebook" | "youtube" | "linkedin";
  href: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SocialIcon({ type, href, className = "", size = "md" }: SocialIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10"
  };

  const GmailIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`${sizeClasses[size]} transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      fill="currentColor"
    >
      <defs>
        <linearGradient id="gmail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA4335" />
          <stop offset="25%" stopColor="#FBBC05" />
          <stop offset="50%" stopColor="#34A853" />
          <stop offset="75%" stopColor="#4285F4" />
        </linearGradient>
      </defs>
      <path
        d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v9.273L12 8.155l6.545 4.939V3.821h3.819A1.636 1.636 0 0 1 24 5.457z"
        fill={isHovered ? "url(#gmail-gradient)" : "currentColor"}
        className="transition-all duration-300"
      />
    </svg>
  );

  const InstagramIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`${sizeClasses[size]} transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      fill="currentColor"
    >
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#833AB4" />
          <stop offset="25%" stopColor="#C13584" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#FD1D1D" />
          <stop offset="100%" stopColor="#F77737" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.85 0 3.205-.012 3.584-.07 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        fill={isHovered ? "url(#instagram-gradient)" : "currentColor"}
        className="transition-all duration-300"
      />
    </svg>
  );

  const XIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`${sizeClasses[size]} transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      fill="currentColor"
    >
      <defs>
        <linearGradient id="x-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="50%" stopColor="#333333" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>
      </defs>
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill={isHovered ? "url(#x-gradient)" : "currentColor"}
        className="transition-all duration-300"
      />
    </svg>
  );

  const FacebookIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`${sizeClasses[size]} transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      fill="currentColor"
    >
      <defs>
        <linearGradient id="facebook-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1877F2" />
          <stop offset="50%" stopColor="#42A5F5" />
          <stop offset="100%" stopColor="#64B5F6" />
        </linearGradient>
      </defs>
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill={isHovered ? "url(#facebook-gradient)" : "currentColor"}
        className="transition-all duration-300"
      />
    </svg>
  );

  const YouTubeIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`${sizeClasses[size]} transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      fill="currentColor"
    >
      <defs>
        <linearGradient id="youtube-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF0000" />
          <stop offset="50%" stopColor="#FF4444" />
          <stop offset="100%" stopColor="#FF6666" />
        </linearGradient>
      </defs>
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        fill={isHovered ? "url(#youtube-gradient)" : "currentColor"}
        className="transition-all duration-300"
      />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`${sizeClasses[size]} transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      fill="currentColor"
    >
      <defs>
        <linearGradient id="linkedin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0077B5" />
          <stop offset="50%" stopColor="#00A0DC" />
          <stop offset="100%" stopColor="#00B7E5" />
        </linearGradient>
      </defs>
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill={isHovered ? "url(#linkedin-gradient)" : "currentColor"}
        className="transition-all duration-300"
      />
    </svg>
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block text-white/70 hover:text-white transition-colors duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      aria-label={`Visit our ${type} page`}
    >
      {type === "gmail" && <GmailIcon />}
      {type === "instagram" && <InstagramIcon />}
      {type === "x" && <XIcon />}
      {type === "facebook" && <FacebookIcon />}
      {type === "youtube" && <YouTubeIcon />}
      {type === "linkedin" && <LinkedInIcon />}
    </a>
  );
}
