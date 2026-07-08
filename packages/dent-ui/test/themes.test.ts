import { describe, expect, it } from 'vitest';
import { darkTheme, editorTheme, lightTheme } from '../src/themes.ts';

describe('themes', () => {
	it('exports editorTheme as a CodeMirror extension', () => {
		expect(editorTheme).toBeDefined();
	});

	it('exports darkTheme as an array of extensions', () => {
		expect(Array.isArray(darkTheme)).toBe(true);
		expect(darkTheme.length).toBe(2);
	});

	it('exports lightTheme as an array of extensions', () => {
		expect(Array.isArray(lightTheme)).toBe(true);
		expect(lightTheme.length).toBe(2);
	});

	it('darkTheme and lightTheme are different objects', () => {
		expect(darkTheme).not.toBe(lightTheme);
		expect(darkTheme[0]).not.toBe(lightTheme[0]);
	});
});
