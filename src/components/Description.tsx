import React, { Component } from 'react';
import { TestCaseObject } from '../modules/TestCase';
import '../styles/Description.css';

interface DescriptionProps {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
}

// description field
class Description extends Component<DescriptionProps> {
  render() {
    return(
      <div 
        data-testid='description'
        className="Description-container"
      >
        <span className="Label">Description</span>
        <textarea
          className="Description-input"
          rows={4}
          placeholder="Enter new description..."
          value={this.props.selectedTestCase.description}
          onChange={this.handleUserInput}
          disabled={this.props.selectedTestCase.disabled}
        />
      </div>
    );
  }
  
  handleUserInput = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.updateSelectedTestCase({
      ...this.props.selectedTestCase,
      description:event.target.value
    })
  }
}

export default Description;
