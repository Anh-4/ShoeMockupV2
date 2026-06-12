import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { readFileSync } from "node:fs";

// App version comes from package.json (bump it on each release). The build date
// changes on every deploy so users can tell the app was rebuilt at a glance.
const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "package.json"), "utf-8"));
const buildDate = new Date().toISOString().slice(0, 10);

// `flow-sdk` is aliased to our local adapter so the app code can keep
// `import { Flow } from 'flow-sdk'` unchanged while we back it with the
// official @google/genai SDK.
export default defineConfig({
  // Relative base so the built app loads over file:// inside Electron and
  // also works under a GitHub Pages project path (/<REPO>/).
  base: "./",
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_BUILD_DATE__: JSON.stringify(buildDate),
  },
  resolve: {
    alias: {
      "flow-sdk": path.resolve(__dirname, "src/flow-sdk/index.ts"),
    },
  },
  server: { port: 5174 },
});
