import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MainContainer from './components/MainContainer';
import './styles/App.css'
import logo from './styles/small-header.svg';

const App = () => {
  return (
    <div className="App">
        <Header />
        <MainContainer />
    </div>
  );
};

const Header = () => {
  return (
    <div className="Header">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default DragDropContext(HTML5Backend)(App);
