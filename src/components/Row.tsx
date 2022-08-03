import React from "react";
import { TestCaseObject } from "../modules/TestCase";

interface RowProps {
  testCase: TestCaseObject,
  moveAboveSortId: (key: string) => void;
  nextSortId: () => number;
}

class Row extends React.Component<RowProps> {
  render() {
    return (
      <div className="Row">
        {this.props.testCase.summary}
      </div>
    )
  }
}

export default Row;
