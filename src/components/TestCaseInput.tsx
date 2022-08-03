import { Component } from 'react';
import classNames from 'classnames';
import { TestCaseObject } from '../modules/TestCase';

interface TestCaseInputProps {
  testCase: TestCaseObject;
};

class TestCaseInput extends Component<TestCaseInputProps> {
  render() {
    let classes = classNames({
      'Test-case': true,
      'Test-case-input': true,
    });

    return (
      <textarea
        data-testid="test-case-input"
        rows={1}
        wrap="off"
        maxLength={255}
        placeholder="Enter your test case here..."
        className={classes}
        value={this.props.testCase.summary}
        onChange={this.handleUserInput}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        disabled={this.props.testCase.disabled}
      />
    );
  }

  handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`update summary for "${this.props.testCase.summary}"`);
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      console.log(`apply change for "${this.props.testCase.summary}"`);
    }
  }
    
  handleFocus = () => {
    console.log(`"${this.props.testCase.summary}" selected`);
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
