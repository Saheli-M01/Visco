# Visco Algo Lab — Project Structure

> Current stack: React 18 + Vite + React Router v6 + Tailwind CSS + shadcn/ui + MUI + Framer Motion

---

## Current Structure (Vite + React)

```
visco-algo-lab/
├── public/
│   ├── assets/
│   │   ├── brand.png
│   │   ├── logo_black.jpg
│   │   ├── logo_white.png
│   │   ├── vigyan-square.png
│   │   └── user-guide/
│   │       ├── automatic.gif
│   │       ├── display.gif
│   │       ├── input.gif
│   │       └── manual.gif
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── App.jsx                          # Root: BrowserRouter + all Routes
│   ├── main.jsx                         # ReactDOM entry point
│   ├── index.css                        # Global styles / Tailwind base
│   │
│   ├── components/
│   │   │
│   │   ├── TopicPages/                  # Route-level page components
│   │   │   ├── Index.jsx                # Route: /
│   │   │   ├── SortingPage.jsx          # Route: /sorting
│   │   │   ├── ArrayPage.jsx            # Route: /array
│   │   │   ├── GraphPage.jsx            # Route: /graph
│   │   │   ├── TreePage.jsx             # Route: /tree
│   │   │   ├── LinkedListPage.jsx       # Route: /linked-list
│   │   │   ├── premium-landing.css
│   │   │   └── layout/
│   │   │       └── CategoryLayout.jsx   # Shared layout for category pages
│   │   │
│   │   ├── AlgorithmVisualizerPage.jsx  # Route: /:category/:algorithm & /:category/:algorithm/:view
│   │   ├── SearchPage.jsx               # Route: /search
│   │   ├── Loading.jsx                  # App-level loading screen
│   │   ├── NotFound.jsx                 # Route: *
│   │   │
│   │   ├── algorithm-visualizer-details/   # Visualizer shell + shared display
│   │   │   ├── index.js                    # Barrel exports
│   │   │   ├── AlgorithmCard.jsx
│   │   │   ├── AlgorithmAPIDemo.jsx
│   │   │   ├── Modal.jsx
│   │   │   │
│   │   │   ├── algorithm-visualizer-components/   # Reusable visualizer UI pieces
│   │   │   │   ├── ArrayInputCard.jsx
│   │   │   │   ├── CodePreview.jsx
│   │   │   │   ├── ControlsPanel.jsx
│   │   │   │   ├── StepHistory.jsx
│   │   │   │   ├── VariableCard.jsx
│   │   │   │   ├── UserGuideTour.jsx
│   │   │   │   ├── stepHelpers.js
│   │   │   │   └── Help-Guide/
│   │   │   │       ├── DraggableHelpButton.jsx
│   │   │   │       └── HelpGuideModal.jsx
│   │   │   │
│   │   │   ├── array/                   # Array visualizer display layer
│   │   │   │   ├── Array-Visualization-Details.jsx
│   │   │   │   ├── ArrayDetails.jsx
│   │   │   │   ├── ArrayDisplay.jsx
│   │   │   │   └── ArrayVisualization.jsx
│   │   │   │
│   │   │   ├── sorting/                 # Sorting visualizer display layer
│   │   │   │   ├── Sorting-Visualization-Details.jsx
│   │   │   │   ├── SortingDetails.jsx
│   │   │   │   ├── SortingDisplay.jsx
│   │   │   │   └── SortingVisualization.jsx
│   │   │   │
│   │   │   └── linked-list/             # Linked list visualizer display layer
│   │   │       ├── LinkedList-Visualization-Details.jsx
│   │   │       ├── LinkedListDetails.jsx
│   │   │       ├── LinkedListDisplay.jsx
│   │   │       └── LinkedListVisualization.jsx
│   │   │
│   │   ├── algorithms/                  # Per-algorithm logic + visualizer + complexity
│   │   │   │
│   │   │   ├── array/
│   │   │   │   ├── BinarySearch/
│   │   │   │   │   ├── binarySearch.js
│   │   │   │   │   ├── binarySearchCodes.js
│   │   │   │   │   ├── BinarySearchComplexity.jsx
│   │   │   │   │   └── BinarySearchVisualizer.jsx
│   │   │   │   ├── Dutch/
│   │   │   │   │   ├── dutchFlag.js
│   │   │   │   │   ├── dutchFlagcodes.js
│   │   │   │   │   ├── DutchFlagComplexity.jsx
│   │   │   │   │   └── dutchFlagVisualizer.jsx
│   │   │   │   ├── Kadanes/
│   │   │   │   │   ├── kadanes.js
│   │   │   │   │   ├── kadanesCodes.js
│   │   │   │   │   ├── KadanesComplexity.jsx
│   │   │   │   │   └── kadanesVisualizer.jsx
│   │   │   │   ├── MooresVoting/
│   │   │   │   │   ├── mooresVoting.js
│   │   │   │   │   ├── MooresVotingCodes.js
│   │   │   │   │   ├── MooresVotingComplexity.jsx
│   │   │   │   │   └── MooresVotingVisualizer.jsx
│   │   │   │   ├── NextPermutation/
│   │   │   │   │   ├── nextPermutation.js
│   │   │   │   │   ├── nextPermutationCodes.js
│   │   │   │   │   ├── NextPermutationComplexity.jsx
│   │   │   │   │   └── nextPermutationVisualizer.jsx
│   │   │   │   └── SlidingWindow/
│   │   │   │       ├── slidingWindow.js
│   │   │   │       ├── slidingWindowCodes.js
│   │   │   │       ├── SlidingWindowComplexity.jsx
│   │   │   │       └── SlidingWindowVisualizer.jsx
│   │   │   │
│   │   │   ├── sorting/
│   │   │   │   ├── BubbleSort/
│   │   │   │   │   ├── bubbleSort.js
│   │   │   │   │   ├── bubbleSortCodes.js
│   │   │   │   │   ├── BubbleSortComplexity.jsx
│   │   │   │   │   └── BubbleVisualizer.jsx
│   │   │   │   ├── HeapSort/
│   │   │   │   │   ├── heapSort.js
│   │   │   │   │   ├── heapSortCodes.js
│   │   │   │   │   ├── HeapSortComplexity.jsx
│   │   │   │   │   └── HeapVisualizer.jsx
│   │   │   │   ├── InsertionSort/
│   │   │   │   │   ├── insertionSort.js
│   │   │   │   │   ├── insertionSortCodes.js
│   │   │   │   │   ├── InsertionSortComplexity.jsx
│   │   │   │   │   └── InsertionVisualizer.jsx
│   │   │   │   ├── MergeSort/
│   │   │   │   │   ├── mergeSort.js
│   │   │   │   │   ├── mergeSortCodes.js
│   │   │   │   │   ├── MergeSortComplexity.jsx
│   │   │   │   │   └── MergeVisualizer.jsx
│   │   │   │   ├── QuickSort/
│   │   │   │   │   ├── quickSort.js
│   │   │   │   │   ├── quickSortCodes.js
│   │   │   │   │   ├── QuickSortComplexity.jsx
│   │   │   │   │   └── QuickVisualizer.jsx
│   │   │   │   └── SelectionSort/
│   │   │   │       ├── selectionSort.js
│   │   │   │       ├── selectionSortCodes.js
│   │   │   │       ├── SelectionSortComplexity.jsx
│   │   │   │       └── SelectionVisualizer.jsx
│   │   │   │
│   │   │   └── linked-list/
│   │   │       ├── doublyLinkedList/    # (empty — planned)
│   │   │       └── singlyLinkedList/
│   │   │           ├── sllCreation/
│   │   │           │   ├── sllCreation.js
│   │   │           │   ├── sllCreationCodes.js
│   │   │           │   ├── SLLCreationComplexity.jsx
│   │   │           │   ├── SLLCreationExample.jsx
│   │   │           │   └── SLLCreationVisualizer.jsx
│   │   │           ├── sllDeletion/
│   │   │           │   ├── sllDeletion.js
│   │   │           │   ├── sllDeletionCodes.js
│   │   │           │   ├── SLLDeletionComplexity.jsx
│   │   │           │   ├── SLLDeletionExample.jsx
│   │   │           │   └── SLLDeletionVisualizer.jsx
│   │   │           ├── sllInsertion/
│   │   │           │   ├── sllInsertion.js
│   │   │           │   ├── sllInsertionCodes.js
│   │   │           │   ├── SLLInsertionComplexity.jsx
│   │   │           │   ├── SLLInsertionExample.jsx
│   │   │           │   └── SLLInsertionVisualizer.jsx
│   │   │           └── sllTraversal/
│   │   │               ├── sllTraversal.js
│   │   │               ├── sllTraversalCodes.js
│   │   │               ├── SLLTraversalComplexity.jsx
│   │   │               ├── SLLTraversalExample.jsx
│   │   │               └── SLLTraversalVisualizer.jsx
│   │   │
│   │   ├── landing/                     # Landing page sections
│   │   │   ├── index.js                 # Barrel exports
│   │   │   ├── Hero.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Topics.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Docs.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── notes/                       # Docs / Notes section
│   │   │   ├── DocsHome.jsx             # Route: /docs
│   │   │   ├── PythonNotesHome.jsx      # Route: /docs/python
│   │   │   ├── JSNotesHome.jsx          # Route: /docs/javascript
│   │   │   ├── NotesContent.jsx
│   │   │   ├── NoteSidebar.jsx
│   │   │   ├── FloatingPDFButton.jsx
│   │   │   ├── README.md
│   │   │   │
│   │   │   ├── python/
│   │   │   │   ├── PythonPage.jsx
│   │   │   │   └── sections/            # 22 section components
│   │   │   │       ├── Introduction.jsx
│   │   │   │       ├── Tokens.jsx
│   │   │   │       ├── Variables.jsx
│   │   │   │       ├── DataTypes.jsx
│   │   │   │       ├── TypeInteractionsAndTypeCasting.jsx
│   │   │   │       ├── Interpreter.jsx
│   │   │   │       ├── TakingInputs.jsx
│   │   │   │       ├── IncrementDecrement.jsx
│   │   │   │       ├── Conditionals.jsx
│   │   │   │       ├── MatchCase.jsx
│   │   │   │       ├── Loops.jsx
│   │   │   │       ├── Functions.jsx
│   │   │   │       ├── ErrorHandling.jsx
│   │   │   │       ├── Arrays.jsx
│   │   │   │       ├── Lists.jsx
│   │   │   │       ├── Tuples.jsx
│   │   │   │       ├── TuplesSetsDict.jsx
│   │   │   │       ├── Sets.jsx
│   │   │   │       ├── Dictionaries.jsx
│   │   │   │       ├── StringConcatenation.jsx
│   │   │   │       ├── PracticeQuestions1.jsx
│   │   │   │       └── PracticeQuestions2.jsx
│   │   │   │
│   │   │   ├── js/
│   │   │   │   ├── JSPage.jsx
│   │   │   │   └── sections/            # 9 section components
│   │   │   │       ├── Introduction.jsx
│   │   │   │       ├── Variables.jsx
│   │   │   │       ├── DataTypes.jsx
│   │   │   │       ├── Operators.jsx
│   │   │   │       ├── Loops.jsx
│   │   │   │       ├── Objects.jsx
│   │   │   │       ├── Arrays.jsx
│   │   │   │       ├── StringOps.jsx
│   │   │   │       └── ErrorHandling.jsx
│   │   │   │
│   │   │   └── shared/                  # Shared note UI primitives
│   │   │       ├── CodeBlock.jsx
│   │   │       ├── Infobox.jsx
│   │   │       └── NoteTable.jsx
│   │   │
│   │   └── ui/                          # shadcn/ui primitives
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── progress.jsx
│   │       ├── scroll-area.jsx
│   │       ├── select.jsx
│   │       ├── separator.jsx
│   │       ├── skeleton.jsx
│   │       ├── slider.jsx
│   │       └── tooltip.jsx
│   │
│   ├── data/                            # Static data / config
│   │   ├── algorithmAPI.js
│   │   ├── algorithmRoutes.js           # (also in utils — mapping of routes to algo components)
│   │   ├── categories.js
│   │   ├── notes.js
│   │   └── topics.js
│   │
│   ├── hooks/
│   │   └── useAlgorithmCounts.js
│   │
│   ├── lib/
│   │   └── utils.js                     # cn() helper (clsx + tailwind-merge)
│   │
│   └── utils/
│       ├── algorithmFactory.js          # Dynamic algorithm component resolver
│       └── algorithmRoutes.js           # Route → algorithm component map
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── components.json                      # shadcn/ui config
└── .nvmrc
```

