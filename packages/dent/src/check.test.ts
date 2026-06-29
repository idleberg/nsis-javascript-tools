import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from 'vitest';
import { createFormatter } from './dent.ts';

// --- Already-formatted input returns null ---

test('Returns null for already tab-indented content', async () => {
	const { check } = createFormatter();

	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/tab-indentation.nsi'), 'utf8');

	expect(check(expected)).toBe(null);
});

test('Returns null for already space-indented content', async () => {
	const { check } = createFormatter({
		useTabs: false,
	});

	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/space-indentation.nsi'), 'utf8');

	expect(check(expected)).toBe(null);
});

test('Returns null for already trimmed empty lines', async () => {
	const { check } = createFormatter();

	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/empty-lines.nsi'), 'utf8');

	expect(check(expected)).toBe(null);
});

test('Returns null for already formatted quotes', async () => {
	const { check } = createFormatter();

	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/quotes.nsi'), 'utf8');

	expect(check(expected)).toBe(null);
});

// --- Unformatted input returns formatted string ---

test('Returns formatted string for unformatted indentation', async () => {
	const { check } = createFormatter();

	const fixture = await fs.readFile(resolve(process.cwd(), 'tests/fixtures/indentation.nsi'), 'utf8');
	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/tab-indentation.nsi'), 'utf8');

	expect(check(fixture)).toBe(expected);
});

test('Returns formatted string when useTabs is false', async () => {
	const { check } = createFormatter({
		useTabs: false,
	});

	const fixture = await fs.readFile(resolve(process.cwd(), 'tests/fixtures/indentation.nsi'), 'utf8');
	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/space-indentation.nsi'), 'utf8');

	expect(check(fixture)).toBe(expected);
});

test('Returns formatted string for excess empty lines', async () => {
	const { check } = createFormatter();

	const fixture = await fs.readFile(resolve(process.cwd(), 'tests/fixtures/empty-lines.nsi'), 'utf8');
	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/empty-lines.nsi'), 'utf8');

	expect(check(fixture)).toBe(expected);
});

test('Returns formatted string for unformatted quotes', async () => {
	const { check } = createFormatter();

	const fixture = await fs.readFile(resolve(process.cwd(), 'tests/fixtures/quotes.nsi'), 'utf8');
	const expected = await fs.readFile(resolve(process.cwd(), 'tests/expected/quotes.nsi'), 'utf8');

	expect(check(fixture)).toBe(expected);
});

// --- Inline cases ---

test('Returns null for canonical-cased instruction', () => {
	const { check } = createFormatter();
	expect(check('Name "demo"\n')).toBe(null);
});

test('Returns formatted string for non-canonical casing', () => {
	const { check } = createFormatter();
	expect(check('name "demo"\n')).toBe('Name "demo"\n');
});

test('Returns formatted string when indentation differs', () => {
	const { check } = createFormatter({ useTabs: false, indentSize: 2 });
	const input = 'Function .onInit\n\tNop\nFunctionEnd\n';
	const expected = 'Function .onInit\n  Nop\nFunctionEnd\n';
	expect(check(input)).toBe(expected);
});
