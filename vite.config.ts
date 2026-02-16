import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    //алиасы и также в tsconfig.app.json
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
