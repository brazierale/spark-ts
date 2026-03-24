import { useRecoilState } from 'recoil';
import TestCaseList from './TestCaseList';
import DetailPane from './DetailPane';
import testCaseListState from '../atoms/TestCaseListState';
import selectedTestCaseState from '../atoms/SelectedTestCaseState';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';
import {
  updateTestCase,
  deleteTestCase as storageDelete,
  saveTestCases,
} from '../services/storage';

const MainContainer = () => {
  const [testCaseList, setTestCaseListState] = useRecoilState(testCaseListState);
  const [selectedTestCase, setSelectedTestCase] = useRecoilState(selectedTestCaseState);

  const updateTestCaseByKey = (testCase: TestCaseObject) => {
    const updated = updateTestCase(testCaseList, testCase);
    setTestCaseListState(updated);
  };

  const addTestCase = (testCase: TestCaseObject) => {
    const newTestCase = { ...testCase, key: generateKey() };
    const withoutBlank = testCaseList.filter((tc) => tc.key !== 'blank');
    const inserted = [...withoutBlank, newTestCase, blankTestCase()];
    saveTestCases(inserted);
    setTestCaseListState(inserted);
    setSelectedTestCase(blankTestCase());
  };

  const deleteTestCaseByKey = (key: string) => {
    const index = testCaseList.findIndex((tc) => tc.key === key);
    const updated = storageDelete(testCaseList, key);
    const withBlank = [...updated, blankTestCase()];
    setTestCaseListState(withBlank);
    // select next item or blank
    const next = testCaseList[index + 1] ?? blankTestCase();
    setSelectedTestCase(next);
  };

  const setSelectedTestCaseByKey = (key: string) => {
    const found = testCaseList.find((tc) => tc.key === key);
    if (found) setSelectedTestCase(found);
  };

  const updateSelectedTestCase = (testCase: TestCaseObject) => {
    setSelectedTestCase(testCase);
  };

  const replaceTestCaseList = (newList: TestCaseObject[]) => {
    saveTestCases(newList);
    setTestCaseListState(newList);
  };

  return (
    <div className='Main-container'>
      <div className='Pane-row'>
        <div className='Test-case-list-container'>
          <TestCaseList
            testCaseList={testCaseList}
            updateTestCaseByKey={updateTestCaseByKey}
            addTestCase={addTestCase}
            deleteTestCaseByKey={deleteTestCaseByKey}
            selectedTestCase={selectedTestCase}
            setSelectedTestCaseByKey={setSelectedTestCaseByKey}
            updateSelectedTestCase={updateSelectedTestCase}
            setTestListCaseState={setTestCaseListState}
            replaceTestCaseListApi={replaceTestCaseList}
          />
        </div>
        <div className='Detail-pane-container'>
          <DetailPane
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
            updateTestCaseByKey={updateTestCaseByKey}
            addTestCase={addTestCase}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
