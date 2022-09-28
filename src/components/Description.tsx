import { TestCaseObject } from '../modules/TestCase';
import '../styles/Description.css';

type DescriptionProps = {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
};

// description field
const Description = ({
  selectedTestCase,
  updateSelectedTestCase,
}: DescriptionProps) => {
  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSelectedTestCase({
      ...selectedTestCase,
      description: event.target.value,
    });
  };

  return (
    <div data-testid='description' className='Description-container'>
      <span className='Label'>Description</span>
      <textarea
        className='Description-input'
        rows={4}
        placeholder='Enter new description...'
        value={selectedTestCase.description}
        onChange={handleUserInput}
        disabled={selectedTestCase.disabled}
      />
    </div>
  );
};

export default Description;
