import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import ejs from 'ejs';
import retrie from 'retrie';
import { replacements } from './replacements.mjs';

const distDir = resolve(process.cwd(), 'dist');

function extractModuleBody(source) {
	const openIndex = source.indexOf('{');
	const closeIndex = source.lastIndexOf('}');
	return source.slice(openIndex + 1, closeIndex).replace(/\n$/, '');
}

function extractDependencies(source) {
	const deps = ['require', 'exports', 'module'];
	const requirePattern = /require\(['"]([^'"]+)['"]\)/g;

	for (const match of source.matchAll(requirePattern)) {
		const dep = match[1];
		const resolved = dep.startsWith('../')
			? `ace/${dep.slice(3)}`
			: dep.startsWith('./')
				? `ace/mode/${dep.slice(2)}`
				: dep;

		if (!deps.includes(resolved)) {
			deps.push(resolved);
		}
	}

	return deps;
}

function wrapModule(moduleId, body, deps, prefix) {
	const depList = deps.map((d) => `"${d}"`).join(',');
	return `${prefix ?? ''}define("${moduleId}",[${depList}], function(require, exports, module) {\n${body}\n});`;
}

function wrapBootstrap(moduleId, requireFn = 'window.require') {
	return [
		'                (function() {',
		`                    ${requireFn}(["${moduleId}"], function(m) {`,
		'                        if (typeof module == "object" && typeof exports == "object" && module) {',
		'                            module.exports = m;',
		'                        }',
		'                    });',
		'                })();\n',
	].join('\n');
}

async function main() {
	const template = await fs.readFile(resolve(process.cwd(), './src/nsis_highlight_rules.ejs'), 'utf-8');
	const highlightRulesSource = ejs.render(template, {
		replacements: {
			NSIS_BLOCKS: retrie(replacements.NSIS_BLOCKS),
			NSIS_PROPERTIES: retrie(replacements.NSIS_PROPERTIES),
			NSIS_IMPORTANT: retrie(replacements.NSIS_IMPORTANT),
			NSIS_IMPORTANT_BLOCKS: retrie(replacements.NSIS_IMPORTANT_BLOCKS),
			NSIS_KEYWORDS: retrie(replacements.NSIS_KEYWORDS),
		},
	});

	const modeSource = await fs.readFile(resolve(process.cwd(), './src/nsis.js'), 'utf-8');

	const highlightBody = extractModuleBody(highlightRulesSource);
	const highlightDeps = extractDependencies(highlightRulesSource);
	const modeBody = extractModuleBody(modeSource);
	const modeDeps = extractDependencies(modeSource);

	await fs.mkdir(distDir, { recursive: true });

	const normalOutput = [
		wrapModule('ace/mode/nsis_highlight_rules', highlightBody, highlightDeps),
		'\n',
		wrapModule('ace/mode/nsis', modeBody, modeDeps),
		wrapBootstrap('ace/mode/nsis'),
	].join('');

	const noconflictOutput = [
		wrapModule('ace/mode/nsis_highlight_rules', highlightBody, highlightDeps, 'ace.'),
		'\n',
		wrapModule('ace/mode/nsis', modeBody, modeDeps, 'ace.'),
		wrapBootstrap('ace/mode/nsis', 'ace.require'),
	].join('');

	await fs.writeFile(resolve(distDir, 'mode-nsis.js'), normalOutput);
	await fs.writeFile(resolve(distDir, 'mode-nsis.noconflict.js'), noconflictOutput);

	console.log('Built dist/mode-nsis.js and dist/mode-nsis.noconflict.js');
}

await main();
