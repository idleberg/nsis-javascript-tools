import { defineConfig } from '@playwright/test';

const port = 4380;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	use: {
		baseURL,
	},
	projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
	webServer: {
		command: `npx --yes serve dist -l ${port}`,
		url: baseURL,
		reuseExistingServer: !process.env.CI,
	},
});
