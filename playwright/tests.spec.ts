import { test, expect } from '@playwright/test';

test('load test case', async ({ page }) => {
  await page.route('**/api/testCases', (route) =>
    route.fulfill({ path: './playwright/single-test-case.json' })
  );
  await page.goto('http://localhost:3000');

  const testCase = await page.locator('data-testid=test-case-input', {
    hasText: 'first test',
  });
  await testCase.click();

  await expect(page.locator('data-testid=description-input')).toHaveText(
    ' first test description'
  );
  await expect(
    page.locator('data-testid=step', { hasText: 'step one' })
  ).toBeVisible();
  await expect(
    page.locator('data-testid=step', { hasText: 'step two' })
  ).toBeVisible();
  await expect(
    page.locator('data-testid=tag', { hasText: 'one' })
  ).toBeVisible();
  await expect(
    page.locator('data-testid=tag', { hasText: 'test' })
  ).toBeVisible();
});
