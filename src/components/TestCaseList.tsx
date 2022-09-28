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
  replaceTestCaseListApi: (testCaseList: TestCaseObject[]) => void;
}

const TestCaseList = ({
  testCaseList,
  updateTestCaseByKey,
  addTestCase,
  deleteTestCaseByKey,
  selectedTestCase,
  setSelectedTestCaseByKey,
  updateSelectedTestCase,
  setTestListCaseState,
  replaceTestCaseListApi,
}: TestCaseListProps) => {
  const [isDragEnabled, setDragEnabledState] = useRecoilState(dragEnabled);

  const setDragEnabled = (isEnabled: boolean) => {
    setDragEnabledState(isEnabled);
  };

  const moveTestCase = (toMove: TestCaseObject, moveTo: TestCaseObject) => {
    let moveToIndex = testCaseList.findIndex((tc) => {
      return tc.key === moveTo.key;
    });
    let toMoveIndex = testCaseList.findIndex((tc) => {
      return tc.key === toMove.key;
    });

    // don't move if the dropTarget is the blank test case
    if (moveToIndex !== testCaseList.length) {
      const listWithRemovedTestCase = [
        ...testCaseList.slice(0, toMoveIndex),
        ...testCaseList.slice(toMoveIndex + 1),
      ];
      // if moving down the list, indicies will have changed
      if (moveToIndex > toMoveIndex) {
        moveToIndex--;
      }
      const listWithNewPosition = [
        ...listWithRemovedTestCase.slice(0, moveToIndex),
        toMove,
        ...listWithRemovedTestCase.slice(moveToIndex),
      ];

      replaceTestCaseListApi(listWithNewPosition);
      setTestListCaseState(listWithNewPosition);
    }
  };

  const testCasesToRender = (testCaseList: TestCaseObject[]) => {
    if (testCaseList.length === 0) {
      return (
        <div data-test-id='load-error' className='Load-error'>
          Failed to load. Is the API running?
          <button
            className='Load-error-button'
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    } else {
      return testCaseList.map((testCase) => (
        <Row
          key={testCase.key}
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
      ));
    }
  };

  return (
    <div data-testid='test-case-list'>{testCasesToRender(testCaseList)}</div>
  );
};

export default TestCaseList;
