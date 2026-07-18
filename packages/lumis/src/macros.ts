import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

export function getTreeSitterVersion(): string {
	const require = createRequire(import.meta.url);
	const wasmPath = require.resolve('tree-sitter-nsis/wasm');
	const pkgPath = join(dirname(wasmPath), 'package.json');
	const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

	return pkg.version.split('.').slice(0, 2).join('.');
}
