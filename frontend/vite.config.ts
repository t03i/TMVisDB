import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit(), purgeCss()],
    define: {
        __VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    build: {
        sourcemap: true
    }
});
