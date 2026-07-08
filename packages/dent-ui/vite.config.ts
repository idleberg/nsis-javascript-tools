import { svelte } from '@sveltejs/vite-plugin-svelte';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: { css: 'injected' },
		}),
	],
	resolve: {
		conditions: ['browser'],
	},
	build: {
		outDir: 'dist',
		minify: true,
	},
	test: {
		include: ['test/**/*.test.ts'],
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			instances: [{ browser: 'chromium' }],
		},
	},
});
