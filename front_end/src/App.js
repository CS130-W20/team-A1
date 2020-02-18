import React from "react";
import "./App.css";
import Searchbox from "./Searchbox";
import Roomcreation from "./components/Roomcreation";

function App() {
  return (
    <div className="App">
      <body className="App-body">
        <p>Welcome to the World Of HI-FI</p>
        <p>Fun Token = {window.token} </p>
        <a
          className="App-link"
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start Gaming
        </a>
        <div className="searchbox">
          <Searchbox></Searchbox>
        </div>
        <Roomcreation className="Roombuttons" />
      </body>
    </div>
  );
}

export default App;
