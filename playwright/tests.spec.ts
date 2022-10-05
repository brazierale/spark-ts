import { test, expect } from '@playwright/test';

test('load test case', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle(/Spark/);
  const testCase = await page.locator('data-testid=test-case-input', {
    hasText: 'first test',
  });

  const summary = await page.locator('data-testid=description-input');

  await testCase.click();

  await expect(summary).toHaveText('first test description');
});
