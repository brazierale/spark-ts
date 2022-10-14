import { test, expect } from '@playwright/test';
import { TestCasePage } from './test-case-page';

test('display test case details', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadSingleTestCase()
  await testCasePage.selectTestCase('first test');
  await expect(
    page.locator('data-testid=description-input')
  ).toHaveValue('first test description');
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

test('add new test case using Enter', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadSingleTestCase()
  await testCasePage.mockTestCaseUpdate('success');

  await testCasePage.addTestCase('test input');

  await expect(page.locator('data-testid=test-case-new')).toHaveValue('');
  await expect(
    page.locator('data-testid=test-case', { hasText: 'test input' })
  ).toBeVisible();
});

test('add new test case using Save', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadSingleTestCase()
  await testCasePage.mockTestCaseUpdate('success');

  await page.locator('data-testid=test-case-new').click();
  await page.locator('data-testid=test-case-new').type('test input');
  await page.locator('data-testid=save').click();

  await expect(page.locator('data-testid=test-case-new')).toHaveValue(
    ''
  );
  await expect(
    page.locator('data-testid=test-case', { hasText: 'test input' })
  ).toBeVisible();
});

test('edit and save test case', async ({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadSingleTestCase()
  await testCasePage.mockTestCaseUpdate('success.json');
  await testCasePage.selectTestCase('first test');

  
  await page.locator('data-testid=summary').click();
  await page.locator('data-testid=summary').type(' updated');
  await page.locator('data-testid=description-input').click();
  await page.locator('data-testid=description-input').type(' updated');
  await page.locator('data-testid=step-input', { hasText: 'step one' }).click();
  await page.locator('data-testid=step-input', { hasText: 'step one' }).type(' updated');
    
  page.on('request', (request) => {
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
  await page.locator('data-testid=save').click();
});

test('add new step', async({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadSingleTestCase()
  await testCasePage.selectTestCase('first test');
  await testCasePage.addStep('new step');

  await expect(page.locator('data-testid=step', { hasText: 'new step' })).toBeVisible();
  await expect(page.locator('data-testid=step-new')).toHaveValue('');
});

test('add new tag', async({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadSingleTestCase()
  await testCasePage.selectTestCase('first test');
  await testCasePage.addTag('new tag');

  await expect(page.locator('data-testid=tag', { hasText: 'new tag' })).toBeVisible();
  await expect(page.locator('data-testid=tag-new')).toHaveValue('');
});

test('do not add duplicate tag', async({ page }) => {
  const testCasePage = new TestCasePage(page);
  await testCasePage.loadSingleTestCase()
  await testCasePage.selectTestCase('first test');
  await expect(page.locator('data-testid=tag')).toHaveCount(2);

  await testCasePage.addTag('one');

  await expect(page.locator('data-testid=tag-new')).toHaveValue('');
  await expect(page.locator('data-testid=tag')).toHaveCount(2);
});
