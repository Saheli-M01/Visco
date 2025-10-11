import { defineConfig } from "vite";
// Use the official plugin-react to enable reliable React Fast Refresh/HMR
// Use the SWC-based react plugin which is installed in devDependencies
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
