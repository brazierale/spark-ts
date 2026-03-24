import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from '../modules/Constants';
import { TestCaseObject } from '../modules/TestCase';
import TestCaseDelete from './TestCaseDelete';
import TestCaseInput from './TestCaseInput';
import TestCaseMove from './TestCaseMove';

interface RowProps {
  testCase: TestCaseObject;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
  addTestCase: (testCase: TestCaseObject) => void;
  deleteTestCaseByKey: (key: string) => void;
  selectedTestCase: TestCaseObject;
  setSelectedTestCaseByKey: (key: string) => void;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
  moveTestCase: (toMove: TestCaseObject, moveTo: TestCaseObject) => void;
  dragEnabled: boolean;
  setDragEnabled: (dragEnabled: boolean) => void;
}

const Row = ({
  testCase,
  updateTestCaseByKey,
  addTestCase,
  deleteTestCaseByKey,
  selectedTestCase,
  setSelectedTestCaseByKey,
  updateSelectedTestCase,
  moveTestCase,
  dragEnabled,
  setDragEnabled,
}: RowProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEST_CASE,
    item: { testCase },
    canDrag: () => dragEnabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TEST_CASE,
    drop: (item: { testCase: TestCaseObject }) => {
      if (item.testCase.key !== 'blank') {
        moveTestCase(item.testCase, testCase);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const isSelected = testCase.key === selectedTestCase.key;

  const classes = classNames({
    Row: true,
    'Selected-row': isSelected,
    'Test-case-disabled': testCase.disabled,
    'Hover-over': isOver,
  });

  if (isDragging) return null;

  return (
    <div ref={ref} className={classes} data-testid='test-case'>
      <TestCaseInput
        testCase={testCase}
        updateTestCaseByKey={updateTestCaseByKey}
        addTestCase={addTestCase}
        deleteTestCase={deleteTestCaseByKey}
        selectedTestCase={selectedTestCase}
        isSelected={isSelected}
        setSelectedTestCaseByKey={setSelectedTestCaseByKey}
        updateSelectedTestCase={updateSelectedTestCase}
      />
      <TestCaseMove testCase={testCase} setDragEnabled={setDragEnabled} />
      <TestCaseDelete testCase={testCase} deleteTestCaseByKey={deleteTestCaseByKey} />
    </div>
  );
};

export default Row;
