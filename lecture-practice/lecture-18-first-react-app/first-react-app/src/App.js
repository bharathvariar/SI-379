import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

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
        >dan
          Learn React
        </a>
      </header>
      <h1>Hello World!</h1>
      <section className="container">
        <h2>Button Group</h2>
        <div className="btn-group">
          <button type="button" className="btn btn-primary">Apple</button>
          <button type="button" className="btn btn-primary">Samsung</button>
        </div>
      </section>  
    </div>
  );
}

export default App;
