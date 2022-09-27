import React from "react";
import { TestCaseObject } from '../modules/TestCase';

type SummaryProps = {
  description: string;
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
}

const Summary = ({ description, selectedTestCase, updateSelectedTestCase }: SummaryProps ) => {

  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
    
    updateSelectedTestCase({
      ...selectedTestCase,
      summary: event.target.value
    })
  }

  return (
    <div className="Summary-container">
      <textarea
        data-testid="summary"
        className="Summary"
        rows={1}
        maxLength={255}
        value={description}
        onChange={handleUserInput}
      />
    </div>
  )
}

export default Summary;
