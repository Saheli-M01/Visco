import React from "react";
import { Navigation, Footer } from "@/components/landing";
import { Overview } from "./00overview";
import { Basics } from "./01Basics";
import { STL } from "./02STL";

const sections = [
  { id: "overview", label: "Overview" },
  {
    id: "basics",
    label: "Basics",
    children: [
      { id: "basics-intro", label: "Intro" },
      { id: "basics-types", label: "Types of Data" },
      { id: "basics-variables", label: "Variables" },
      { id: "basics-operators", label: "Operators" },
    ],
  },
  {
    id: "stl",
    label: "STL",
    children: [
      { id: "stl-overview", label: "Overview" },
      { id: "stl-containers", label: "Containers" },
      { id: "stl-iterators", label: "Iterators" },
      { id: "stl-algorithms", label: "Algorithms" },
    ],
  },
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
                  <div key={s.id} className="flex flex-col">
                    <a
                      href={`#${s.id}`}
                      className="rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      {s.label}
                    </a>
                    {s.children && (
                      <div className="ml-3 mt-1 flex flex-col gap-1">
                        {s.children.map((c) => (
                          <a
                            key={c.id}
                            href={`#${c.id}`}
                            className="rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-700 transition-colors"
                          >
                            {c.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
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
            <Basics />
            <STL />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DSA;
