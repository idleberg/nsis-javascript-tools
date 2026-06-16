import { join, resolve } from 'node:path';
import { promises as fs } from 'node:fs';
import { replacements } from './replacements.mjs';
import ejs from 'ejs';
import retrie from 'retrie';
import shell from 'shelljs';

const cacheDir = resolve(process.cwd(), '.cache');
const distDir = resolve(process.cwd(), 'dist');

async function main() {
	try {
		shell.cp(resolve(process.cwd(), './src/nsis.js'), resolve(cacheDir, 'lib/ace/mode/'));
	} catch (e) {
		throw Error('Failed to copy nsis.js');
	}

	try {
		const template = await fs.readFile(resolve(process.cwd(), './src/nsis_highlight_rules.ejs'), 'utf-8');
		const output = ejs.render(template, {
			replacements: {
				NSIS_BLOCKS: retrie(replacements.NSIS_BLOCKS),
				NSIS_PROPERTIES: retrie(replacements.NSIS_PROPERTIES),
				NSIS_IMPORTANT: retrie(replacements.NSIS_IMPORTANT),
				NSIS_IMPORTANT_BLOCKS: retrie(replacements.NSIS_IMPORTANT_BLOCKS),
				NSIS_KEYWORDS: retrie(replacements.NSIS_KEYWORDS)
			}
		});

		await fs.writeFile(resolve(cacheDir, 'lib/ace/mode/nsis_highlight_rules.js'), output);
	} catch (e) {
		throw Error('Failed to generate nsis_highlight_rules.js', e);
	}

	shell.exec('./Makefile.dryice.js normal', {
		cwd: cacheDir
	});

	try {
		shell.mkdir(distDir);
	} catch {
		console.log('dist directory already exists');
	}

	shell.cp(resolve(cacheDir, 'build/src/mode-nsis.js'), join(distDir, 'mode-nsis.js'));

	shell.cp(resolve(cacheDir, 'build/src-noconflict/mode-nsis.js'), join(distDir, 'mode-nsis.noconflict.js'));
}

await main();
