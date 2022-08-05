import { useRecoilState } from 'recoil';
import TestCaseList from './TestCaseList';
import DetailPane from './DetailPane';
import testCaseListState from '../atoms/TestCaseListState';
import selectedTestCaseState from '../atoms/SelectedTestCaseState';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import { generateKey, generateSortId } from '../modules/KeyGen';

const MainContainer = () => {

  const [testCaseList, setTestCaseListState] = useRecoilState(testCaseListState);
  const [selectedTestCase, setSelectedTestCase] = useRecoilState(selectedTestCaseState);

  const updateTestCaseByKey = (testCase: TestCaseObject) => {
    let index = testCaseList.findIndex( tc => {return tc.key === testCase.key});

    setTestCaseListState([...testCaseList.slice(0, index), testCase, ...testCaseList.slice(index+1)]);
  }

  const addTestCase = (testCase: TestCaseObject) => {
    let newTestCase = {
      ...testCase,
      key: generateKey(),
      sortId: nextSortId()
    }
    let index = testCaseList.findIndex( tc => {return tc.key === testCase.key});
    setTestCaseListState([...testCaseList.slice(0, index), newTestCase, ...testCaseList.slice(index+1), blankTestCase()]);

    setSelectedTestCaseByKey('blank');
  }

  const deleteTestCaseByKey = (key: string) => {
    let index = testCaseList.findIndex( tc => {return tc.key === key});
    let newTestCaseList = [...testCaseList.slice(0, index), ...testCaseList.slice(index+1)];

    setTestCaseListState(newTestCaseList);
    setSelectedTestCase(testCaseList[index+1]);
  }

  const setSelectedTestCaseByKey = (key: string) => {
    let index = testCaseList.findIndex( tc => {return tc.key === key});

    setSelectedTestCase(testCaseList[index]);
  }

  const updateSelectedTestCase = (testCase: TestCaseObject) => {
    setSelectedTestCase(testCase);
  }

  const nextSortId = () => {
    if (testCaseList[testCaseList.length-2]) {
      return generateSortId(
        testCaseList[testCaseList.length-2].sortId
      );
    }
    else {
      return generateSortId(0);
    }
  }
  
  return(
    <div className="Main-container">
      <div className="Test-case-list-container">
        <TestCaseList
          testCaseList={testCaseList}
          updateTestCaseByKey={updateTestCaseByKey}
          addTestCase={addTestCase}
          deleteTestCaseByKey={deleteTestCaseByKey}
          selectedTestCase={selectedTestCase}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateSelectedTestCase={updateSelectedTestCase}
        />
      </div>
      <div className="Detail-pane-container">
      <DetailPane
        selectedTestCase={selectedTestCase}
        updateSelectedTestCase={updateSelectedTestCase}
      />
      </div>
    </div>
  );
}

export default MainContainer;
