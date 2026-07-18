import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://idleberg.github.io',
	base: process.env.CI ? '/nsis-org/' : '/',
	outDir: 'dist',
	integrations: [svelte()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			dedupe: [
				'@codemirror/view',
				'@codemirror/state',
				'@codemirror/language',
				'@lezer/common',
				'@lezer/highlight',
				'@lezer/lr',
			],
		},
	},
});
