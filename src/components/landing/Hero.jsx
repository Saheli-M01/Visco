import React, { useState, useEffect } from "react";
import * as DotLottieModule from "@lottiefiles/dotlottie-react";
import { Zap, Target, Brain, ArrowRight } from "lucide-react";

// Resolve whichever export shape the package provides (default or named)
const DotLottieComponent =
  DotLottieModule?.DotLottieReact ||
  DotLottieModule?.default ||
  DotLottieModule?.DotLottiePlayer ||
  null;

const TypeAnimation = ({ sequence, speed, className, repeat }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // Reserve width based on the longest text to avoid layout collapse/glitch
  const longestText = sequence
    .filter((item, index) => index % 2 === 0)
    .reduce((max, item) => (item.length > max.length ? item : max), "");

  useEffect(() => {
    const texts = sequence.filter((item, index) => index % 2 === 0);
    const delays = sequence.filter((item, index) => index % 2 === 1);

    const timeout = setTimeout(
      () => {
        const currentWord = texts[currentIndex];

        if (!isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          if (currentText === currentWord) {
            setTimeout(() => setIsDeleting(true), delays[currentIndex] || 1000);
          }
        } else {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : speed || 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, sequence, speed]);

  return (
    <span
      className={className}
      style={{ display: "inline-block", minWidth: `${longestText.length}ch` }}
    >
      {currentText}
    </span>
  );
};

export default function Hero() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setParticlePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToTopics = () => {
    const topicsSection = document.getElementById("topics");
    if (topicsSection) {
      topicsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] lg:min-h-[75vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-8 bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Interactive cursor follower */}
      <div
        className="hidden md:block pointer-events-none fixed w-96 h-96 rounded-full bg-gradient-radial from-purple-300/20 to-transparent blur-3xl transition-all duration-300 ease-out"
        style={{
          left: particlePosition.x - 192,
          top: particlePosition.y - 192,
        }}
      />

      {/* Subtle animated DSA backdrop (visible on md and up) */}
      <div className="hidden md:block pointer-events-none absolute inset-0 z-0 opacity-70">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.04" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* Soft gradient blob */}
          <g filter="url(#blur)">
            <ellipse cx="220" cy="140" rx="260" ry="120" fill="url(#g1)" />
            <ellipse cx="980" cy="520" rx="320" ry="140" fill="url(#g1)" />
          </g>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto z-10 h-full flex items-center py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-6">
            <div>
              <h1
                className="font-black mb-3 leading-tight flex items-center gap-3 flex-wrap"
                style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
              >
                <span className="text-gray-700 font-medium">Welcome to </span>
                <img
                  src="/assets/brand.png"
                  alt="Visco logo"
                  className="h-[2.5rem]"
                />
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                <span
                  className="text-gray-700 leading-relaxed font-medium"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                >
                  Understanding when complexity transforms into{" "}
                </span>
                <span
                  className="font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-2.5 py-1 rounded-lg border border-emerald-300/50 shadow-sm"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                >
                  O(1)
                </span>
                <span
                  className="text-gray-700 leading-relaxed font-medium"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                >
                  — even if it starts as
                </span>
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
                >
                  <TypeAnimation
                    sequence={[
                      "O(n²)",
                      1500,
                      "O(n³)",
                      1500,
                      "O(n log n)",
                      1500,
                      "O(2ⁿ)",
                      1500,
                    ]}
                    speed={150}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
                    repeat={true}
                  />
                </span>
              </div>
            </div>

            {/* Interactive Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 1,
                  Icon: Zap,
                  title: "Lightning Fast",
                  desc: "Visualize in real-time",
                  gradient: "from-amber-400 to-orange-500",
                  bg: "from-amber-50 to-orange-50",
                },
                {
                  id: 2,
                  Icon: Target,
                  title: "Interactive",
                  desc: "Step through code",
                  gradient: "from-blue-400 to-indigo-500",
                  bg: "from-blue-50 to-indigo-50",
                },
                {
                  id: 3,
                  Icon: Brain,
                  title: "Deep Insights",
                  desc: "Understand complexity",
                  gradient: "from-purple-400 to-pink-500",
                  bg: "from-purple-50 to-pink-50",
                },
              ].map((card) => (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative bg-gradient-to-br ${card.bg} border border-gray-200/50 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className="relative z-10">
                    <div
                      className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${card.gradient} mb-2 transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <card.Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-md mb-1">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center md:justify-start pt-2">
              <button
                onClick={scrollToTopics}
                className="group inline-flex items-center gap-2 px-7 py-3 bg-gray-900 text-white font-semibold text-sm rounded-xl hover:bg-gray-800 transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl"
              >
                Explore Algorithms
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Animation */}
          <div className="hidden md:flex items-center justify-center h-full">
            {/* dotLottie animation - bottom-right decorative element (conditional render) */}

            {DotLottieComponent && (
              <div className="w-full h-full max-h-[70vh] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl animate-pulse" />
                <DotLottieComponent
                  src="https://lottie.host/1e76068a-6cf8-4767-93c9-684e23024dd1/MqZBXlYsmx.lottie"
                  loop
                  autoplay
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                />
                {DotLottieComponent && (
                  <div className="absolute right-[-5%] top-[-15%] w-64 h-64 pointer-events-none opacity-30">
                    <DotLottieComponent
                      src="https://lottie.host/707cbaee-0e0c-4da9-8b7a-b72f9071523f/ecWszJnQTn.lottie"
                      loop
                      autoplay
                    />
                  </div>
                )}
                {/* Bottom-left decorative animation */}
                {DotLottieComponent && (
                  <div className="absolute left-0 bottom-[-5%] w-48 h-48 pointer-events-none opacity-30">
                    <DotLottieComponent
                      src="https://lottie.host/3ae7b92c-6104-46e2-b3ba-2a14f532dd0b/LvAiz4JqUc.lottie"
                      loop
                      autoplay
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
