import type { Language, WasmRef } from '@lumis-sh/lumis';
import highlights from 'tree-sitter-nsis/queries/highlights.scm';
import { getTreeSitterVersion } from './macros.ts' with { type: 'macro' };

export type RuntimeWasmInput = Uint8Array | ArrayBuffer | string | URL;

export type LanguageOptions = {
	wasm?: WasmRef | RuntimeWasmInput;
	highlights?: string;
};

const defaultWasmRef: WasmRef = {
	packageName: 'tree-sitter-nsis',
	name: 'tree-sitter-nsis',
	version: getTreeSitterVersion(),
};

export const nsis: Language = {
	id: 'nsis',
	aliases: ['nsi', 'nsh'],
	highlights,
	wasm: defaultWasmRef,
};

export function createLanguage(options?: LanguageOptions): Language {
	return {
		id: 'nsis',
		aliases: ['nsi', 'nsh'],
		highlights: options?.highlights ?? highlights,
		wasm: options?.wasm ?? defaultWasmRef,
	};
}
