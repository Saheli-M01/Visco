import { Code2, FileCode2, ArrowRight, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Code2, FileCode2, ArrowRight, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const docs = [
  {
    title: "Python",
    description: "Complete beginner to advanced Python notes — data types, control flow, functions, and more.",
    icon: Code2,
    path: "/docs/python",
    status: "available",
    color: "#1F5F4A",
    stats: "15+ topics",
    gradient: "from-[#1F5F4A]/20 to-[#1F5F4A]/5"
  },
  {
    title: "JavaScript",
    description: "JavaScript reference and interview notes — fundamentals, DOM, async patterns, and ES6+ features.",
    icon: FileCode2,
    path: "/docs/javascript",
    status: "available",
    color: "#C68A1D",
    stats: "5+ topics",
    gradient: "from-[#C68A1D]/20 to-[#C68A1D]/5"
  },
];

export default function Docs() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="docs" 
      className="py-24 md:py-32 bg-gradient-to-b from-[#14181c] via-[#1a1f26] to-[#0f1419] relative overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C68A1D]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#1F5F4A]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#EDEFEA 1px, transparent 1px), linear-gradient(90deg, #EDEFEA 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-[#C68A1D]/20 to-[#1F5F4A]/20 border border-[#C68A1D]/30 backdrop-blur-sm">
            <Book className="w-4 h-4 text-[#C68A1D]" />
            <span 
              className="text-[#C68A1D] text-xs tracking-wider font-medium"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              // Documentation
            </span>
          </div>
          <h2 
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#EDEFEA] via-[#C68A1D] to-[#1F5F4A] mb-6"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Learn the Fundamentals
          </h2>
          <p className="text-lg md:text-xl text-[#EDEFEA]/70 max-w-2xl mx-auto leading-relaxed">
            Comprehensive programming notes designed for learning and interview prep. 
            <span className="text-[#C68A1D] font-semibold"> From syntax to advanced concepts.</span>
          </p>
        </div>

        {/* Docs cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {docs.map((doc, index) => {
            const Icon = doc.icon;
            const isAvailable = doc.status === "available";

            return (
              <div
                key={doc.title}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => isAvailable && navigate(doc.path)}
                className={`group relative rounded-2xl p-8 transition-all duration-500 cursor-pointer bg-gradient-to-br ${doc.gradient} border border-[#EDEFEA]/10 hover:border-[#EDEFEA]/30 hover:scale-105 hover:-translate-y-2`}
                style={{
                  boxShadow: `0 10px 40px ${doc.color}20`,
                }}
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${doc.color}40, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="p-4 rounded-xl backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${doc.color}20`,
                        border: `1px solid ${doc.color}40`,
                        boxShadow: `0 0 20px ${doc.color}30`,
                      }}
                    >
                      <Icon 
                        className="w-8 h-8" 
                        style={{ color: doc.color }}
                        strokeWidth={2} 
                      />
                    </div>
                    {isAvailable && (
                      <ArrowRight 
                        className="w-6 h-6 text-[#EDEFEA]/40 group-hover:text-[#EDEFEA]/90 group-hover:translate-x-1 transition-all duration-300" 
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-3xl font-black text-[#EDEFEA] mb-3"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {doc.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#EDEFEA]/70 leading-relaxed mb-6">
                    {doc.description}
                  </p>

                  {/* Stats badge */}
                  {isAvailable && (
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${doc.color}15`,
                        border: `1px solid ${doc.color}30`,
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full animate-pulse" 
                        style={{ backgroundColor: doc.color }}
                      />
                      <span 
                        className="text-sm font-medium"
                        style={{ 
                          fontFamily: "JetBrains Mono, monospace",
                          color: doc.color,
                        }}
                      >
                        {doc.stats}
                      </span>
                    </div>
                  )}
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${doc.color}15 50%, transparent 100%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center">
          <button
            onClick={() => navigate("/docs")}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#C68A1D] to-[#C68A1D]/80 hover:from-[#C68A1D]/90 hover:to-[#C68A1D]/70 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#C68A1D]/30 hover:shadow-[#C68A1D]/50 hover:scale-105 overflow-hidden"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Browse All Documentation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F5F4A] to-[#C68A1D] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
