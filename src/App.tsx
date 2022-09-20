import { useRecoilState } from 'recoil';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MainContainer from './components/MainContainer';
import './styles/App.css'
import logo from './styles/small-header.svg';
import { loadError } from './atoms/MainState';

const App = () => {
  const [isLoadError] = useRecoilState(loadError);

  if (!isLoadError) {
    return (
      <div className="App">
        <Header />
        <MainContainer />
      </div>
    );
  }
  else {
    return (
      <div>
        FAILURE!!!
      </div>
    )
  }
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
