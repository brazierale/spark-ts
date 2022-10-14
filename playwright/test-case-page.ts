import { expect, Locator, Page } from '@playwright/test';

export class TestCasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loadSingleTestCase() {
    await this.page.route('**/api/testCases', (route) =>
      route.fulfill({ path: './playwright/single-test-case.json' })
    );

    await this.page.goto('http://localhost:3000');

    await this.page
      .locator('data-testid=test-case-input', {
        hasText: 'first test',
      })
      .click();
  }

  async mockTestCaseUpdate(fixture: string) {
    await this.page.route('**/api/testCases/*', (route) =>
      route.fulfill({ path: `./playwright/${fixture}` })
    );
  }

  async selectTestCase(summary: string) {
    await this.page
    .locator('data-testid=test-case', { hasText: summary })
    .click();
  }

  async addTestCase(summary: string) {
    await this.page.locator('data-testid=test-case-new').click();
    await this.page.locator('data-testid=test-case-new').type(summary);
    await this.page.locator('data-testid=test-case-new').press('Enter');
  }

  async addStep(name: string) {
    await this.page.locator('data-testid=step-new').click();
    await this.page.locator('data-testid=step-new').type(name);
    await this.page.locator('data-testid=step-new').press('Enter');
  }

  async addTag(name: string) {
    await this.page.locator('data-testid=tag-new').click();
    await this.page.locator('data-testid=tag-new').type(name);
    await this.page.locator('data-testid=tag-new').press('Enter');
  }
}
