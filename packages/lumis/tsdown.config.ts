import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Rolldown } from 'tsdown';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node20',
		clean: isProduction,
		dts: isProduction,
		entry: ['src/index.ts', 'src/language.ts'],
		format: ['cjs', 'esm'],
		minify: isProduction,
		deps: {
			alwaysBundle: ['tree-sitter-nsis/queries/highlights.scm'],
		},
		plugins: [scmRawPlugin()],
	};
});

const treeSitterNsisDir = dirname(fileURLToPath(import.meta.resolve('tree-sitter-nsis/wasm')));

function scmRawPlugin(): Rolldown.Plugin {
	return {
		name: 'scm-raw',
		resolveId(source) {
			if (!source.endsWith('.scm')) return;
			const relative = source.replace(/^tree-sitter-nsis\//, '');
			return resolve(treeSitterNsisDir, relative);
		},
		load(id) {
			if (!id.endsWith('.scm')) return;

			const content = readFileSync(id, 'utf-8').replaceAll('(?i)', '');
			return `export default ${JSON.stringify(content)};`;
		},
	};
}
