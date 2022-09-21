import classNames from 'classnames';
import { TestCaseObject } from '../modules/TestCase';

interface TestCaseInputProps {
  testCase: TestCaseObject;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
  addTestCase: (testCase: TestCaseObject) => void;
  deleteTestCase: (key: string) => void;
  selectedTestCase: TestCaseObject;
  isSelected: Boolean;
  setSelectedTestCaseByKey: (key: string) => void;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
};

const TestCaseInput = ({ testCase, updateTestCaseByKey, addTestCase, deleteTestCase, selectedTestCase, isSelected, setSelectedTestCaseByKey, updateSelectedTestCase }: TestCaseInputProps ) => {

  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSelectedTestCase({
      ...selectedTestCase,
      summary: event.target.value
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      sendUpdate(selectedTestCase.summary);
    }
  }
    
  const handleFocus = () => {
    if (selectedTestCase.key !== testCase.key) {
      setSelectedTestCaseByKey(testCase.key);
    }
  }

  const sendUpdate = (summary: string) => {
    // create new test case if this is the entryRow
    if(selectedTestCase.key === 'blank' && summary !== '') {
      addTestCase(selectedTestCase);
    }
    // delete the test case if it is empty
    else if (summary === '' && selectedTestCase.key !== 'blank') {
      deleteTestCase(selectedTestCase.key);
    }
    // otherwise, update the test case
    else if (selectedTestCase.key !== 'blank') {
      updateTestCaseByKey({
        ...selectedTestCase,
        summary: summary
      })
    }
  }

  let classes = classNames({
    'Test-case': true,
    'Test-case-input': true,
    'Selected-input': isSelected
  });

  // this ensures the field remains editable
  let summary = testCase.summary;
  if (isSelected) {
    summary = selectedTestCase.summary;
  }

  return (
    <textarea
      data-testid="test-case-input"
      rows={1}
      wrap="off"
      maxLength={255}
      placeholder="Enter your test case here..."
      className={classes}
      value={summary}
      onChange={handleUserInput}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={testCase.disabled}
    />
  );
}

export default TestCaseInput;
