import { expect, test } from '@playwright/test';
import { collectConsoleErrors } from './helpers.ts';

test('highlights syntax', async ({ page }) => {
	const errors = collectConsoleErrors(page);
	await page.goto('/ace-mode/');

	const editor = page.locator('.ace_editor');
	await expect(editor).toBeVisible();
	await expect(editor.locator('.ace_keyword, .ace_string, .ace_function')).not.toHaveCount(0);

	const unexpected = errors.filter((e) => !e.includes('FoldMode'));
	expect(unexpected).toEqual([]);
});
