import { Component, ReactNode } from "react";
import '../styles/DetailPane.css';
import Description from "./Description";
import { TestCaseObject } from "../modules/TestCase";

interface DetailPaneProps {
  selectedTestCase: TestCaseObject;
  updateDescription: (description: string) => void;
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
          <Description
              description={this.props.selectedTestCase.description}
              updateDescription={this.props.updateDescription}
              disabled={this.props.selectedTestCase.disabled}
            />
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
