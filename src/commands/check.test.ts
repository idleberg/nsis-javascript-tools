import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Command } from 'commander';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '../log.ts';
import { checkCommand } from './check.ts';

const UNFORMATTED = 'Section "demo"\n  DetailPrint "x"\nSectionEnd\n';
const FORMATTED = 'Section "demo"\n\tDetailPrint "x"\nSectionEnd\n';

function buildRoot() {
	return new Command('dent').exitOverride().option('-D, --debug', '', false).addCommand(checkCommand());
}

describe('checkCommand shape', () => {
	it('is named "check" with the expected description', () => {
		const cmd = checkCommand();
		expect(cmd.name()).toBe('check');
		expect(cmd.description().toLowerCase()).toContain('check');
	});

	it('exposes formatting options plus --write', () => {
		const longs = checkCommand().options.map((opt) => opt.long);
		expect(longs).toEqual(expect.arrayContaining(['--eol', '--indent-size', '--use-spaces', '--trim', '--write']));
	});
});

describe('check action', () => {
	let dir: string;
	let exit: ReturnType<typeof vi.spyOn>;

	beforeEach(async () => {
		dir = await mkdtemp(join(tmpdir(), 'dent-check-'));
		vi.spyOn(logger, 'start').mockImplementation(() => undefined);
		vi.spyOn(logger, 'info').mockImplementation(() => undefined);
		vi.spyOn(logger, 'success').mockImplementation(() => undefined);
		vi.spyOn(logger, 'warn').mockImplementation(() => undefined);
		vi.spyOn(logger, 'error').mockImplementation(() => undefined);
		vi.spyOn(logger, 'debug').mockImplementation(() => undefined);
		exit = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as (code?: number) => never);
	});

	afterEach(async () => {
		await rm(dir, { recursive: true, force: true });
		vi.restoreAllMocks();
	});

	it('exits 0 for an already-formatted file', async () => {
		const file = join(dir, 'clean.nsi');
		await writeFile(file, FORMATTED);

		await buildRoot().parseAsync(['check', file], { from: 'user' });

		expect(exit).not.toHaveBeenCalled();
	});

	it('exits 1 on drift without --write', async () => {
		const file = join(dir, 'dirty.nsi');
		await writeFile(file, UNFORMATTED);

		await buildRoot().parseAsync(['check', file], { from: 'user' });

		expect(exit).toHaveBeenCalledWith(1);
		expect(await readFile(file, 'utf8')).toBe(UNFORMATTED);
	});

	it('writes fixes and still exits 1 on drift with --write', async () => {
		const file = join(dir, 'dirty.nsi');
		await writeFile(file, UNFORMATTED);

		await buildRoot().parseAsync(['check', '--write', file], { from: 'user' });

		expect(exit).toHaveBeenCalledWith(1);
		expect(await readFile(file, 'utf8')).toBe(FORMATTED);
	});

	it('exits 2 when no input files match', async () => {
		await buildRoot().parseAsync(['check', join(dir, '*.nope')], { from: 'user' });

		expect(exit).toHaveBeenCalledWith(2);
	});
});
