import { useRecoilState } from 'recoil';
import TestCaseList from './TestCaseList';
import axios from 'axios';
import DetailPane from './DetailPane';
import testCaseListState from '../atoms/TestCaseListState';
import selectedTestCaseState from '../atoms/SelectedTestCaseState';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';
import { saving, loading } from '../atoms/MainState';
import Indicator from './Indicator';
import { apiUrl } from '../config';

const MainContainer = () => {

  const [testCaseList, setTestCaseListState] = useRecoilState(testCaseListState);
  const [selectedTestCase, setSelectedTestCase] = useRecoilState(selectedTestCaseState);
  const [isSaving, setIsSaving] = useRecoilState(saving);
  const [isLoading] = useRecoilState(loading);

  const updateTestCaseByKey = (testCase: TestCaseObject) => {
    let index = testCaseList.findIndex( tc => {return tc.key === testCase.key});

    updateTestCaseByKeyApi(testCase);
    setTestCaseListState([...testCaseList.slice(0, index), testCase, ...testCaseList.slice(index+1)]);
  }

  const updateTestCaseByKeyApi = async (testCase: TestCaseObject) => {
    setIsSaving(true);
    await axios.put(`${apiUrl}/api/testCases/${testCase.key}`, {
      update: {
        summary: testCase.summary,
        description: testCase.description,
        steps: testCase.steps,
        tags: testCase.tags
      }
    })
    setIsSaving(false);
  }

  const addTestCase = (testCase: TestCaseObject) => {
    let newTestCase = {
      ...testCase,
      key: generateKey()
    }
    let index = testCaseList.findIndex( tc => {return tc.key === testCase.key});

    addTestCaseApi(newTestCase);
    setTestCaseListState([...testCaseList.slice(0, index), newTestCase, ...testCaseList.slice(index+1), blankTestCase()]);
    setSelectedTestCaseByKey('blank');
  }

  const addTestCaseApi = async (testCase: TestCaseObject) => {
    setIsSaving(true);
    await axios.post(`${apiUrl}/api/testCases`, {
      key: testCase.key,
      summary: testCase.summary,
      description: testCase.description,
      steps: testCase.steps,
      tags: testCase.tags
    })
    setIsSaving(false);
  }

  const deleteTestCaseByKey = (key: string) => {
    let index = testCaseList.findIndex( tc => {return tc.key === key});
    let listWithRemovedTestCase = [...testCaseList.slice(0, index), ...testCaseList.slice(index+1)];
    
    replaceTestCaseListApi(listWithRemovedTestCase);
    setTestCaseListState(listWithRemovedTestCase);
    setSelectedTestCase(testCaseList[index+1]);
  }

  const replaceTestCaseListApi = async (newTestCaseList: TestCaseObject[]) => {
    // remove the blank test case first
    let listWithBlankAlsoRemoved = [...newTestCaseList.slice(0, newTestCaseList.length-1)];
    setIsSaving(true);
    await axios.post(`${apiUrl}/api/newTestCaseList`, listWithBlankAlsoRemoved);
    setIsSaving(false);
  }

  const setSelectedTestCaseByKey = (key: string) => {
    let index = testCaseList.findIndex( tc => {return tc.key === key});

    setSelectedTestCase(testCaseList[index]);
  }

  const updateSelectedTestCase = (testCase: TestCaseObject) => {
    setSelectedTestCase(testCase);
  }
  
  return(
    <div className="Main-container">
      <Indicator
          loading={isLoading}
          saving={isSaving}
        />
      <div className="Test-case-list-container">
        <TestCaseList
          testCaseList={testCaseList}
          updateTestCaseByKey={updateTestCaseByKey}
          addTestCase={addTestCase}
          deleteTestCaseByKey={deleteTestCaseByKey}
          selectedTestCase={selectedTestCase}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateSelectedTestCase={updateSelectedTestCase}
          setTestListCaseState={setTestCaseListState}
          replaceTestCaseListApi={replaceTestCaseListApi}
        />
      </div>
      <div className="Detail-pane-container">
      <DetailPane
        selectedTestCase={selectedTestCase}
        updateSelectedTestCase={updateSelectedTestCase}
        updateTestCaseByKey={updateTestCaseByKey}
      />
      </div>
    </div>
  );
}

export default MainContainer;
