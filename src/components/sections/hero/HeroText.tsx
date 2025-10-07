/**
 * HeroText Component
 * Original TypeScript-based animated hero text content
 */

import React, { useEffect, useState, useRef } from 'react';
import { Container } from '@/components/common';
import HeroStats from './HeroStats';

export default function HeroText() {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const hasTypedRef = useRef(false);

  // Original hero text content
  const heroText = "Your Partner in Data-Driven Business Growth";

  // Typewriter effect for the main heading - no erasing
  useEffect(() => {
    // Only run the typewriter effect once
    if (hasTypedRef.current) return;
    
    const typewriterSpeed = 80;
    let currentIndex = 0;
    
    const typeWriter = () => {
      if (currentIndex < heroText.length) {
        setCurrentText(heroText.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typewriterSpeed);
      } else {
        // Text is fully typed, mark as completed
        hasTypedRef.current = true;
        // Stop the cursor blinking after a delay
        setTimeout(() => {
          setShowCursor(false);
        }, 1000);
      }
    };

    // Start typewriter effect after component mounts
    const timer = setTimeout(() => {
      typeWriter();
    }, 500);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <Container size="lg">
        <div className="text-center space-y-8">
          {/* Main Hero Title with Typewriter Effect */}
          <div className="animate-fade-in-up">
            <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold text-gold leading-tight">
              {currentText || heroText}
              <span className={`inline-block w-0.5 h-8 md:h-10 lg:h-12 bg-gold ml-1 transition-opacity duration-100 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`} />
            </h1>
          </div>

          {/* Subtitle / Description */}
          <div className="animate-fade-in-up delay-1000">
            <p className="text-base md:text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
              At <span className="text-gold font-semibold">VR NextGen Solutions</span>, we empower businesses to achieve excellence through data, process, and strategy. Our end-to-end consulting approach helps organizations optimize operations, automate workflows, and make smarter, data-driven decisions. By aligning people, processes, and technology, we transform challenges into opportunities for sustainable growth.
            </p>
          </div>

          {/* Animated Stats */}
            <div className="animate-fade-in-up delay-2000">
              <HeroStats
                className="mt-12 md:mt-16 px-4 pb-4 md:pb-0"
                stats={[
                  { value: '0', label: 'Projects Delivered' },
                  { value: '0%', label: 'Client Satisfaction' },
                  { value: '0', label: 'Years Experience' }
                ]}
              />
            </div>
        </div>
      </Container>

      {/* Floating Elements for Visual Appeal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-2 h-2 bg-gold/30 rounded-full animate-pulse" />
        <div className="floating-element absolute top-40 right-20 w-1 h-1 bg-gold/40 rounded-full animate-pulse delay-1000" />
        <div className="floating-element absolute bottom-40 left-20 w-3 h-3 bg-gold/20 rounded-full animate-pulse delay-2000" />
        <div className="floating-element absolute bottom-20 right-10 w-2 h-2 bg-gold/30 rounded-full animate-pulse delay-500" />
      </div>

      <style jsx>{`
        .hero-title {
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.15);
        }

        .highlight {
          position: relative;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 5px rgba(255, 215, 0, 0.2);
        }

        .stat-item {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          opacity: 0.9;
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(2rem);
          animation: fadeInUp 1s ease-out forwards;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
            line-height: 1.2;
          }
        }
      `}</style>
    </div>
  );
}
