import React from 'react';
import Row from './Row';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import '../styles/TestCaseList.css';

interface TestCaseListProps {
  testCases: TestCaseObject[];
  nextSortId: () => number;
}

class TestCaseList extends React.Component<TestCaseListProps> {
  render() {
    return(
      <div data-testid="test-case-list">
        {this.testCasesToRender(this.props.testCases)}
      </div>
    );
  }

  testCasesToRender = ( testCases: TestCaseObject[] ) => {
    testCases.sort((a, b) => this.sortBySortId(a, b));
    
    return (
      testCases.map((testCase) => 
        <Row key={testCase.key}
          testCase={testCase}
          nextSortId={this.props.nextSortId}
          moveAboveSortId={ (key: string ) => this.moveAboveSortId(key)}
        />
      )
    );
  }
    
  sortBySortId = ( a: TestCaseObject, b: TestCaseObject ) => {
    if (a.sortId < b.sortId) {
      return -1;
    }
    if (a.sortId > b.sortId) {
      return 1;
    }
    else {
      return 0;
    }
  }
    
  moveAboveSortId = ( key: string ) => {
    // get the numbers either side of the new position and pick a sortId between them
    let thisIndex = this.props.testCases.findIndex( tc => {return tc.key === key;});
    let toMoveAbove = this.props.testCases[thisIndex];
    let toMoveBelow = this.props.testCases[thisIndex-1];

    if (!toMoveBelow) { toMoveBelow = blankTestCase(); }
        
    return ( toMoveAbove.sortId + toMoveBelow.sortId) / 2;
  }
}

export default TestCaseList;
