import React from "react";
import { Navigation, Footer } from "@/components/landing";
import { Overview } from "./00overview";
import { Intro } from "./01intro";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "intro", label: "Intro" },
];

const DSA = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-4 md:px-6 py-10">
        <div className="max-w-6xl mx-auto lg:flex lg:gap-8">
          {/* Side nav */}
          <aside className="hidden lg:block lg:w-64">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Course sections</h3>
              <nav className="flex flex-col gap-2 text-sm text-gray-800">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Data Structures & Algorithms
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Welcome to the DSA Course! This guided path focuses on the core ideas behind problem solving with
                data structures and algorithms. You'll learn fundamentals, common patterns, and how to analyze
                solutions by time and space complexity — supported by visuals.
              </p>
            </div>

            {/* Sections */}
            <Overview />
            <Intro />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DSA;
