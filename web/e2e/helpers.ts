import { expect, type Page } from '@playwright/test';

export function collectConsoleErrors(page: Page): string[] {
	const errors: string[] = [];

	page.on('console', (msg) => {
		if (msg.type() === 'error') {
			errors.push(msg.text());
		}
	});

	page.on('pageerror', (err) => {
		errors.push(err.message);
	});

	return errors;
}

export function expectNoConsoleErrors(errors: string[]) {
	expect(errors).toEqual([]);
}
