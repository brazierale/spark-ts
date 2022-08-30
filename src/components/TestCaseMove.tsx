import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { TestCaseObject } from '../modules/TestCase';

type MoveTestCaseProps = {
  testCase: TestCaseObject
  setDragEnabledStatus: (status: boolean) => void;
}

// icon to reorder test case, currently only visual
const TestCaseMove = ({ testCase, setDragEnabledStatus }: MoveTestCaseProps) => {
  if (testCase.key !== 'blank' && testCase.disabled !== true) {
    return (
      <FontAwesomeIcon
        data-testid='move-row'
        className="Move-row"
        icon={faArrowsAlt}
        size="sm"
        onMouseDown={() => enableMove(setDragEnabledStatus)}
        onMouseLeave={() => disableMove(setDragEnabledStatus)}
      />
    );
  }
  else {
    return null;
  }
};

const enableMove = (setDragEnabledStatus: (status: boolean) => void)  => {
  setDragEnabledStatus(true);
};

const disableMove = (setDragEnabledStatus: (status: boolean) => void) => {
  setDragEnabledStatus(false);
};

export default TestCaseMove;
