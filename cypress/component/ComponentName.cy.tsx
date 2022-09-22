import React from 'react';
import DetailPane from '../../src/components/DetailPane';
import { TestCaseObject } from '../../src/modules/TestCase'

describe('ComponentName.cy.ts', () => {
  it('playground', () => {
    let testCase = new TestCaseObject(
      'test key',
      'test case',
      'test description',
      [],
      [],
    )

    cy.mount(<DetailPane
      selectedTestCase={testCase}
      updateSelectedTestCase={() => {}}
      updateTestCaseByKey={() => {}}
      />)
  })
})
