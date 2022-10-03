it('delete using delete button', () => {
  cy.mockGetTestCaseList('get/delete-test-case');
  cy.mockDeleteTestCase('delete/success');
  cy.visit('/');
  cy.wait('@getTestCases');
  cy.selectTestCase('second test to delete');

  cy.delete('step', 'step one to delete');
  cy.getBySelContaining('step', 'step one to delete').should('not.exist');
  cy.getBySelContaining('step', 'step two to delete').should('exist');

  cy.delete('tag', 'one-delete');
  cy.getBySelContaining('tag', 'one-delete').should('not.exist');
  cy.getBySelContaining('tag', 'test-delete').should('exist');

  cy.delete('test-case', 'second test to delete');
  cy.getBySelContaining('test-case', 'first test').should('exist');
  cy.getBySelContaining('test-case', 'second test to delete').should(
    'not.exist'
  );
});

it('delete by clearing summary field', () => {
  cy.mockGetTestCaseList('get/delete-test-case');
  cy.mockDeleteTestCase('delete/success');
  cy.visit('/');
  cy.wait('@getTestCases');
  cy.selectTestCase('second test to delete').clear().type('{enter}');

  cy.getBySelContaining('test-case', '').its('length').should('eq', 2);
  cy.getBySelContaining('test-case', 'first test').should('exist');
  cy.getBySelContaining('test-case', 'second test to delete').should(
    'not.exist'
  );
});
