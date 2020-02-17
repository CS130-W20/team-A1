import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Searchbox from './Searchbox'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the World Of HI-FI</p>
        <p>Fun Token = {window.token} </p>
        <a
          className="App-link"
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start Gamingg
        </a>
      </header>
      <div className="searchbox">
      <Searchbox></Searchbox>
      </div>
    </div>
  );
}

export default App;
