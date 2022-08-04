import React, { Component } from 'react';
import Step from './Step';
import { StepObject, TestCaseObject } from '../modules/TestCase';
import '../styles/Step.css';

interface StepListProps {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
}

// list of steps to run a test case
class StepList extends Component<StepListProps> {
  state = {
    newStep: ''
  }

  addStep = (step: string) => {
    let newStep = new StepObject(
      this.props.selectedTestCase.steps.length, // TOFIX - will break when deleting steps
      step
    );
    let newStepList = [...this.props.selectedTestCase.steps, newStep]

    this.props.updateSelectedTestCase({
      ...this.props.selectedTestCase,
      steps: newStepList
    });
  }

  deleteStep = (id: number) => { 
    let index = this.props.selectedTestCase.steps.findIndex( s => {return s.id === id});
    let newStepList = [...this.props.selectedTestCase.steps.slice(0, index), ...this.props.selectedTestCase.steps.slice(index+1)];

    this.props.updateSelectedTestCase({
      ...this.props.selectedTestCase,
      steps: newStepList
    })
  }

  updateStep = (id: number, newName: string) => {
    let newStep = new StepObject(
      id,
      newName
    )    
    let index = this.props.selectedTestCase.steps.findIndex( s => {return s.id === id});
    let newStepList = [...this.props.selectedTestCase.steps.slice(0, index), newStep, ...this.props.selectedTestCase.steps.slice(index+1)];

    this.props.updateSelectedTestCase({
      ...this.props.selectedTestCase,
      steps: newStepList
    })
  }

  handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newStep: event.target.value });
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (this.state.newStep !== '') {
        event.preventDefault();
        this.addStep(this.state.newStep);
        this.setState({ newStep: '' });
      }
    }
  }

  handleBlur = () => {
    if (this.state.newStep !== '') {
      this.addStep(this.state.newStep);
    }
    this.setState({ newStep: '' });
  }

  render() {
    const stepsToRender = this.props.selectedTestCase.steps.map( step => 
      <Step
        key={step.id}
        step={step}
        deleteStep={this.deleteStep}
        updateStep={this.updateStep}
        disabled={this.props.selectedTestCase.disabled}
      />
    );

    return(
      <div data-testid="step-list" className="Step-list-container">
        <span className="Label">Steps</span>
        <span className="Step-list">
          {stepsToRender}
          <input
            data-testid="step-new"
            className="Step-input"
            placeholder="Enter new step..."
            value={this.state.newStep}
            onChange={this.handleUserInput}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            disabled={this.props.selectedTestCase.disabled}
          />
        </span>
      </div>
    );
  }
}

export default StepList;
