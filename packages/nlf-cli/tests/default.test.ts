import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { expect, test } from 'vitest';

const cli = resolve(process.cwd(), 'src/cli.ts');
const fixturesDir = resolve(process.cwd(), 'tests/fixtures');
const files = readdirSync(fixturesDir)
	.filter((f) => f.endsWith('.nlf'))
	.map((f) => join(fixturesDir, f));

for (const file of files) {
	const fileDir = dirname(file);
	const fileBase = basename(file, '.nlf');
	const jsonFile = join(fileDir, `${fileBase}.json`);

	test(`NLF: ${basename(file)}`, () => {
		const actual = JSON.parse(spawnSync('node', [cli, '--stdout', '--no-lines', file]).stdout.toString());
		const expected = JSON.parse(readFileSync(jsonFile, 'utf8'));

		expect(actual).toEqual(expected);
	});

	test(`NLF: ${basename(file)} (CRLF)`, () => {
		const actual = spawnSync('node', [cli, '--stdout', '--no-lines', '--eol crlf', file]).stdout.toString();

		expect(actual.split('\r\n').length).toBe(actual.split('\n').length);
	});

	test(`NLF: ${basename(file)} (LF)`, () => {
		const actual = spawnSync('node', [cli, '--stdout', '--no-lines', '--eol lf', file]).stdout.toString();

		expect(actual.split('\r\n')).toEqual([actual]);
	});
}
