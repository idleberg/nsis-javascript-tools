import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vitest/config';

const treeSitterNsisDir = dirname(fileURLToPath(import.meta.resolve('tree-sitter-nsis/wasm')));

function scmRawPlugin(): Plugin {
	return {
		name: 'scm-raw',
		enforce: 'pre',
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

export default defineConfig({
	plugins: [scmRawPlugin()],
	test: {
		include: ['**/*.test.ts'],
	},
});
