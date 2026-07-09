import { Code2, FileCode2, ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../landing/Navigation";

const docs = [
    {
        title: "Python Programming",
        description: "Complete beginner to advanced Python notes covering data types, control flow, functions, and more.",
        from: "from-emerald-400",
        to: "to-teal-500",
        solid: "#10b981",
        glow: "shadow-[0_20px_45px_-15px_rgba(16,185,129,0.45)]",
        ring: "from-emerald-300/70 to-teal-400/70",
        path: "/docs/python",
        icon: Code2,
        status: "available",
        topics: ["Variables", "Data Types", "Functions", "Conditionals", "Tuples & Dicts"],
    },
    {
        title: "JavaScript",
        description: "JavaScript reference and interview notes — fundamentals, DOM, async patterns, and ES6+ features.",
        from: "from-amber-400",
        to: "to-orange-500",
        solid: "#f59e0b",
        glow: "shadow-[0_20px_45px_-15px_rgba(245,158,11,0.4)]",
        ring: "from-amber-300/70 to-orange-400/70",
        path: "/docs/javascript",
        icon: FileCode2,
        status: "coming-soon",
        topics: ["Variables", "Functions", "DOM", "Async/Await", "ES6+"],
    },
];

export default function DocsHome() {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-white relative overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
                .font-heading { font-family: 'Baloo 2', cursive; }
                .font-body { font-family: 'Inter', sans-serif; }
                .dot-grid {
                    background-image: radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px);
                    background-size: 22px 22px;
                }
            `}</style>

            {/* Aurora background */}
            <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
            <div className="pointer-events-none absolute -top-24 left-1/4 w-[30rem] h-[30rem] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply" />
            <div className="pointer-events-none absolute top-24 right-0 w-[28rem] h-[28rem] bg-amber-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 bg-pink-100/50 rounded-full blur-[90px] mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-transparent to-white" />

            <div className="relative">
                <Navigation />

                {/* Header */}
                <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-14 text-center font-body">


                    <h1
                        className="font-heading font-extrabold text-gray-900 leading-tight mb-4"
                        style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
                    >
                        Programming{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
                            Docs
                        </span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                        Curated, structured notes to help you learn and revise programming
                        concepts - from basics to advanced topics.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="relative max-w-5xl mx-auto px-6 pb-28 font-body">
                    <div className="grid md:grid-cols-2 gap-7">
                        {docs.map((doc) => {
                            const Icon = doc.icon;
                            const isComingSoon = doc.status === "coming-soon";

                            return (
                                <div
                                    key={doc.title}
                                    onClick={() => navigate(doc.path)}
                                    className={`group relative rounded-[26px] p-[1.5px] bg-gradient-to-br ${doc.ring} cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${isComingSoon ? "opacity-80" : `hover:${doc.glow}`
                                        } ${!isComingSoon ? doc.glow.replace("shadow-", "hover:shadow-") : ""}`}
                                >
                                    <div className="relative rounded-[24.5px] bg-white/95 backdrop-blur-xl h-full p-8 overflow-hidden">
                                        {/* Ambient corner wash inside card */}
                                        <div
                                            className={`pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${doc.from} ${doc.to} opacity-[0.07] blur-2xl group-hover:opacity-[0.14] transition-opacity duration-500`}
                                        />

                                        {/* Coming soon badge */}
                                        {isComingSoon && (
                                            <span className="absolute top-7 right-7 px-3 py-1 rounded-full bg-gray-800 text-white text-[11px] font-semibold font-heading tracking-wide z-10">
                                                Coming Soon
                                            </span>
                                        )}

                                        {/* Floating hover arrow */}
                                        {!isComingSoon && (
                                            <div
                                                className={`absolute top-7 right-7 w-9 h-9 rounded-full bg-gradient-to-br ${doc.from} ${doc.to} flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 shadow-md`}
                                            >
                                                <ArrowUpRight size={16} className="text-white" />
                                            </div>
                                        )}

                                        {/* Icon tile */}
                                        <div
                                            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.from} ${doc.to} flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-400`}
                                        >
                                            <Icon size={26} strokeWidth={2.1} />
                                        </div>

                                        {/* Title & description */}
                                        <h2 className="font-heading font-bold text-[26px] text-gray-900 mt-6 leading-snug">
                                            {doc.title}
                                        </h2>
                                        <p className="text-gray-500 mt-2 text-md leading-relaxed max-w-[90%]">
                                            {doc.description}
                                        </p>



                                        <div className="border-t border-gray-100 mt-6 pt-5 flex items-center justify-between">
                                            <span
                                                className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r"
                                                style={{
                                                    backgroundImage: `linear-gradient(to right, ${doc.solid}, ${doc.solid})`,
                                                }}
                                            >
                                                {isComingSoon ? "Preview docs" : "Open docs"}
                                            </span>
                                            <ArrowUpRight
                                                size={16}
                                                style={{ color: doc.solid }}
                                                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}