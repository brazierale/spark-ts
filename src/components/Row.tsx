import React from "react";
import { TestCaseObject } from "../modules/TestCase";
import TestCaseInput from "./TestCaseInput";

interface RowProps {
  testCase: TestCaseObject,
  moveAboveSortId: (key: string) => void;
}

class Row extends React.Component<RowProps> {
  render() {
    return (
      <div className="Row">
        {this.props.testCase.summary}
        <div className="Test-case-container">
          <TestCaseInput testCase={this.props.testCase}/>
        </div>
      </div>
    )
  }
}

export default Row;
