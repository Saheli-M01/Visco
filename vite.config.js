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
    // Optional: during local dev, you can proxy API calls to a remote endpoint
    // or run `vercel dev` which serves serverless functions locally.
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //   },
    // },
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
