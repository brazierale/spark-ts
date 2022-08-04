import { Component } from 'react';
import classNames from 'classnames';
import { TestCaseObject } from '../modules/TestCase';

interface TestCaseInputProps {
  testCase: TestCaseObject;
  selectedTestCase: TestCaseObject;
  isSelected: Boolean;
  setSelectedTestCaseByKey: (key: string) => void;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
};

class TestCaseInput extends Component<TestCaseInputProps> {
  render() {
    let classes = classNames({
      'Test-case': true,
      'Test-case-input': true,
      'Selected-input': this.props.isSelected
    });

    // this ensures the field remains editable and is not overwritten by the saved state
    let summary = this.props.testCase.summary;
    if (this.props.isSelected) {
      summary = this.props.selectedTestCase.summary;
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
        onChange={this.handleUserInput}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        disabled={this.props.testCase.disabled}
      />
    );
  }

  updateTestCaseSummary = (newSummary: string) => {
    let updatedTestCase = new TestCaseObject(
      this.props.testCase.key,
      this.props.testCase.sortId,
      newSummary,
      this.props.testCase.description,
      this.props.testCase.steps,
      this.props.testCase.tags,
    )
    return updatedTestCase;
  }

  handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event);
    this.updateTestCaseSummary(event.target.value);
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      console.log(`apply change for "${this.props.testCase.summary}"`);
    }
  }
    
  handleFocus = () => {
    console.log(`"${this.props.testCase.summary}" selected`);
    if (this.props.selectedTestCase.key !== this.props.testCase.key) {
      this.props.setSelectedTestCaseByKey(this.props.testCase.key);
    }
  }

  sendUpdate = ( summary: string ) => {
    // create new test case if this is the entryRow
    if(this.props.testCase.key === 'blank' && summary !== '') {
      
    }
    // delete the test case if it is empty
    else if (summary === '' && this.props.testCase.key !== 'blank') {
      
    }
    // otherwise, update the test case
    else if (this.props.testCase.key !== 'blank') {
      
    }
  }
}

export default TestCaseInput;
