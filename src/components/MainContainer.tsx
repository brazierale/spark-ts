import { useRecoilValue } from 'recoil';
import TestCaseList from './TestCaseList';
import DetailPane from './DetailPane';
import testCaseListState from '../atoms/TestCaseListState';
import selectedTestCaseState from '../atoms/SelectedTestCaseState';

const MainContainer = () => {

  const testCaseList = useRecoilValue(testCaseListState);
  const selectedTestCase = useRecoilValue(selectedTestCaseState);
  
  return(
    <div className="Main-container">
      <div className="Test-case-list-container">
        <TestCaseList
          testCases={testCaseList}
          selectedTestCase={selectedTestCase}
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
