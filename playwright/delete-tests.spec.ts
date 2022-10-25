import { test, expect } from '@playwright/test';
import { TestCasePage } from './test-case-page';

test('delete test case, step and tag using delete button', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadTestCasesToDelete();

  await page
    .locator('text=step one to delete').hover();

  await page
    .locator('text=step one to deletex >> [data-testid="step-delete"]').click();

    expect(page.locator('data-testid=step', { hasText: 'step one to delete' })).not.toBeVisible;
    expect(page.locator('data-testid=step', { hasText: 'step one to delete' })).toBeVisible;
});
