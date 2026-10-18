import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Three.js stays out of the entry chunk through the dynamic import in components/Hero.tsx.
export default defineConfig({
  plugins: [react()],
  build: { target: "es2022", chunkSizeWarningLimit: 1000 },
});
