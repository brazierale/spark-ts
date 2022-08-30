import { useRecoilState } from 'recoil';
import Row from './Row';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import '../styles/TestCaseList.css';
import { dragEnabled } from '../atoms/MainState';

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
  
  const [isDragEnabled, setDragEnabledState] = useRecoilState(dragEnabled);

  const setDragEnabled = (isEnabled: boolean) => {
    setDragEnabledState(isEnabled);
  }

  const moveAboveSortId = ( key: string ) => {
    // get the numbers either side of the new position and pick a sortId between them
    let thisIndex = testCaseList.findIndex( tc => {return tc.key === key;});
    let toMoveAbove = testCaseList[thisIndex];
    let toMoveBelow = testCaseList[thisIndex-1];

    if (!toMoveBelow) { toMoveBelow = blankTestCase(); }
        
    return ( toMoveAbove.sortId + toMoveBelow.sortId) / 2;
  }

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
          moveAboveSortId={moveAboveSortId}
          dragEnabled={isDragEnabled}
          setDragEnabled={setDragEnabled}
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
