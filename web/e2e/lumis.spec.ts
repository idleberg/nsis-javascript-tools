import { expect, test } from '@playwright/test';
import { collectConsoleErrors, expectNoConsoleErrors } from './helpers.ts';

test('highlights syntax', async ({ page }) => {
	const errors = collectConsoleErrors(page);
	await page.goto('/lumis/');

	const output = page.locator('#output');
	await expect(output.locator('pre')).toBeVisible();
	await expect(output.locator('span[style*="color"]')).not.toHaveCount(0);

	expectNoConsoleErrors(errors);
});
