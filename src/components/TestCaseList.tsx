import { Component } from 'react';
import Row from './Row';
import { TestCaseObject } from '../modules/TestCase';
import '../styles/TestCaseList.css';

interface TestCaseListProps {
  testCases: TestCaseObject[];
  selectedTestCase: TestCaseObject;
}

class TestCaseList extends Component<TestCaseListProps> {
  render() {
    return(
      <div data-testid="test-case-list">
        {this.testCasesToRender(this.props.testCases)}
      </div>
    );
  }

  testCasesToRender = ( testCases: TestCaseObject[] ) => {    
    return (
      testCases.map((testCase) => 
        <Row key={testCase.key}
          testCase={testCase}
          selectedTestCase={this.props.selectedTestCase}
        />
      )
    );
  }
}

export default TestCaseList;
