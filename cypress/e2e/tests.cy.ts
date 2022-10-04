it('mock single test case', () => {
  cy.mockGetTestCaseList('get/single-test-case');
  cy.visit('/');
  cy.wait('@getTestCases');

  cy.selectTestCase('first test');
  cy.getBySel('description').contains('first test description');
  cy.getBySel('step').first().contains('step one');
  cy.getBySel('step').contains('step two');
  cy.getBySel('tag').first().contains('one');
  cy.getBySel('tag').contains('test');
});

it('add new test case using Enter', () => {
  cy.mockGetTestCaseList('get/single-test-case');
  cy.mockAddTestCase('success');
  cy.visit('/');
  cy.wait('@getTestCases');

  cy.getBySel('test-case-input').last().click().type('test input{enter}');

  cy.selectTestCase('test input').should('exist');
  cy.getBySel('test-case-input').last().should('have.text', '');
});

it('add new test case using Save', () => {
  cy.mockGetTestCaseList('get/single-test-case');
  cy.mockAddTestCase('success');
  cy.visit('/');
  cy.wait('@getTestCases');

  cy.getBySel('test-case-input').last().click().type('test input');
  cy.getBySel('save').click();

  cy.selectTestCase('test input').should('exist');
  cy.getBySel('test-case-input').last().should('have.text', '');
});

it.only('edit and save description', () => {
  cy.mockGetTestCaseList('get/single-test-case');
  cy.mockUpdateTestCase('success');
  cy.visit('/');
  cy.wait('@getTestCases');

  cy.selectTestCase('first test');
  cy.getBySel('description').click().type(' is now updated');
  cy.getBySel('save').click();
  cy.wait('@updateTestCase')
    .its('request.body.update.description')
    .should('equal', 'first test description is now updated');
});
