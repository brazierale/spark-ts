import { test, expect } from './fixtures';

test('display test case details', async ({ singleTestPage }) => {
  await expect(
    singleTestPage.locator('data-testid=description-input')
  ).toHaveValue('first test description');
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

  await singleTestPage.locator('data-testid=test-case-new').fill('test input');
  await singleTestPage.locator('data-testid=test-case-new').press('Enter');

  await expect(singleTestPage.locator('data-testid=test-case-new')).toHaveValue(
    ''
  );
  await expect(
    singleTestPage.locator('data-testid=test-case', { hasText: 'test input' })
  ).toBeVisible();
});

test('add new test case using Save', async ({ singleTestPage }) => {
  await singleTestPage.route('**/api/testCases/*', (route) =>
    route.fulfill({ path: './playwright/single-test-case.json' })
  );

  await singleTestPage.locator('data-testid=test-case-new').fill('test input');
  await singleTestPage.locator('data-testid=save').click();

  await expect(singleTestPage.locator('data-testid=test-case-new')).toHaveValue(
    ''
  );
  await expect(
    singleTestPage.locator('data-testid=test-case', { hasText: 'test input' })
  ).toBeVisible();
});

test('edit and save test case', async ({ singleTestPage }) => {
  await singleTestPage.route('**/api/testCases/*', (route) =>
    route.fulfill({ path: './playwright/single-test-case.json' })
  );

  singleTestPage
    .locator('data-testid=test-case', { hasText: 'first test' })
    .click();
  await singleTestPage.locator('data-testid=summary').click();
  await singleTestPage.locator('data-testid=summary').type(' updated');
  await singleTestPage.locator('data-testid=description').click();
  await singleTestPage.locator('data-testid=description').type(' updated');
  await singleTestPage
    .locator('data-testid=step', { hasText: 'step one' })
    .click();
  await singleTestPage
    .locator('data-testid=step', { hasText: 'step one' })
    .type(' updated');
    
  singleTestPage.on('request', (request) => {
    expect(request.postDataJSON().update).toEqual({
      description: 'first test description updated',
      steps: [
        { id: 1, name: 'step one updated' },
        { id: 2, name: 'step two' },
      ],
      summary: 'first test updated',
      tags: ['one', 'test'],
    });
  });
  await singleTestPage.locator('data-testid=save').click();
});

test('add new step', async({ singleTestPage }) => {
  await singleTestPage.locator('data-testid=test-case', { hasText: 'first test' }).click();
  await singleTestPage.locator('data-testid=step-new').click();
  await singleTestPage.locator('data-testid=step-new').type('new step');
  await singleTestPage.locator('data-testid=step-new').press('Enter');

  await expect(singleTestPage.locator('data-testid=step', { hasText: 'new step' })).toBeVisible();
  await expect(singleTestPage.locator('data-testid=step-new')).toHaveValue('');
});

test('add new tag', async({ singleTestPage }) => {
  await singleTestPage.locator('data-testid=test-case', { hasText: 'first test' }).click();
  await singleTestPage.locator('data-testid=tag-new').click();
  await singleTestPage.locator('data-testid=tag-new').type('new tag');
  await singleTestPage.locator('data-testid=tag-new').press('Enter');

  await expect(singleTestPage.locator('data-testid=tag', { hasText: 'new tag' })).toBeVisible();
  await expect(singleTestPage.locator('data-testid=tag-new')).toHaveValue('');
});

test('do not add duplicate tag', async({ singleTestPage }) => {
  await singleTestPage.locator('data-testid=test-case', { hasText: 'first test' }).click();
  await expect(singleTestPage.locator('data-testid=tag')).toHaveCount(2);

  await singleTestPage.locator('data-testid=tag-new').click();
  await singleTestPage.locator('data-testid=tag-new').type('one');
  await singleTestPage.locator('data-testid=tag-new').press('Enter');

  await expect(singleTestPage.locator('data-testid=tag-new')).toHaveValue('');
  await expect(singleTestPage.locator('data-testid=tag')).toHaveCount(2);
});
