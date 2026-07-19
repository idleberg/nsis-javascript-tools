import { expect, test } from '@playwright/test';
import { collectConsoleErrors, expectNoConsoleErrors } from './helpers.ts';

test('highlights syntax', async ({ page }) => {
	const errors = collectConsoleErrors(page);
	await page.goto('/highlightjs/');

	const code = page.locator('code.language-nsis');
	await expect(code).toBeVisible();
	await expect(code.locator('span.hljs-keyword, span.hljs-string, span.hljs-title')).not.toHaveCount(0);

	expectNoConsoleErrors(errors);
});
