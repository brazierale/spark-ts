import React from 'react';
import { generateSortId } from '../modules/KeyGen';
import { TestCaseObject } from '../modules/TestCase';

type MainContainerProps = {
  testCases: TestCaseObject[]
}

class MainContainer extends React.Component<MainContainerProps> {

  componentDidMount() {
    //this.props.getTestCases();
  }

  render() {
    return(
      <div className="Main-container">
        {this.props.testCases[0].key}
      </div>
    );
  }

  // this should move elsewhere, but I'm not sure where yet
  nextSortId = () => {
    if (this.props.testCases[this.props.testCases.length-2]) {
      return generateSortId(
        this.props.testCases[this.props.testCases.length-2].sortId
      );
    }
    else {
      return generateSortId(0);
    }
  }
}

export default MainContainer;