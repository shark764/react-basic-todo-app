import React from 'react';

import logo from './assets/image/logo.svg';
import './assets/css/App.css';
import './assets/css/table.css';
import './assets/css/form.css';

import HelloWorld from './components/HelloWorld';
import HelloUniverse from './components/HelloUniverse';
import HelloImmutable from './components/ImmutableExamples/HelloImmutable';
import StatefulComponent from './components/StatefulComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>

      <HelloWorld helloMessage="Hello World" text="This is my first component. See how easy React is?" />

      <div className="App-main">
        <HelloUniverse helloMessage="Hello Universe!!" text="Wait, are you telling me there is a multiverse?" />
      </div>

      <div className="App-main">
        <HelloImmutable />
      </div>

      <div className="App-main">
        <StatefulComponent />
      </div>
    </div>
  );
}

export default App;
