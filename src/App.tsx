import './styles/App.css'

const logo = require('./styles/small-header.svg')

function App() {
  return (
    <div className="App">
      <Header />
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
