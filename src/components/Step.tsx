import React, { Component } from 'react';
import classNames from 'classnames';
import { StepObject } from '../modules/TestCase';

interface StepProps {
  disabled: boolean;
  step: StepObject;
  deleteStep: (id: number) => void;
  updateStep: (id: number, newName: string) => void;
}

// single step
class Step extends Component<StepProps> {
  render() {
    let stepClasses = classNames({
      'Step': true,
      'Disabled': this.props.disabled
    });

    return(
      <div className="Step-container" data-testid="step">
        <input
          data-testid="step-checkbox"
          className="Step-checkbox"
          type="checkbox"
          disabled={this.props.disabled}
        />
        <div className={stepClasses}>
          <textarea
            data-testid="step-input"
            className="Step-edit"
            rows={1}
            wrap="off"
            value={this.props.step.name}
            onChange={this.handleUserInput}
            disabled={this.props.disabled}
          />
          <span
            data-testid="step-delete"
            className="Delete-step"
            onClick={() => this.props.deleteStep(this.props.step.id)}
          >x</span>
        </div>
      </div>
    );
  }

  handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.updateStep(this.props.step.id, event.target.value);
  }
}

export default Step;
