beforeEach('mock single test case', () => {
  cy.mockGetTestCaseList('get/single-test-case');
  cy.visit('/');
  cy.wait('@getTestCases');
});

it('display test case details', () => {
  cy.selectTestCase('first test');

  cy.getBySel('description').contains('first test description');
  cy.getBySel('step').first().contains('step one');
  cy.getBySel('step').contains('step two');
  cy.getBySel('tag').first().contains('one');
  cy.getBySel('tag').contains('test');
});

it('add new test case using Enter', () => {
  cy.mockAddTestCase('success');

  cy.getBySel('test-case-new').click().type('test input{enter}');

  cy.selectTestCase('test input').should('exist');
  cy.getBySel('test-case-new').should('have.text', '');
});

it('add new test case using Save', () => {
  cy.mockAddTestCase('success');

  cy.getBySel('test-case-new').click().type('test input');
  cy.getBySel('save').click();

  cy.selectTestCase('test input').should('exist');
  cy.getBySel('test-case-new').should('have.text', '');
});

it('edit and save test case', () => {
  cy.mockUpdateTestCase('success');

  cy.selectTestCase('first test');
  cy.getBySel('summary').click().type(' updated');
  cy.getBySel('description').click().type(' updated');
  cy.getBySel('step').first().click().type(' updated');
  cy.getBySel('save').click();

  cy.wait('@updateTestCase')
    .its('request.body.update')
    .should('deep.equal', {
      description: 'first test description updated',
      steps: [
        { id: 1, name: 'step one updated' },
        { id: 2, name: 'step two' },
      ],
      summary: 'first test updated',
      tags: ['one', 'test'],
    });
});

it('add new step', () => {
  cy.selectTestCase('first test');
  cy.getBySel('step-new').click().type('new step{enter}');

  cy.getBySelContaining('step', 'new step').should('exist');
  cy.getBySel('step-new').should('have.text', '');
});

it('add new tag', () => {
  cy.selectTestCase('first test');
  cy.getBySel('tag-new').click().type('new tag{enter}');

  cy.getBySelContaining('tag', 'new tag').should('exist');
  cy.getBySel('tag-new').should('have.text', '');
});

it('do not add duplicate tag', () => {
  cy.selectTestCase('first test');
  cy.getBySel('tag').its('length').should('eq', 2);
  cy.getBySel('tag-new').click().type('one{enter}');

  cy.getBySel('tag-new').should('have.text', '');
  cy.getBySel('tag').its('length').should('eq', 2);
});
