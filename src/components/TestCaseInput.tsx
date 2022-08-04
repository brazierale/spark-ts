import classNames from 'classnames';
import { TestCaseObject } from '../modules/TestCase';

interface TestCaseInputProps {
  testCase: TestCaseObject;
  selectedTestCase: TestCaseObject;
  isSelected: Boolean;
  setSelectedTestCaseByKey: (key: string) => void;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
};

const TestCaseInput = ({ testCase, selectedTestCase, isSelected, setSelectedTestCaseByKey, updateTestCaseByKey }: TestCaseInputProps) => {

  const updateTestCaseSummary = (newSummary: string) => {
    let updatedTestCase = new TestCaseObject(
      testCase.key,
      testCase.sortId,
      newSummary,
      testCase.description,
      testCase.steps,
      testCase.tags,
    )
    updateTestCaseByKey(updatedTestCase);
  }

  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateTestCaseSummary(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      console.log(`apply change for "${testCase.summary}"`);
    }
  }
    
  const handleFocus = () => {
    if (selectedTestCase.key !== testCase.key) {
      setSelectedTestCaseByKey(testCase.key);
    }
  }

  const sendUpdate = ( summary: string ) => {
    // create new test case if this is the entryRow
    if(testCase.key === 'blank' && summary !== '') {
      
    }
    // delete the test case if it is empty
    else if (summary === '' && testCase.key !== 'blank') {
      
    }
    // otherwise, update the test case
    else if (testCase.key !== 'blank') {
      
    }
  }

  let classes = classNames({
    'Test-case': true,
    'Test-case-input': true,
    'Selected-input': isSelected
  });

  return (
    <textarea
      data-testid="test-case-input"
      rows={1}
      wrap="off"
      maxLength={255}
      placeholder="Enter your test case here..."
      className={classes}
      value={testCase.summary}
      onChange={handleUserInput}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={testCase.disabled}
    />
  );
}

export default TestCaseInput;
