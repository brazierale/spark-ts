it('mock single test case', () => {
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

  cy.delete('test-case', 'first test');
  cy.getBySelContaining('test-case', 'first test').should('not.exist');
  cy.getBySelContaining('test-case', 'second test to delete').should('exist');
});
