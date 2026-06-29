import { promises as fs, globSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import JSON5 from 'json5';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as NLF from '../src/index.ts';

const files = globSync(resolve(process.cwd(), 'tests/fixtures/*.nlf'));

for (const file of files) {
	const fileDir = dirname(file);
	const fileBase = basename(file, '.nlf');

	test(`parse: ${fileBase}`, async () => {
		const nlfFile = await fs.readFile(file, 'utf8');
		const jsonPath = resolve(fileDir, `${fileBase}.json`);
		const jsonFile = await fs.readFile(jsonPath, 'utf8');

		const actual = NLF.parse(nlfFile);
		const expected = JSON.parse(jsonFile);

		assert.equal(actual, expected);
	});

	test(`stringify from object: ${fileBase}`, async () => {
		const nlfFile = await fs.readFile(file, 'utf8');
		const jsonPath = resolve(fileDir, `${fileBase}.json`);
		const jsonFile = await fs.readFile(jsonPath, 'utf8');

		const nlfString = NLF.stringify(JSON5.parse(jsonFile));

		// Remove comments and normalize line endings
		const actual = nlfString.replace(/^#.*(\r?\n|$)/gm, '').replace(/\r\n/g, '\n');
		const expected = nlfFile
			.trim()
			.replace(/^#.*(\r?\n|$)/gm, '')
			.replace(/\r\n/g, '\n');

		assert.is(actual, expected);
	});

	test(`stringify from JSON: ${fileBase}`, async () => {
		const nlfFile = await fs.readFile(file, 'utf8');
		const jsonPath = resolve(fileDir, `${fileBase}.json`);
		const jsonFile = await fs.readFile(jsonPath, 'utf8');

		const nlfString = NLF.stringify(jsonFile);

		// Remove comments and normalize line endings
		const actual = nlfString.replace(/^#.*(\r?\n|$)/gm, '').replace(/\r\n/g, '\n');
		const expected = nlfFile
			.trim()
			.replace(/^#.*(\r?\n|$)/gm, '')
			.replace(/\r\n/g, '\n');

		assert.is(actual, expected);
	});
}

test.run();
