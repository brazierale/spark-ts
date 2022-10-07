import { test, expect } from '@playwright/test';

test('load test case', async ({ page }) => {
  let body = JSON.stringify({
    success: true,
    data: [
      {
        tags: ['one', 'test'],
        steps: [
          {
            id: 1,
            name: 'step one',
          },
          {
            id: 2,
            name: 'step two',
          },
        ],
        key: '84dbe4ea-f98f-4d0a-bdfd-ab7173070f55',
        sortId: 1,
        summary: 'first test',
        description: 'first test description',
        __v: 0,
      },
    ],
  });

  await page.route('**/api/testCases', (route) =>
    route.fulfill({
      status: 200,
      body: body,
    })
  );

  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle(/Spark/);
  const testCase = await page.locator('data-testid=test-case-input', {
    hasText: 'first test',
  });

  const summary = await page.locator('data-testid=description-input');

  await testCase.click();

  await expect(summary).toHaveText('first test description');
});
