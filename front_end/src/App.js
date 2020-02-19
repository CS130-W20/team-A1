import React from "react";
import "./App.css";
import Gameroom from "./components/Gameroom";
import Frontpage from "./components/Frontpage";
import Login from "./components/Login";
import Playgame from "./components/Playgame";
import { Route, NavLink, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <body className="App-body">
        <Route exact path="/" component={Frontpage} />
        <Route exact path="/Gameroom" component={Gameroom} />
        <Route exact path="/Login" component={Login} />
        <Route path="/Playgame/:role" component={Playgame} />
      </body>
    </HashRouter>
  );
}

export default App;
