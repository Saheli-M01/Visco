import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Construction, ArrowLeft, FileCode2, Clock, Bell } from "lucide-react";

const JSPage = () => {
    const navigate = useNavigate();
    const [subscribed, setSubscribed] = useState(false);

    const plannedTopics = [
        "Variables & Data Types",
        "Functions & Closures",
        "DOM Manipulation",
        "Async / Await & Promises",
        "ES6+ Features",
        "Array Methods",
        "Object-Oriented JS",
        "Error Handling",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 flex flex-col">
            {/* Simple top bar */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex h-14 items-center justify-between">
                        <button
                            onClick={() => navigate("/docs")}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Docs
                        </button>
                        <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
                            <FileCode2 className="h-4 w-4" />
                            JavaScript Docs
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="max-w-lg w-full text-center">
                    {/* Animated icon */}
                    <div className="relative mx-auto w-24 h-24 mb-8">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 blur-xl animate-pulse" />
                        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xl">
                            <Construction className="h-10 w-10" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 mb-3">
                        Under Construction
                    </h1>
                    <p className="text-gray-500 leading-relaxed mb-10 max-w-md mx-auto">
                        We're putting together comprehensive JavaScript notes. Check back soon for structured, beginner-friendly docs.
                    </p>

                    {/* Planned topics */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 shadow-sm text-left mb-8">
                        <div className="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm">
                            <Clock className="h-4 w-4 text-amber-500" />
                            Planned Topics
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {plannedTopics.map((topic) => (
                                <div
                                    key={topic}
                                    className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-600 text-sm font-medium"
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
};

export default JSPage;
