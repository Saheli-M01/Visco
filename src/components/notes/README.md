# Notes System Architecture

## Overview
The notes system uses **shared, reusable components** that work for any programming language documentation. Configuration is passed via props to customize the behavior and appearance for each language.

## Architecture

### Shared Components (Reusable)
These components are language-agnostic and work for Python, JavaScript, or any future language:

1. **NotesHome** - Main container component
2. **NotesContent** - Content wrapper with title and page rendering
3. **NotesSidebar** - Navigation sidebar with scroll-spy

### Language-Specific Components
Each language only needs:

1. **Language-specific Home** (e.g., `NotesHome.jsx` for Python, `JSNotesHome.jsx` for JavaScript)
   - Creates a config object
   - Passes config to shared components
   
2. **Page Component** (e.g., `PythonPage.jsx`, `JSPage.jsx`)
   - Imports and renders all section components
   - Adds page breaks between sections

3. **Section Components** (e.g., `Introduction.jsx`, `Variables.jsx`)
   - Individual topic components

## Configuration Object

Each language defines a config object with these properties:

```javascript
const config = {
    title: "Language Notes",              // Shown in mobile header and sidebar
    pageTitle: "Language Reference Notes", // Main heading in content area
    notes: languageNotes,                  // Array from data/notes.js
    PageComponent: LanguagePage,           // Component that renders all sections
    themeColor: "indigo" | "amber"         // Color theme for sidebar
};
```

### Theme Colors
- **indigo** - Python (blue/purple theme)
- **amber** - JavaScript (yellow/orange theme)
- Easy to add more colors by extending the `themeClasses` object in `NotesSidebar.jsx`

## File Structure

```
src/
├── components/
│   └── notes/
│       ├── NotesHome.jsx              # Python home (uses shared components)
│       ├── JSNotesHome.jsx            # JavaScript home (uses shared components)
│       ├── NotesContent.jsx           # Shared content wrapper
│       ├── NotesSidebar.jsx           # Shared sidebar with theming
│       ├── python/
│       │   ├── PythonPage.jsx         # Imports all Python sections
│       │   └── sections/
│       │       ├── Introduction.jsx
│       │       ├── Variables.jsx
│       │       └── ...
│       └── js/
│           ├── JSPage.jsx             # Imports all JS sections
│           └── sections/
│               ├── Introduction.jsx
│               ├── Variables.jsx
│               └── DataTypes.jsx
├── data/
│   └── notes.js                       # Sidebar navigation data
│       ├── pythonNotes                # Python navigation structure
│       └── jsNotes                    # JavaScript navigation structure
└── App.jsx                            # Routes
```

## How to Add a New Language (e.g., C++)

### 1. Create Language Home Component
```javascript
// src/components/notes/CppNotesHome.jsx
import React, { useState } from "react";
import NotesSidebar from "./NoteSidebar";
import NotesContent from "./NotesContent";
import { Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cppNotes } from "@/data/notes";
import CppPage from "./cpp/CppPage";

const CppNotesHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const config = {
        title: "C++ Notes",
        pageTitle: "C++ Programming Reference Notes",
        notes: cppNotes,
        PageComponent: CppPage,
        themeColor: "blue" // You can add new theme colors
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            <header className="flex items-center justify-between bg-white px-4 py-3.5 border-b border-slate-200 md:hidden sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-1 rounded-md text-slate-650 hover:bg-slate-50 transition"
                        aria-label="Open Sidebar"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-bold text-slate-800 text-base">{config.title}</span>
                </div>
                <button
                    onClick={() => navigate("/docs")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 transition"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <NotesSidebar 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen}
                    config={config}
                />
                <NotesContent config={config} />
            </div>
        </div>
    );
};

export default CppNotesHome;
```

### 2. Create Page Component
```javascript
// src/components/notes/cpp/CppPage.jsx
import React from "react";
import Introduction from "./sections/Introduction";
import Variables from "./sections/Variables";

const PageBreak = () => <div className="html2pdf__page-break" />;

const CppPage = () => {
  return (
    <div className="space-y-12">
      <Introduction />
      <PageBreak />
      <Variables />
      {/* Add more sections */}
    </div>
  );
};

export default CppPage;
```

### 3. Create Section Components
```javascript
// src/components/notes/cpp/sections/Introduction.jsx
// Follow the same pattern as Python/JavaScript sections
```

### 4. Add to Data File
```javascript
// src/data/notes.js
export const cppNotes = [
    {
        id: "introduction",
        title: "Introduction",
        component: "Introduction",
    },
    {
        id: "variables",
        title: "Variables",
        component: "Variables",
    },
    // ... more sections
];
```

### 5. Add Route
```javascript
// src/App.jsx
import CppNotesHome from "./components/notes/CppNotesHome";

// In Routes:
<Route path="/docs/cpp" element={<CppNotesHome />} />
```

### 6. Add to Docs Home (Optional)
```javascript
// src/components/notes/DocsHome.jsx
// Add to the docs array
```

## Benefits of This Architecture

✅ **DRY (Don't Repeat Yourself)** - One set of components for all languages
✅ **Easy Maintenance** - Fix once, applies everywhere
✅ **Consistent UI** - All languages look and behave the same
✅ **Easy to Add Languages** - Just create config + sections
✅ **Theming Support** - Easy to customize colors per language
✅ **Type Safety** - Clear contract via config object

## Customization

### Adding New Theme Colors
Edit `NotesSidebar.jsx` and add to `themeClasses`:

```javascript
const themeClasses = {
    indigo: { /* ... */ },
    amber: { /* ... */ },
    blue: {
        icon: "text-blue-600",
        active: "bg-blue-50 text-blue-700 border-blue-600",
        hover: "hover:text-blue-600"
    },
    // Add more...
};
```

### Customizing Sidebar Behavior
- Modify `NotesSidebar.jsx`
- Changes apply to all languages automatically

### Customizing Content Layout
- Modify `NotesContent.jsx`
- Changes apply to all languages automatically
