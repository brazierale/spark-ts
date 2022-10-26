import { test, expect } from '@playwright/test';
import { TestCasePage } from './test-case-page';

test('delete test case, step and tag using delete button', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadTestCasesToDelete();

  await page.locator('text=step one to delete').hover();

  await page
    .locator('text=step one to deletex >> [data-testid="step-delete"]')
    .click();

  await expect(
    page.locator('data-testid=step', { hasText: 'step one to delete' })
  ).toBeHidden();

  await expect(
    page.locator('data-testid=step', { hasText: 'step two to delete' })
  ).toBeVisible();
});

test('delete by clearing summary field in test case list', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadTestCasesToDelete();

  await testCasePage.selectTestCase('second test to delete');

  await page
    .locator('data-testid=test-case-input', {
      hasText: 'second test to delete',
    })
    .fill('');

  await page
    .locator('data-testid=test-case', {
      hasText: '',
    })
    .first()
    .press('Enter');

  await expect(page.locator('data-testid=test-case')).toHaveCount(2);
  await expect(
    page.locator('data-testid=test-case', { hasText: 'first test' })
  ).toBeVisible();
  await expect(
    page.locator('data-testid=test-case', { hasText: 'second test to delete' })
  ).toBeHidden();
});

test('delete by clearing summary field in detail pane', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadTestCasesToDelete();

  await testCasePage.selectTestCase('second test to delete');

  await page.locator('data-testid=summary').fill('');
  await page.locator('data-testid=save').click();

  await expect(page.locator('data-testid=test-case')).toHaveCount(2);
  await expect(
    page.locator('data-testid=test-case', { hasText: 'first test' })
  ).toBeVisible();
  await expect(
    page.locator('data-testid=test-case', { hasText: 'second test to delete' })
  ).toBeHidden();
});
