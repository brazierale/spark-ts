import classNames from 'classnames';
import { StepObject } from '../modules/TestCase';

type StepProps = {
  disabled: boolean;
  step: StepObject;
  deleteStep: (id: number) => void;
  updateStep: (id: number, newName: string) => void;
}

// single step
const Step = ({ disabled, step, deleteStep, updateStep }: StepProps) => {
  
  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateStep(step.id, event.target.value);
  }
  
  let stepClasses = classNames({
    'Step': true,
    'Disabled': disabled
  });

  return(
    <div className="Step-container" data-testid="step">
      <input
        data-testid="step-checkbox"
        className="Step-checkbox"
        type="checkbox"
        disabled={disabled}
      />
      <div className={stepClasses}>
        <textarea
          data-testid="step-input"
          className="Step-edit"
          rows={1}
          wrap="off"
          value={step.name}
          onChange={handleUserInput}
          disabled={disabled}
        />
        <span
          data-testid="step-delete"
          className="Delete-step"
          onClick={() => deleteStep(step.id)}
        >x</span>
      </div>
    </div>
  );
}

export default Step;
