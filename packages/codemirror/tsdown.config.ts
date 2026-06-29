import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	deps: {
		neverBundle: ['@codemirror/autocomplete', '@codemirror/language', '@lezer/highlight', '@lezer/lr'],
	},
	dts: true,
});
