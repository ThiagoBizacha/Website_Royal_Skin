import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
        design_system: "desing_system.html",
      },
    },
  },
});
