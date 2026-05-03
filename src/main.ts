import { glob, readFile, writeFile } from 'node:fs/promises';
import { createFormatter } from '@nsis/dent';
import { blue, dim } from 'kleur/colors';
import { handleCLI } from './cli.ts';
import { logger } from './log.ts';
import { fileExists } from './utils.ts';

const { args, options } = await handleCLI();

const files = await Array.fromAsync(glob(args, { cwd: process.cwd() }));

if (files.length === 0) {
	logger.error('No valid input files provided, exiting.');
	process.exit(1);
}

const { format } = createFormatter({
	endOfLines: options.eol,
	indentSize: options.indentSize,
	trimEmptyLines: options.trim,
	useTabs: !options.useSpaces,
});

if (options.write) {
	logger.start(`Formatting ${args.length} ${args.length === 1 ? 'file' : 'files'}...`);
}

const outerStartTime = performance.now();

for await (const file of files) {
	if (!file.endsWith('.nsi') && !file.endsWith('.nsh')) {
		logger.warn(`${blue(file)} is not an NSIS script, skipping.`);
		continue;
	}

	const startTime = performance.now();

	if ((await fileExists(file)) === false) {
		logger.warn(`${blue(file)} does not exist, skipping.`);
		continue;
	}

	const rawContents = (await readFile(file)).toString();
	const formattedContents = format(rawContents);

	const endTime = performance.now();
	const duration = Math.round(endTime - startTime);

	if (options.write) {
		await writeFile(file, formattedContents, {
			encoding: 'utf-8',
		});

		logger.info(`${blue(file)} formatted ${dim(`(${duration}ms)`)}`);
	} else {
		process.stdout.write(formattedContents);
	}
}

if (options.write) {
	const outerEndTime = performance.now();
	const outerDuration = Math.round(outerEndTime - outerStartTime);

	logger.success(`Completed in ${outerDuration}ms.`);
}
