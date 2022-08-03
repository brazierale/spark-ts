import { useRecoilValue } from 'recoil';
import TestCaseList from './TestCaseList';
import testCaseListState from '../atoms/TestCaseListState';

const MainContainer = () => {

  const testCaseList = useRecoilValue(testCaseListState);
  
  return(
    <div className="Main-container">
      <div className="Test-case-list-container">
        <TestCaseList
          testCases={testCaseList}
        />
      </div>
      <div className="Detail-pane-container">
        Detail pane goes here
      </div>
    </div>
  );
}

export default MainContainer;
