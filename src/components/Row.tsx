import classNames from "classnames";
import { Component } from "react";
import { TestCaseObject } from "../modules/TestCase";
import TestCaseInput from "./TestCaseInput";

interface RowProps {
  testCase: TestCaseObject;
  selectedTestCase: TestCaseObject;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
}

class Row extends Component<RowProps> {
  render() {
    let classes = classNames({
      'Row': true,
      'Selected-row': this.isSelected(),
      'Test-case-disabled': this.props.testCase.disabled,
    });

    return (
      <div className={classes}>
        <div className="Test-case-container">
          <TestCaseInput
            testCase={this.props.testCase}
            selectedTestCase={this.props.selectedTestCase}
            isSelected={this.isSelected()}
            updateTestCaseByKey={this.props.updateTestCaseByKey}
          />
        </div>
      </div>
    )
  }

  isSelected = () => {
    return this.props.testCase.key === this.props.selectedTestCase.key;
  }
}

export default Row;
