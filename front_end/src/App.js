import React from "react";
import "./App.css";
import Gameroom from "./components/Gameroom";
import Frontpage from "./components/Frontpage";
import Login from "./components/Login";
import Playgame from "./components/Playgame";
<<<<<<< HEAD
import Landing from "./components/Landing";
import { Route, NavLink, HashRouter } from "react-router-dom";
import io from "socket.io-client";
import SocketContext from "./components/Context";
const socket = io("http://localhost:5000");

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <HashRouter>
        <body className="App-body">
          <Route exact path="/" component={Frontpage} />
          <Route exact path="/Gameroom" component={Gameroom} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Landing" component={Landing} />
          <Route path="/Playgame/:role" component={Playgame} />
        </body>
      </HashRouter>
    </SocketContext.Provider>
=======
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
>>>>>>> aff996527e4eef89e330bb49d8bc950df9e5bfa0
  );
}

export default App;
