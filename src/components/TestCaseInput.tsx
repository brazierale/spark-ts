import classNames from 'classnames';
import { useEffect, useRef } from 'react';
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
}

const TestCaseInput = ({
  testCase,
  updateTestCaseByKey,
  addTestCase,
  deleteTestCase,
  selectedTestCase,
  isSelected,
  setSelectedTestCaseByKey,
  updateSelectedTestCase,
}: TestCaseInputProps) => {
  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSelectedTestCase({
      ...selectedTestCase,
      summary: event.target.value,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendUpdate(selectedTestCase.summary);
    } else if (event.key === 'Tab') {
      sendUpdate(selectedTestCase.summary);
    }
  };

  const handleFocus = () => {
    if (selectedTestCase.key !== testCase.key) {
      setSelectedTestCaseByKey(testCase.key);
    }
  };

  const sendUpdate = (summary: string) => {
    // create new test case if this is the entryRow
    if (selectedTestCase.key === 'blank' && summary !== '') {
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
        summary: summary,
      });
    }
  };

  let classes = classNames({
    'Test-case': true,
    'Test-case-input': true,
    'Selected-input': isSelected,
  });
  // this ensures the field remains editable
  let summary = testCase.summary;
  if (isSelected) {
    summary = selectedTestCase.summary;
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isSelected && textareaRef.current !== null) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    } else if (textareaRef.current !== null) {
      textareaRef.current.style.height = '24px';
    }
  });

  return (
    <textarea
      data-testid='test-case-input'
      ref={textareaRef}
      wrap={'on'}
      rows={1}
      maxLength={255}
      placeholder='Enter your test case here...'
      className={classes}
      value={summary}
      onChange={handleUserInput}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={testCase.disabled}
    />
  );
};

export default TestCaseInput;
