import { useRecoilState } from 'recoil';
import TestCaseList from './TestCaseList';
import DetailPane from './DetailPane';
import testCaseListState from '../atoms/TestCaseListState';
import selectedTestCaseState from '../atoms/SelectedTestCaseState';
import { TestCaseObject } from '../modules/TestCase';

const MainContainer = () => {

  const [testCaseList, setTestCaseListState] = useRecoilState(testCaseListState);
  const [selectedTestCase, setSelectedTestCase] = useRecoilState(selectedTestCaseState);

  const updateTestCaseByKey = (testCase: TestCaseObject) => {
    let newArray = testCaseList;
    let index = newArray.findIndex( tc => {return tc.key === testCase.key});

    newArray[index] = testCase;

    setTestCaseListState(newArray);
  }

  const setSelectedTestCaseByKey = (key: string) => {
    let newArray = testCaseList;
    let index = newArray.findIndex( tc => {return tc.key === key});

    setSelectedTestCase(testCaseList[index]);
  }
  
  return(
    <div className="Main-container">
      <div className="Test-case-list-container">
        <TestCaseList
          testCases={testCaseList}
          selectedTestCase={selectedTestCase}
          setSelectedTestCaseByKey={setSelectedTestCaseByKey}
          updateTestCaseByKey={updateTestCaseByKey}
        />
      </div>
      <div className="Detail-pane-container">
      <DetailPane
        selectedTestCase={selectedTestCase}
      />
      </div>
    </div>
  );
}

export default MainContainer;
