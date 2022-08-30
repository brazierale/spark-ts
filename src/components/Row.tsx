import classNames from "classnames";
import { Component, ReactNode } from "react";
import { DragSource, DragSourceConnector, DragSourceMonitor, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from "../modules/Constants";
import { TestCaseObject } from "../modules/TestCase";
import TestCaseDelete from "./TestCaseDelete";
import TestCaseInput from "./TestCaseInput";
import TestCaseMove from "./TestCaseMove";

interface RowProps {
  testCase: TestCaseObject;
  updateTestCaseByKey: (updatedTestCase: TestCaseObject) => void;
  addTestCase: (testCase: TestCaseObject) => void;
  deleteTestCaseByKey: (key: string) => void;
  selectedTestCase: TestCaseObject;
  setSelectedTestCaseByKey: (key: string) => void;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
  moveAboveSortId: (key: string) => void;
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
    isOver
  } = this.props

  const isSelected = () => {
    return testCase.key === this.props.selectedTestCase.key;
  }

  let classes = classNames({
    'Row': true,
    'Selected-row': isSelected(),
    'Test-case-disabled': testCase.disabled,
    'Hover-over': isOver
  });

  if(!isDragging) {
    return connectDropTarget(connectDragSource(
      <div className={classes}>
        <div className="Test-case-container">
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
        </div>
        <div >
          <TestCaseMove
            testCase={testCase}
            setDragEnabled={setDragEnabled}
          />
        </div>
        <TestCaseDelete
          testCase={testCase}
          deleteTestCaseByKey={deleteTestCaseByKey}
        />
      </div>
    ));
  }
  else return null;
  }
}

// actions to carry out when drag starts
const testCaseSource = {
  beginDrag(props: RowProps) {
    console.log('dragging' + props.testCase.summary)
    return {testCase: props.testCase}
  },
  canDrag(props: RowProps) {
    return props.dragEnabled;
  }
}

// actions to carry out when item is dropped
const testCaseTarget = {
  drop(props: RowProps, monitor: DropTargetMonitor) {
    // get the test case we're dropping
    let testCaseToMove = monitor.getItem().testCase;
    // current this is the row being dropped onto, so get the Id to sort above
    testCaseToMove.sortId = props.moveAboveSortId(props.testCase.key);
    props.updateTestCaseByKey(testCaseToMove);
  }
};

// set methods for Dragging
const collectDrag = (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

// set methods for Dropping
const collectDrop = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
};

// @ts-ignore
const draggableRow = DragSource(ItemTypes.TEST_CASE, testCaseSource, collectDrag)(Row);
// @ts-ignore
const targetableRow = DropTarget(ItemTypes.TEST_CASE, testCaseTarget, collectDrop)(draggableRow);

export default targetableRow;
