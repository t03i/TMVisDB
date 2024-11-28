import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { purgeCss } from "vite-plugin-tailwind-purgecss";

export default defineConfig({
  plugins: [sveltekit(), purgeCss()],
  define: {
    "import.meta.env.APP_VERSION": JSON.stringify(
      process.env.npm_package_version,
    ),
  },

  build: {
    sourcemap: true,
  },
});
