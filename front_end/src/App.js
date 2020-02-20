import React from "react";
import "./App.css";
import Gameroom from "./components/Gameroom";
import Frontpage from "./components/Frontpage";
import Login from "./components/Login";
import Playgame from "./components/Playgame";
import Landing from "./components/Landing";
import { Roundend } from "./components/Roundend";
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
          <Route exact path="/Roundend" component={Roundend} />
          <Route path="/Playgame/:role" component={Playgame} />
        </body>
      </HashRouter>
    </SocketContext.Provider>
  );
}

export default App;
