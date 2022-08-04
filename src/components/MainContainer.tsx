import { useRecoilState, useRecoilValue } from 'recoil';
import TestCaseList from './TestCaseList';
import DetailPane from './DetailPane';
import testCaseListState from '../atoms/TestCaseListState';
import selectedTestCaseState from '../atoms/SelectedTestCaseState';
import { TestCaseObject } from '../modules/TestCase';

const MainContainer = () => {

  const [testCaseList, setTestCaseListState] = useRecoilState(testCaseListState);
  const selectedTestCase = useRecoilValue(selectedTestCaseState);

  const updateTestCaseByKey = (testCase: TestCaseObject) => {
    let newArray = testCaseList;
    let index = newArray.findIndex( tc => {return tc.key === testCase.key});

    newArray[index] = testCase;

    setTestCaseListState(newArray);
  }
  
  return(
    <div className="Main-container">
      <div className="Test-case-list-container">
        <TestCaseList
          testCases={testCaseList}
          selectedTestCase={selectedTestCase}
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
