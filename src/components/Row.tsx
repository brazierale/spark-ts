import classNames from "classnames";
import { TestCaseObject } from "../modules/TestCase";
import TestCaseInput from "./TestCaseInput";

type RowProps = {
  testCase: TestCaseObject;
  selectedTestCase: TestCaseObject;
  setSelectedTestCaseByKey: (key: string) => void;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
}

const Row = ({ testCase, selectedTestCase, setSelectedTestCaseByKey, updateTestCaseByKey }: RowProps) => {
  
  const isSelected = () => {
    return testCase.key === selectedTestCase.key;
  }
  
  let classes = classNames({
    'Row': true,
    'Selected-row': isSelected(),
    'Test-case-disabled': testCase.disabled,
  });

  return (
    <div className={classes}>
      <div className="Test-case-container">
        <TestCaseInput
          testCase={testCase}
          selectedTestCase={selectedTestCase}
          isSelected={isSelected()}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateTestCaseByKey={updateTestCaseByKey}
        />
      </div>
    </div>
  )
}

export default Row;
