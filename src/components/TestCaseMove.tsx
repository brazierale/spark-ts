import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { TestCaseObject } from '../modules/TestCase';

type MoveTestCaseProps = {
  testCase: TestCaseObject
}

// icon to reorder test case, currently only visual
const TestCaseMove = ({ testCase }: MoveTestCaseProps) => {
  if (testCase.key !== 'blank' && testCase.disabled !== true) {
    return (
      <FontAwesomeIcon
        data-testid='move-row'
        className="Move-row"
        icon={faArrowsAlt}
        size="sm"
      />
    );
  }
  else {
    return null;
  }
};

export default TestCaseMove;
