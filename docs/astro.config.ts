import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://idleberg.github.io',
	base: process.env.CI ? '/nsis-javascript-tools/' : '/',
	outDir: 'dist',
	vite: {
		plugins: [tailwindcss()],
	},
});
