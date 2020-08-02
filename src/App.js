import React from 'react';

import HelloWorld from './components/HelloWorld';
import HelloUniverse from './components/HelloUniverse';

import logo from './assets/image/logo.svg';
import './assets/css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>

      <HelloWorld />
      <div className="App-main">
        <HelloUniverse />
      </div>
    </div>
  );
}

export default App;
