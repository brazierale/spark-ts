import React, { useState } from 'react';
import Step from './Step';
import { StepObject, TestCaseObject } from '../modules/TestCase';
import '../styles/Step.css';

type StepListProps = {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
}

// list of steps to run a test case
const StepList = ({ selectedTestCase, updateSelectedTestCase}: StepListProps ) => {
  const [stepEntry, setStepEntry] = useState('')

  const addStep = (step: string) => {
    let newStep = new StepObject(
      selectedTestCase.steps.length, // TOFIX - will break when deleting steps
      step
    );
    let newStepList = [...selectedTestCase.steps, newStep]

    updateSelectedTestCase({
      ...selectedTestCase,
      steps: newStepList
    });
  }

  const deleteStep = (id: number) => { 
    let index = selectedTestCase.steps.findIndex( s => {return s.id === id});
    let newStepList = [...selectedTestCase.steps.slice(0, index), ...selectedTestCase.steps.slice(index+1)];

    updateSelectedTestCase({
      ...selectedTestCase,
      steps: newStepList
    })
  }

  const updateStep = (id: number, newName: string) => {
    let newStep = new StepObject(
      id,
      newName
    )    
    let index = selectedTestCase.steps.findIndex( s => {return s.id === id});
    let newStepList = [...selectedTestCase.steps.slice(0, index), newStep, ...selectedTestCase.steps.slice(index+1)];

    updateSelectedTestCase({
      ...selectedTestCase,
      steps: newStepList
    })
  }

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepEntry(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (stepEntry !== '') {
        event.preventDefault();
        addStep(stepEntry);
        setStepEntry('');
      }
    }
  }

  const handleBlur = () => {
    if (stepEntry !== '') {
      addStep(stepEntry);
    }
    setStepEntry('');
  }

  const stepsToRender = selectedTestCase.steps.map( step => 
    <Step
      key={step.id}
      step={step}
      deleteStep={deleteStep}
      updateStep={updateStep}
      disabled={selectedTestCase.disabled}
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
          value={stepEntry}
          onChange={handleUserInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={selectedTestCase.disabled}
        />
      </span>
    </div>
  );
}

export default StepList;
