// Copyright (c) 2026 Saheli Mondal.

import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/TopicPages/Index";
import NotFound from "./components/NotFound";
import SortingPage from "./components/TopicPages/SortingPage";
import ArrayPage from "./components/TopicPages/ArrayPage";
import GraphPage from "./components/TopicPages/GraphPage";
import TreePage from "./components/TopicPages/TreePage";
import LinkedListPage from "./components/TopicPages/LinkedListPage";
import SearchPage from "./components/SearchPage";
import Loading from "./components/Loading";
import DocsHome from "./components/notes/DocsHome";
import NotesHome from "./components/notes/PythonNotesHome";
import JSNotesHome from "./components/notes/JSNotesHome";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep loading visible briefly while app initializes (e.g. fetches, lazy loads)
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/array" element={<ArrayPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/tree" element={<TreePage />} />
          <Route path="/linked-list" element={<LinkedListPage />} />
          <Route path="/docs" element={<DocsHome />} />
          <Route path="/docs/python" element={<NotesHome />} />
          <Route path="/docs/javascript" element={<JSNotesHome />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
