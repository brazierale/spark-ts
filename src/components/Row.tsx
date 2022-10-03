import classNames from 'classnames';
import { Component, ReactNode } from 'react';
import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';
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
  connectDragSource: (element: ReactNode) => ReactNode;
  connectDropTarget: (element: ReactNode) => ReactNode;
  dragEnabled: boolean;
  setDragEnabled: (dragEnabled: boolean) => void;
  isDragging: boolean;
  isOver: boolean;
}

class Row extends Component<RowProps> {
  render(): ReactNode {
    const {
      testCase,
      updateTestCaseByKey,
      addTestCase,
      deleteTestCaseByKey,
      selectedTestCase,
      setSelectedTestCaseByKey,
      updateSelectedTestCase,
      connectDragSource,
      connectDropTarget,
      setDragEnabled,
      isDragging,
      isOver,
    } = this.props;

    const isSelected = () => {
      return testCase.key === this.props.selectedTestCase.key;
    };

    let classes = classNames({
      Row: true,
      'Selected-row': isSelected(),
      'Test-case-disabled': testCase.disabled,
      'Hover-over': isOver,
    });

    if (!isDragging) {
      return connectDropTarget(
        connectDragSource(
          <div className={classes} data-testid='test-case'>
            <TestCaseInput
              testCase={testCase}
              updateTestCaseByKey={updateTestCaseByKey}
              addTestCase={addTestCase}
              deleteTestCase={deleteTestCaseByKey}
              selectedTestCase={selectedTestCase}
              isSelected={isSelected()}
              setSelectedTestCaseByKey={setSelectedTestCaseByKey}
              updateSelectedTestCase={updateSelectedTestCase}
            />
            <TestCaseMove testCase={testCase} setDragEnabled={setDragEnabled} />
            <TestCaseDelete
              testCase={testCase}
              deleteTestCaseByKey={deleteTestCaseByKey}
            />
          </div>
        )
      );
    }
    // don't display the test case whilst we're dragging
    else return null;
  }
}

// actions to carry out when drag starts
const testCaseSource = {
  beginDrag(props: RowProps) {
    return { testCase: props.testCase };
  },
  canDrag(props: RowProps) {
    return props.dragEnabled;
  },
};

// actions to carry out when item is dropped
const testCaseTarget = {
  drop(props: RowProps, monitor: DropTargetMonitor) {
    // don't move if we're trying to move onto the blank test case
    if (monitor.getItem().testCase.key !== 'blank') {
      props.moveTestCase(monitor.getItem().testCase, props.testCase);
    }
  },
};

// set methods for Dragging
const collectDrag = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

// set methods for Dropping
const collectDrop = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
};

const draggableRow = DragSource(
  ItemTypes.TEST_CASE,
  testCaseSource,
  collectDrag
  // @ts-ignore
)(Row);
const targetableRow = DropTarget(
  ItemTypes.TEST_CASE,
  testCaseTarget,
  collectDrop
  // @ts-ignore
)(draggableRow);

export default targetableRow;
