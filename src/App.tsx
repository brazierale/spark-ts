import MainContainer from './components/MainContainer';
import './styles/App.css'
import logo from './styles/small-header.svg';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer />
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
