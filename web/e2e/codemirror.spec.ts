import { expect, test } from '@playwright/test';
import { collectConsoleErrors, expectNoConsoleErrors } from './helpers.ts';

test('highlights syntax', async ({ page }) => {
	const errors = collectConsoleErrors(page);
	await page.goto('/codemirror/');

	const editor = page.locator('.cm-editor');
	await expect(editor).toBeVisible();

	const highlighted = editor.locator('.cm-line span').filter({
		has: page.locator(':scope'),
		hasNot: page.locator('span'),
	});
	const count = await highlighted.count();
	const hasColor = await Promise.all(
		Array.from({ length: Math.min(count, 20) }, (_, i) =>
			highlighted.nth(i).evaluate((el) => {
				const color = getComputedStyle(el).color;
				return color !== '' && color !== 'rgb(0, 0, 0)';
			}),
		),
	);

	expect(hasColor.some(Boolean)).toBe(true);

	expectNoConsoleErrors(errors);
});
