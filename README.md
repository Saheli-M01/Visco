# Visco — Algorithm Visualizer

Lightweight algorithm visualizer built with Vite + React, Tailwind and Radix/MUI components. This repo contains interactive visualizations for common sorting algorithms and a reusable UI shell for adding new algorithm visualizers.

This README explains how to run the project locally, the shape of the algorithm step data used by the visualizer, where to add or change algorithms, and a few troubleshooting notes.

## Quick start

Requirements

- Node.js 18+ (or compatible)
- npm (or yarn)

Install dependencies (PowerShell / Windows):

```powershell
npm install
```

Run the dev server:

```powershell
npm run dev
```

Open the C++ runner page during development:

- Route: http://localhost:8080/compiler/cpp
- Try the default example: enter `10` as stdin, click Run → expect `55`.

Build production assets:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

Lint the codebase:

```powershell
npm run lint
```

## Project structure (important paths)

- `src/` — application source
  - `components/` — UI components and feature groups
    - `algorithm-visualizer-details/` — modal, visualization UI, step history, etc.
      - `algorithm-visualizer-components/` — smaller UI pieces: `ArrayDisplay.jsx`, `StepHistory.jsx`, etc.
  - `components/algorithms/` — algorithm implementations and step generators
    - `sorting/Visualizer/` — sorting algorithm generators (bubble, selection, insertion, etc.)
    - `algorithmFactory.js` — helper to lookup algorithm implementations
  - `main.tsx` — app entrypoint

Top-level configs: `vite.config.ts`, `tailwind.config.*`, `package.json`.

## How the visualizer works — algorithm step contract

Visualizer components rely on each algorithm exposing a `generateSteps(arr, language, ...opts)` function that returns an ordered array of step objects. The UI renders the `array`, highlights indices in `comparing`, shows `temp` for languages that need it, and displays `phase` and `description` in the step history.

Recommended step object fields (used across the UI):

- `array` — current array snapshot (Array<number|string>)
- `comparing` — indices currently being compared (Array<number>)
- `swapped` — indices swapped at this step (Array<number>)
- `description` — short human-friendly explanation for the step
- `codeLine` — integer index used to highlight the code preview
- `phase` — semantic name for the step (e.g. `comparison`, `min_update`, `swap`, `swap_step`, `merge-complete`)
- `temp` — optional object for languages with a temporary variable ({ value, index })
- `mid` — optional object used by merge sort ({ value, leftIndex, rightIndex })
- `min` — optional object used by selection sort ({ value, index })

Example step (selection sort initial min):

```json
{
  "array": [5,4,3,2,1],
  "comparing": [0],
  "swapped": [],
  "description": "Initial min at index 0 (value 5)",
  "codeLine": 3,
  "phase": "min_update"
}
```

Notes:
- The UI tolerates missing fields and tries to persist `temp` or `min` across subsequent steps when not present explicitly.
- Standardizing on explicit fields (`min`, `temp`, `mid`) in generators makes UI rendering simpler and less brittle.

## Adding or editing algorithms

1. Add a new file under `src/components/algorithms/<category>/Visualizer/` (follow the pattern in `bubbleSort.js`, `selectionSort.js`).
2. Export an object with `name`, `generateSteps(arr, language, ...)`, `getCode(language)`, and `getCodeLines(language)` (existing generators are a good template).
3. Register the algorithm in `src/components/algorithms/algorithmFactory.js` mapping (friendly names and normalized fallbacks are used).

Keep generators pure and deterministic: given the same input and language they should produce the same steps array.

## UI notes and conventions

- The `ArrayDisplay` component highlights indices in `comparing` and `swapped` and shows `temp`, `mid`, and `min` as separate variable slots. For selection sort we emit `min_update` steps so the Min variable appears clearly for users.
- The code preview highlights `codeLine` for the currently active step.
- The step history (component: `StepHistory.jsx`) uses `phase` and `description` to render badges and text.

## Troubleshooting

- If `npm run build` complains about duplicate keys or TypeScript config problems, check that `tsconfig.*` files align with the project type (this repo is JS-first with `allowJs: true` by default).
- If a variable (e.g. `minIndex`) doesn't appear in the UI, ensure the generator emits a `min_update` phase or a `min` field.

## Contributing

- Open a branch for your work: `git checkout -b feat/your-feature`.
- Keep changes small and focused; add or update unit tests where appropriate.
- Run the dev server and manually verify visualizations before opening a PR.

## License

MIT — feel free to reuse and contribute.

---

If you'd like, I can also:

- Add a CONTRIBUTING.md with PR/checklist guidance.
- Add a generator template file and a unit test harness to validate the `generateSteps` contract automatically.

Questions or specific format preferences for the README? I can adapt it. 
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d73a947a-69a9-4f10-a5a3-43fc3455de87

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d73a947a-69a9-4f10-a5a3-43fc3455de87) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d73a947a-69a9-4f10-a5a3-43fc3455de87) and click on Share -> Publish.

### Notes for API routes on Vercel

- This repo includes a serverless function at `api/run-code.js` that proxies requests to the Piston API for C++ execution.
- `vercel.json` has a rewrite to preserve `/api/*` routes. Ensure this file is deployed.
- If you test locally, prefer using `vercel dev` so `/api` works in dev. Alternatively, the frontend has a dev-time fallback that attempts to call Piston directly (may be blocked by CORS depending on environment).

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
