import MainContainer from './components/MainContainer';
import { blankTestCase, TestCaseObject } from './modules/TestCase';
import './styles/App.css'

const logo = require('./styles/small-header.svg')
const tempTestCases: TestCaseObject[] = [];

tempTestCases.push(blankTestCase());

function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer testCases={tempTestCases}/>
    </div>
  );
}

const Header = () => {
  return (
    <div className="Header">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
