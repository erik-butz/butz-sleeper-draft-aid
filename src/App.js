import logo from './logo.svg';
import './App.css';
import fetchAllPlayers from './scripts/fetchPlayersScript'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reeact
        </a>
        <button onClick={fetchAllPlayers}>TestingButton</button>
      </header>
    </div>
  );
}

export default App;
