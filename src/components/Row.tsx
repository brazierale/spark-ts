import { Component } from "react";
import { TestCaseObject } from "../modules/TestCase";
import TestCaseInput from "./TestCaseInput";

interface RowProps {
  testCase: TestCaseObject,
}

class Row extends Component<RowProps> {
  render() {
    return (
      <div className="Row">
        <div className="Test-case-container">
          <TestCaseInput testCase={this.props.testCase}/>
        </div>
      </div>
    )
  }
}

export default Row;
