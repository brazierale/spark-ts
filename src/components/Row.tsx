import classNames from "classnames";
import { TestCaseObject } from "../modules/TestCase";
import TestCaseDelete from "./TestCaseDelete";
import TestCaseInput from "./TestCaseInput";
import TestCaseMove from "./TestCaseMove";

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
      <div >
        <TestCaseMove
          testCase={testCase}
          
        />
      </div>
      <TestCaseDelete
        testCase={testCase}
        deleteTestCaseByKey={deleteTestCaseByKey}
      />
    </div>
  )
}

export default Row;
