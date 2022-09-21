/// <reference types="cypress" />

// Common
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelContaining', (selector, contains, ...args) => {
  // adds ':contains' to getting the element so the whole command is automatically retried
  return cy.get(`[data-testid=${selector}]:contains("${contains}")`, ...args);
});

// Delete
Cypress.Commands.add('delete', (detailItem, description) => {
  // find the delete button within the test case / step / tag and click it
  cy.getBySelContaining(`${detailItem}`, `${description}`).within(() => {
    cy.getBySel(`${detailItem}-delete`).click({force: true});
  });
});

// Test Case specific
Cypress.Commands.add('selectTestCase', (title) => {
  // force true as the list can be scrolled underneath the header of the page
  cy.getBySelContaining('test-case-input', title).click({force: true});
});

// API mocking
Cypress.Commands.add('mockGetTestCaseList', (fixture) => {
  cy.intercept('/api/testCases', { fixture: fixture }).as('getTestCases');
});

Cypress.Commands.add('mockDeleteTestCase', (fixture) => {
  cy.intercept('/api/testCases/*', { fixture: fixture }).as('deleteTestCase');
});
