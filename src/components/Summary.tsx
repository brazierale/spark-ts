import React, { useEffect, useRef } from 'react';
import { TestCaseObject } from '../modules/TestCase';

type SummaryProps = {
  description: string;
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
};

const Summary = ({
  description,
  selectedTestCase,
  updateSelectedTestCase,
}: SummaryProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  });

  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSelectedTestCase({
      ...selectedTestCase,
      summary: event.target.value,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className='Summary-container'>
      <textarea
        data-testid='summary'
        className='Summary'
        ref={textareaRef}
        rows={1}
        maxLength={255}
        value={description}
        onChange={handleUserInput}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Summary;
