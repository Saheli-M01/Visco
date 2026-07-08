import { useState } from "react";
import PythonPage from "./python/PythonPage";
import { generatePdf } from "../../utils/generatePdf";

const NotesContent = () => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGeneratePdf = () => {
        generatePdf({
            onStart: () => setIsGenerating(true),
            onEnd: () => setIsGenerating(false),
        });
    };

    return (
        <main id="notes-scroll-container" className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-5 py-8 ">
                <div className="mb-10 flex items-center justify-end">
                    <button
                        onClick={handleGeneratePdf}
                        disabled={isGenerating}
                        className={`rounded-lg px-5 py-2.5 font-medium text-white transition shadow-sm inline-flex items-center gap-2 ${
                            isGenerating
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow"
                        }`}
                    >
                        {isGenerating && (
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        )}
                        {isGenerating ? "Generating..." : "Generate PDF"}
                    </button>
                </div>

                {/* Print area target */}
                <div id="notes-content" className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-100 shadow-sm">

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 border-b border-slate-200 pb-4 mb-6">
                        Python Programming Reference Notes
                    </h1>
                    <PythonPage />
                </div>
            </div>
        </main>
    );
};

export default NotesContent;