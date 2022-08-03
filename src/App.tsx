import MainContainer from './components/MainContainer';
import { TestCaseObject } from './modules/TestCase';
import './styles/App.css'
import logo from './styles/small-header.svg';

const tempTestCases: TestCaseObject[] = [];
tempTestCases.push(
  new TestCaseObject(
    'keyTest',
      1,
      'I am a test case summary',
      'This is a longer piece of text because this is a description field so we want more',
      [],
      [],
  )
);

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
