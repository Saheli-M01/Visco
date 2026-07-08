import PythonPage from "./python/PythonPage";
import { generatePdf } from "../../utils/pdf/generatePdf";

const NotesContent = () => {
    return (
        <main id="notes-scroll-container" className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-5xl px-10 py-8">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Python Programming Notes
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Learn Python step by step.
                        </p>
                    </div>

                    <button
                        onClick={generatePdf}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 transition shadow-sm hover:shadow"
                    >
                        Generate PDF
                    </button>
                </div>

                {/* Print area target */}
                <div id="notes-content" className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                    <h1 className="text-4xl font-extrabold text-slate-900 border-b border-slate-200 pb-4 mb-6">
                        Python Programming Reference Notes
                    </h1>
                    <PythonPage />
                </div>
            </div>
        </main>
    );
};

export default NotesContent;