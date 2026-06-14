/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
    testDir: './e2e',
    timeout: 60_000,
    retries: process.env.CI ? 1 : 0,
    use: {
        baseURL: 'http://127.0.0.1:4173',
        trace: 'on-first-retry'
    },
    webServer: {
        command: 'npx --yes serve . -l 4173',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } }
    ]
};