---

## Routes Summary

| Path | Component |
|---|---|
| `/` | `Index.jsx` (landing page) |
| `/sorting` | `SortingPage.jsx` |
| `/array` | `ArrayPage.jsx` |
| `/graph` | `GraphPage.jsx` |
| `/tree` | `TreePage.jsx` |
| `/linked-list` | `LinkedListPage.jsx` |
| `/search` | `SearchPage.jsx` |
| `/:category/:algorithm` | `AlgorithmVisualizerPage.jsx` |
| `/:category/:algorithm/:view` | `AlgorithmVisualizerPage.jsx` |
| `/docs` | `DocsHome.jsx` |
| `/docs/python` | `PythonNotesHome.jsx` |
| `/docs/javascript` | `JSNotesHome.jsx` |
| `*` | `NotFound.jsx` |

---

## Suggested Next.js Structure

Next.js App Router maps the filesystem to routes, so the key change is flattening
`TopicPages/` + `AlgorithmVisualizerPage` + `notes/` into `app/` route segments.
Everything else (components, algorithms, data, hooks, utils) stays roughly the same.

```
visco-algo-lab-next/
├── app/                                 # Next.js App Router (replaces React Router)
│   ├── layout.tsx                       # Root layout — wraps all pages (replaces App.jsx shell)
│   ├── page.tsx                         # Route: /  (was Index.jsx)
│   ├── not-found.tsx                    # Route: * (was NotFound.jsx)
│   ├── loading.tsx                      # Global loading UI (was <Loading /> in App.jsx)
│   │
│   ├── sorting/
│   │   └── page.tsx                     # Route: /sorting
│   ├── array/
│   │   └── page.tsx                     # Route: /array
│   ├── graph/
│   │   └── page.tsx                     # Route: /graph
│   ├── tree/
│   │   └── page.tsx                     # Route: /tree
│   ├── linked-list/
│   │   └── page.tsx                     # Route: /linked-list
│   ├── search/
│   │   └── page.tsx                     # Route: /search
│   │
│   ├── [category]/
│   │   └── [algorithm]/
│   │       ├── page.tsx                 # Route: /:category/:algorithm
│   │       └── [view]/
│   │           └── page.tsx             # Route: /:category/:algorithm/:view
│   │
│   └── docs/
│       ├── page.tsx                     # Route: /docs  (was DocsHome.jsx)
│       ├── python/
│       │   └── page.tsx                 # Route: /docs/python
│       └── javascript/
│           └── page.tsx                 # Route: /docs/javascript
│
├── components/                          # All non-route UI (move from src/components/)
│   ├── algorithm-visualizer-details/    # unchanged
│   ├── algorithms/                      # unchanged
│   ├── landing/                         # unchanged
│   ├── notes/                           # unchanged (keep shared/, python/, js/ subfolders)
│   └── ui/                              # shadcn/ui — unchanged
│
├── data/                                # unchanged
├── hooks/                               # unchanged
├── lib/                                 # unchanged
└── utils/                               # unchanged
```

