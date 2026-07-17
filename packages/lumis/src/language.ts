import type { Language } from '@lumis-sh/lumis';
import highlights from 'tree-sitter-nsis/queries/highlights.scm';

export type WasmInput = URL | string | Uint8Array | ArrayBuffer;

export type LanguageOptions = {
	wasm: WasmInput;
	highlights?: string;
};

export function createLanguage(options: LanguageOptions): Language {
	return {
		id: 'nsis',
		aliases: ['nsi', 'nsh'],
		highlights: options.highlights ?? highlights,
		wasm: options.wasm,
	};
}
