import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import retrie from 'retrie';
import { defineConfig, type Rolldown } from 'tsdown';

function nsisLanguagePlugin(): Rolldown.Plugin {
	const langPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../data/language.json');
	const lang = JSON.parse(readFileSync(langPath, 'utf-8'));

	const replacements: Record<string, string> = {
		'%NSIS_KEYWORDS%': retrie([...lang.keywords, ...lang.blocks]).toString(),
		'%NSIS_PROPERTIES%': retrie(lang.properties).toString(),
		'%NSIS_IMPORTANT%': retrie([...lang.important, ...lang.importantBlocks]).toString(),
	};

	return {
		name: 'nsis-language',
		transform(code, id) {
			if (!id.endsWith('nsis.ts')) return;

			let result = code;
			for (const [placeholder, value] of Object.entries(replacements)) {
				result = result.replaceAll(placeholder, value);
			}

			return { code: result };
		},
	};
}

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node20',
		clean: isProduction,
		dts: isProduction,
		entry: 'src/nsis.ts',
		format: ['cjs', 'esm'],
		minify: isProduction,
		plugins: [nsisLanguagePlugin()],
	};
});
