import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { TestCaseObject } from '../modules/TestCase';

type MoveTestCaseProps = {
  testCase: TestCaseObject;
  setDragEnabled: (isDragEnabled: boolean) => void;
};

// icon to reorder test case, currently only visual
const TestCaseMove = ({ testCase, setDragEnabled }: MoveTestCaseProps) => {
  if (testCase.key !== 'blank' && testCase.disabled !== true) {
    return (
      <FontAwesomeIcon
        data-testid='move-row'
        className='Move-row'
        icon={faArrowsAlt}
        size='sm'
        onMouseDown={() => enableMove(setDragEnabled)}
        onMouseLeave={() => disableMove(setDragEnabled)}
      />
    );
  } else {
    return null;
  }
};

const enableMove = (setDragEnabled: (isDragEnabled: boolean) => void) => {
  setDragEnabled(true);
};

const disableMove = (setDragEnabled: (isDragEnabled: boolean) => void) => {
  setDragEnabled(false);
};

export default TestCaseMove;
