import { describe, expect, it } from 'vitest';
import { createLanguage } from './index.ts';

describe('createLanguage', () => {
	it('should return a language with correct id', () => {
		const lang = createLanguage();

		expect(lang.id).toBe('nsis');
	});

	it('should return the expected aliases', () => {
		const lang = createLanguage();

		expect(lang.aliases).toEqual(['nsi', 'nsh']);
	});

	it('should include bundled highlights by default', () => {
		const lang = createLanguage();

		expect(lang.highlights).toBeTypeOf('string');
		expect(lang.highlights.length).toBeGreaterThan(0);
	});

	it('should contain Tree-sitter query patterns in highlights', () => {
		const lang = createLanguage();

		expect(lang.highlights).toContain('@keyword');
		expect(lang.highlights).toContain('@comment');
		expect(lang.highlights).toContain('@string');
		expect(lang.highlights).toContain('@variable');
	});

	it('should not contain (?i) flags in highlights', () => {
		const lang = createLanguage();

		expect(lang.highlights).not.toContain('(?i)');
	});

	it('should accept custom highlights', () => {
		const custom = '(identifier) @variable';
		const lang = createLanguage({ highlights: custom });

		expect(lang.highlights).toBe(custom);
	});

	it('should default wasm to a WasmRef', () => {
		const lang = createLanguage();

		expect(lang.wasm).toEqual({
			packageName: 'tree-sitter-nsis',
			name: 'tree-sitter-nsis',
			version: expect.stringMatching(/^\d+\.\d+$/),
		});
	});

	it('should pass through a custom wasm option', () => {
		const wasm = new Uint8Array([1, 2, 3]);
		const lang = createLanguage({ wasm });

		expect(lang.wasm).toBe(wasm);
	});

	it('should accept a string URL as wasm', () => {
		const wasm = 'https://example.com/tree-sitter-nsis.wasm';
		const lang = createLanguage({ wasm });

		expect(lang.wasm).toBe(wasm);
	});

	it('should accept a URL object as wasm', () => {
		const wasm = new URL('https://example.com/tree-sitter-nsis.wasm');
		const lang = createLanguage({ wasm });

		expect(lang.wasm).toBe(wasm);
	});
});