### Key changes to make

**1. Replace `BrowserRouter` / `react-router-dom` with the filesystem**
Delete `App.jsx`, `main.jsx`, and `react-router-dom`. Each `TopicPage` becomes an
`app/.../page.tsx`. The `/:category/:algorithm` dynamic route maps to `app/[category]/[algorithm]/page.tsx`.

**2. Mark interactive components with `"use client"`**
Any component using `useState`, `useEffect`, `useRef`, `framer-motion`, or browser
APIs needs `"use client"` at the top. This includes all visualizer components, the
controls panel, draggable help button, and the notes sidebar.

Pure display / content components (most of `notes/sections/`, `landing/Hero.jsx`, etc.)
can stay as React Server Components — they render on the server with zero JS sent to
the client.

**3. Move metadata out of components into `generateMetadata`**
Any `<title>` or `<meta>` tags set in components should move to Next.js `generateMetadata`
exports in each `page.tsx`.

**4. Replace `<Loading />` with `loading.tsx`**
The fake 700ms delay in `App.jsx` can be dropped. Next.js handles suspense boundaries
automatically with `loading.tsx` files placed next to `page.tsx`.

**5. Keep `public/` as-is**
Next.js serves `public/` at the root exactly like Vite does.

**6. Tailwind + shadcn/ui**
Both work out of the box in Next.js. Just re-run `npx shadcn@latest init` to generate
the updated `components.json` / `tailwind.config.ts` for Next.js.

**7. MUI — watch out**
MUI requires a client-side emotion cache in Next.js App Router. You'll need to wrap
MUI usage in a `ThemeRegistry` client component (Next.js MUI example covers this).
Consider replacing MUI icons with `lucide-react` (already in deps) to reduce the
overhead since you're already using it.

### What you gain from the migration

- **SEO** — category pages, docs, and landing render as HTML on the server
- **Performance** — Server Components cut JS bundle for content-heavy notes pages
- **No artificial loading delay** — drop the 700ms hack in `App.jsx`
- **Built-in image optimization** — swap `<img>` for Next.js `<Image>` for brand/logo assets
- **Simpler dynamic routes** — `[category]/[algorithm]` replaces the manual `algorithmRoutes.js` resolver (or keep the resolver, just call it from the server)
