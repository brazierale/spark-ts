import '../styles/DetailPane.css';
import Description from "./Description";
import StepList from "./StepList";
import TagList from "./TagList";
import { TestCaseObject } from "../modules/TestCase";

type DetailPaneProps = {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
  updateTestCaseByKey: (testCase: TestCaseObject) => void;
}

const DetailPane = ({ selectedTestCase, updateSelectedTestCase, updateTestCaseByKey }: DetailPaneProps ) => {
    if (selectedTestCase) {
      return (
        <div className="Detail-pane">
          <div className="Debug-key">{selectedTestCase.key}</div>
          <div className="Detail-pane-header">
            <h1>{selectedTestCase.summary}</h1>
          </div>
          <div className="Detail-pane-body">
          <Description
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
          />
          <StepList
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
          />
          <TagList
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
          />
          </div>
          <div className="Detail-pane-footer">
            <button 
              className="Save-details"
              disabled={selectedTestCase.disabled}
              onClick={() => updateTestCaseByKey(selectedTestCase)}
            >Save</button>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }

export default DetailPane;
