import { fileTests } from '@lezer/generator/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { describe, it } from 'vitest';
import { parser } from '../src/parser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const caseDir = path.join(__dirname, 'cases');

for (const file of fs.readdirSync(caseDir)) {
	if (!/\.txt$/.test(file)) continue;
	describe(file, () => {
		for (const { name, run } of fileTests(fs.readFileSync(path.join(caseDir, file), 'utf8'), file))
			it(name, () => run(parser));
	});
}
