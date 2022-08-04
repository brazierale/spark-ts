import Row from './Row';
import { TestCaseObject } from '../modules/TestCase';
import '../styles/TestCaseList.css';

interface TestCaseListProps {
  testCases: TestCaseObject[];
  selectedTestCase: TestCaseObject;
  setSelectedTestCaseByKey: (key: string) => void;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
}

const TestCaseList = ({ testCases, selectedTestCase, setSelectedTestCaseByKey, updateTestCaseByKey }: TestCaseListProps) => {
  
  const testCasesToRender = ( testCases: TestCaseObject[] ) => {    
    return (
      testCases.map((testCase) => 
        <Row key={testCase.key}
          testCase={testCase}
          selectedTestCase={selectedTestCase}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateTestCaseByKey={updateTestCaseByKey}
        />
      )
    );
  }

  return(
    <div data-testid="test-case-list">
      {testCasesToRender(testCases)}
    </div>
  );
}

export default TestCaseList;
