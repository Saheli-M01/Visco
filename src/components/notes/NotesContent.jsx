import { useState } from "react";

const NotesContent = ({ config }) => {
  const PageComponent = config.PageComponent;

  return (
    <main id="notes-scroll-container" className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-5 py-8 ">
        <div className="mb-10 flex items-center justify-end">
          {/* Print area target */}
          <div
            id="notes-content"
            className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-100 shadow-sm"
          >
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 border-b border-slate-200 pb-4 mb-6">
              {config.pageTitle}
            </h1>
            <PageComponent />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotesContent;
