import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TestCaseObject } from '../modules/TestCase';

type DeleteTestCaseProps = {
  testCase: TestCaseObject
  deleteTestCaseByKey: (key: string) => void;
}

// x button to delete a test case
const TestCaseDelete = ({ testCase, deleteTestCaseByKey }: DeleteTestCaseProps ) => {
  if (testCase.key !== 'blank' && testCase.disabled !== true) {
    return (
      <FontAwesomeIcon
        data-testid='test-case-delete'
        className="Delete-row"
        icon={faTimes}
        onClick={() => deleteTestCaseByKey(testCase.key)}
      />
    );
  }
  else {
    return null;
  }
};

export default TestCaseDelete;
