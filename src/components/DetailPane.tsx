import '../styles/DetailPane.css';
import Description from './Description';
import StepList from './StepList';
import TagList from './TagList';
import { TestCaseObject } from '../modules/TestCase';
import Summary from './Summary';

type DetailPaneProps = {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
  updateTestCaseByKey: (testCase: TestCaseObject) => void;
  addTestCase: (testCase: TestCaseObject) => void;
};

const DetailPane = ({
  selectedTestCase,
  updateSelectedTestCase,
  updateTestCaseByKey,
  addTestCase,
}: DetailPaneProps) => {
  const save = (testCase: TestCaseObject) => {
    if (testCase.key !== 'blank') {
      updateTestCaseByKey(testCase);
    } else if (testCase.key === 'blank' && testCase.summary !== '') {
      addTestCase(testCase);
    }
  };

  if (selectedTestCase) {
    return (
      <div className='Detail-pane'>
        <div className='Debug-key'>{selectedTestCase.key}</div>
        <div className='Detail-pane-header'>
          <Summary
            description={selectedTestCase.summary}
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
          />
        </div>
        <div className='Detail-pane-body'>
          <Description
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
          />
          <StepList
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
          />
          <TagList
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
          />
        </div>
        <div className='Detail-pane-footer'>
          <button
            data-testid='Save'
            className='Save-details'
            disabled={selectedTestCase.disabled}
            onClick={() => save(selectedTestCase)}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DetailPane;
