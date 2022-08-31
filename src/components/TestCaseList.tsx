import { useRecoilState } from 'recoil';
import Row from './Row';
import { TestCaseObject } from '../modules/TestCase';
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
  setTestListCaseState: (testCaseList: TestCaseObject[]) => void;
}

const TestCaseList = ({ testCaseList, updateTestCaseByKey, addTestCase, deleteTestCaseByKey, selectedTestCase, setSelectedTestCaseByKey, updateSelectedTestCase, setTestListCaseState }: TestCaseListProps) => {
  
  const [isDragEnabled, setDragEnabledState] = useRecoilState(dragEnabled);

  const setDragEnabled = (isEnabled: boolean) => {
    setDragEnabledState(isEnabled);
  }

  const moveTestCase = (testCaseToMove: TestCaseObject, newSortId: number) => {
    // remove the test case we've been given as it will move
    const listWithRemovedTestCase = [...testCaseList.slice(0, testCaseToMove.sortId), ...testCaseList.slice(testCaseToMove.sortId+1)];
    // place the test case into its new position
    const listWithNewPosition = [...listWithRemovedTestCase.slice(0, newSortId), testCaseToMove, ...listWithRemovedTestCase.slice(newSortId)];
    // update the sort ids to match their position, except the last test case (always blank)
    const newList = []
    for (let i=0; i < listWithNewPosition.length; i++) {
      if (listWithNewPosition[i].key === 'blank') {
        newList.push(listWithNewPosition[i]);
      }
      else {
        let updatedTestCase = { ...listWithNewPosition[i], sortId: i }
        newList.push(updatedTestCase)
      }
    }

    setTestListCaseState(newList);
  }

  const sortBySortId = ( a: TestCaseObject, b: TestCaseObject ) => {
    if (a.sortId < b.sortId) {
      return -1;
    }
    if (a.sortId > b.sortId) {
      return 1;
    }
    else {
      return 0;
    }
  }

  const testCasesToRender = ( testCaseList: TestCaseObject[] ) => {
    
    let sortedTestCaseList = [...testCaseList]
    sortedTestCaseList.sort((a, b) => sortBySortId(a, b));

    return (
      sortedTestCaseList.map((testCase) => 
        <Row key={testCase.key}
          testCase={testCase}
          updateTestCaseByKey={updateTestCaseByKey}
          addTestCase={addTestCase}
          deleteTestCaseByKey={deleteTestCaseByKey}
          selectedTestCase={selectedTestCase}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateSelectedTestCase={updateSelectedTestCase}
          moveTestCase={moveTestCase}
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
