import React, { useState } from "react";
import NotesSidebar from "./NoteSidebar";
import NotesContent from "./NotesContent";
import { Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotesHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Mobile Header Bar */}
            <header className="flex items-center justify-between bg-white px-4 py-3.5 border-b border-slate-200 md:hidden sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-1 rounded-md text-slate-650 hover:bg-slate-50 transition"
                        aria-label="Open Sidebar"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-bold text-slate-800 text-base">Python Notes</span>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 transition"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <NotesSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <NotesContent />
            </div>
        </div>
    );
};

export default NotesHome;