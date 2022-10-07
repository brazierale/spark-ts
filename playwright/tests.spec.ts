import { test, expect } from './fixtures';

test('display test case details', async ({ singleTestPage }) => {
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

test('add new test case using Enter', async ({ singleTestPage }) => {
  await singleTestPage.route('**/api/testCases/*', (route) =>
    route.fulfill({ path: './playwright/single-test-case.json' })
  );

  await singleTestPage
    .locator('data-testid=test-case-new')
    .click.type('test input')
    .press('Enter');

  await expect(singleTestPage('data-testid=test-case-new')).toHaveText('');
  await expect(
    singleTestPage.locator('data-testid=test-case').hasText('test input')
  ).toBeVisible();
});
