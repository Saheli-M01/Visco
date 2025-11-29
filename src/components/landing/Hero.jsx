import React, { useState, useEffect } from "react";
import * as DotLottieModule from "@lottiefiles/dotlottie-react";

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

  return <span className={className}>{currentText}</span>;
};

export default function Hero() {
  return (
    <section className="relative md:h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 py-8 bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Subtle animated DSA backdrop (visible on md and up) */}
      <div className="hidden md:block pointer-events-none absolute inset-0 z-0 opacity-70">
        {/* dotLottie animation - bottom-right decorative element (conditional render) */}
        {DotLottieComponent && (
          <div className="absolute right-6 bottom-6 w-80 h-80 pointer-events-none opacity-40 ">
            <DotLottieComponent
              src="https://lottie.host/707cbaee-0e0c-4da9-8b7a-b72f9071523f/ecWszJnQTn.lottie"
              loop
              autoplay
            />
          </div>
        )}
        {/* dotLottie animation - top-left decorative element (conditional render) */}
        {DotLottieComponent && (
          <div className="absolute left-6 top-6 w-80 h-80 pointer-events-none opacity-40 ">
            <DotLottieComponent
              src="https://lottie.host/3ae7b92c-6104-46e2-b3ba-2a14f532dd0b/LvAiz4JqUc.lottie"
              loop
              autoplay
            />
          </div>
        )}
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
          {/* Terminal (left) and Gear (right) icons - subtle */}
        </svg>

       
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-5xl mx-auto z-10">
        <div className="text-center md:px-6 md:py-16">
          {/* Single Glassmorphic Container */}
          <div className="backdrop-blur-md bg-gradient-to-br from-white/30 via-white/50 to-white/5 border border-white/20 rounded-3xl px-4 md:px-10 py-4 md:py-20 shadow-2xl ">
            <h1
              className="font-black mb-8 leading-tight"
              style={{ fontSize: "clamp(2.5em, 8vw, 5em)" }}
            >
              <span className="text-gray-700 font-medium">Welcome to </span>
              <span className="text-gray-900 font-bold">Visco</span>
            </h1>

            <div className="mt-8">
              <p
                className="text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium"
                style={{ fontSize: "clamp(1.125em, 3vw, 1.5em)" }}
              >
                Understanding when complexity transforms into{" "}
                <span className="font-mono font-bold text-gray-900 bg-gradient-to-bl from-indigo-100 via-amber-100 to-rose-100  backdrop-blur-sm px-3 py-2 rounded-lg border border-white shadow-sm">
                  O(1)
                </span>{" "}
                — even if it starts as
              </p>

              <div
                className="font-mono font-bold min-h-[1.5em] flex items-center justify-center"
                style={{ fontSize: "clamp(1.5em, 4vw, 2.5em)" }}
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
                  className="text-gray-900"
                  repeat={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
