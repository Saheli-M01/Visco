import React from "react";
import { Navigation } from "@/components/landing";
import NotesSidebar from "./NoteSidebar";
import NotesContent from "./NotesContent";

const NotesHome = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navigation />
            <div className="flex flex-1 overflow-hidden bg-slate-50">
                <NotesSidebar />
                <NotesContent />
            </div>
        </div>
    );
};

export default NotesHome;