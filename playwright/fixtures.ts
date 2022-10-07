const base = require('@playwright/test');

export const test = base.test.extend({
  singleTestPage: async ({ page }, use) => {
    await page.route('**/api/testCases', (route) =>
      route.fulfill({ path: './playwright/single-test-case.json' })
    );

    await page.goto('http://localhost:3000');

    await page
      .locator('data-testid=test-case-input', {
        hasText: 'first test',
      })
      .click();

    await use(page);
  },
});

export { expect } from '@playwright/test';
