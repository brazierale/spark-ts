import Row from './Row';
import { TestCaseObject } from '../modules/TestCase';
import '../styles/TestCaseList.css';

interface TestCaseListProps {
  testCaseList: TestCaseObject[];
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
  addTestCase: (testCase: TestCaseObject) => void;
  deleteTestCaseByKey: (key: string) => void;
  selectedTestCase: TestCaseObject;
  setSelectedTestCaseByKey: (key: string) => void;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
}

const TestCaseList = ({ testCaseList, updateTestCaseByKey, addTestCase, deleteTestCaseByKey, selectedTestCase, setSelectedTestCaseByKey, updateSelectedTestCase }: TestCaseListProps) => {
  
  const testCasesToRender = ( testCaseList: TestCaseObject[] ) => {
    return (
      testCaseList.map((testCase) => 
        <Row key={testCase.key}
          testCase={testCase}
          updateTestCaseByKey={updateTestCaseByKey}
          addTestCase={addTestCase}
          deleteTestCaseByKey={deleteTestCaseByKey}
          selectedTestCase={selectedTestCase}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateSelectedTestCase={updateSelectedTestCase}
        />
      )
    );
  }

  return(
    <div data-testid="test-case-list">
      {testCasesToRender(testCaseList)}
    </div>
  );
}

export default TestCaseList;
