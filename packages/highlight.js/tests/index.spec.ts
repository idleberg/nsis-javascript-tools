import fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import hljs from 'highlight.js';
import { describe, expect, it } from 'vitest';
import hljsDefineNSIS from '../src/nsis.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

hljs.registerLanguage('nsis', hljsDefineNSIS);

describe('Default', () => {
	it('should generate markup', async () => {
		const code = await fs.readFile(join(__dirname, 'fixtures/actual.txt'), 'utf-8');
		const actual = hljs.highlight(code, { language: 'nsis' }).value.trim();
		const expected = (await fs.readFile(join(__dirname, 'fixtures/expected.txt'), 'utf-8')).trim();

		expect(actual).toBe(expected);
	});

	it('should detect language', async () => {
		const code = await fs.readFile(join(__dirname, 'fixtures/actual.txt'), 'utf-8');
		const actual = hljs.highlightAuto(code).language;

		expect(actual).toBe('nsis');
	});
});

describe('Variables', () => {
	it('should generate markup', async () => {
		const code = await fs.readFile(join(__dirname, 'fixtures/variables.txt'), 'utf-8');
		const actual = hljs.highlight(code, { language: 'nsis' }).value.trim();
		const expected = (await fs.readFile(join(__dirname, 'fixtures/variables.expect.txt'), 'utf-8')).trim();

		expect(actual).toBe(expected);
	});
});
