import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
         <img src={logo} className="App-logo" alt="logo" />
          GPIO Web Console
        </h1>
      </header>
      <section>
        <p>Hello world!</p>
      </section>
    </div>
  );
}

export default App;
