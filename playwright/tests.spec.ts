import { test, expect } from './fixtures';

test('load test case', async ({ singleTestPage }) => {
  await expect(
    singleTestPage.locator('data-testid=description-input')
  ).toHaveText(' first test description');
  await expect(
    singleTestPage.locator('data-testid=step', { hasText: 'step one' })
  ).toBeVisible();
  await expect(
    singleTestPage.locator('data-testid=step', { hasText: 'step two' })
  ).toBeVisible();
  await expect(
    singleTestPage.locator('data-testid=tag', { hasText: 'one' })
  ).toBeVisible();
  await expect(
    singleTestPage.locator('data-testid=tag', { hasText: 'test' })
  ).toBeVisible();
});
