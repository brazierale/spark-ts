import { Component, ReactNode } from "react";
import '../styles/DetailPane.css';
import { TestCaseObject } from "../modules/TestCase";

interface DetailPaneProps {
  selectedTestCase: TestCaseObject;
}

class DetailPane extends Component<DetailPaneProps> {
  render(): ReactNode {
    if (this.props.selectedTestCase) {
      return (
        <div className="Detail-pane">
          <div className="Debug-key">{this.props.selectedTestCase.key}</div>
          <div className="Detail-pane-header">
            <h1>{this.props.selectedTestCase.summary}</h1>
          </div>
          <div className="Detail-pane-body">
            <div>{this.props.selectedTestCase.description}</div>
          </div>
          <div className="Detail-pane-footer">
            <button 
              className="Save-details"
              disabled={this.props.selectedTestCase.disabled}
              onClick={() => console.log('saving...')}
            >Save</button>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default DetailPane;
