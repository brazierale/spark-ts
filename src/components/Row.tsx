import classNames from "classnames";
import { TestCaseObject } from "../modules/TestCase";
import TestCaseInput from "./TestCaseInput";

type RowProps = {
  testCase: TestCaseObject;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
  addTestCase: (testCase: TestCaseObject) => void;
  deleteTestCaseByKey: (key: string) => void;
  selectedTestCase: TestCaseObject;
  setSelectedTestCaseByKey: (key: string) => void;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
}

const Row = ({ testCase, updateTestCaseByKey, addTestCase, deleteTestCaseByKey, selectedTestCase, setSelectedTestCaseByKey, updateSelectedTestCase }: RowProps) => {
  
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
          updateTestCaseByKey={updateTestCaseByKey}
          addTestCase={addTestCase}
          deleteTestCase={deleteTestCaseByKey}
          selectedTestCase={selectedTestCase}
          isSelected={isSelected()}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateSelectedTestCase={updateSelectedTestCase}
        />
      </div>
    </div>
  )
}

export default Row;
