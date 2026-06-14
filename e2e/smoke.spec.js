// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('FIN browser smoke', () => {
    test('homepage loads', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Fisheries Inspection Navigator' })).toBeVisible();
        await expect(page.getByText('Select Regional Fishery')).toBeVisible();
    });

    test('species selection → assessment shows content (not blank)', async ({ page }) => {
        await page.goto('/');

        await page.locator('.regional-fishery-card').first().click();
        await expect(page.getByRole('heading', { name: 'Select Species to Inspect' })).toBeVisible();

        const codCard = page.locator('[data-species-id="atlantic-cod"]');
        await expect(codCard).toBeVisible({ timeout: 15_000 });
        await codCard.click();

        const proceed = page.locator('#continue-species');
        await expect(proceed).toBeEnabled();
        await proceed.click();

        const assessment = page.locator('#assessment-sections .grouped-assessment');
        await expect(assessment.first()).toBeVisible({ timeout: 15_000 });
        await expect(page.locator('#assessment-load-error[hidden]')).toHaveCount(1);
        await expect(page.getByRole('heading', { name: /Permits|Species Assessment|Vessel Classification/i }).first()).toBeVisible();
    });

    test('dark mode toggle applies theme', async ({ page }) => {
        await page.goto('/');
        const toggle = page.locator('#theme-toggle');
        await toggle.click();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
        await expect(page.locator('.regional-fishery-card h3').first()).toBeVisible();
    });
});
