import React from "react";
import "./App.css";
import Gameroom from "./components/wait_room/Gameroom";
import Frontpage from "./components/pre_login/Frontpage";
import Playgame from "./components/game_room/Playgame";
import Landing from "./components/pre_gameroom/Landing";
import Roundend from "./components/post_gameroom/Roundend";
import { Route, HashRouter } from "react-router-dom";
import io from "socket.io-client";
import SocketContext from "./components/pre_gameroom/Context";
import Particles from "react-particles-js";
// const socket = io("https://18.208.153.149");
const socket = io("http://localhost:5000");

// const socket = io();

function App() {
  return (
    // <div>
    //   <Particles
    //     params={{
    //       particles: {
    //         number: {
    //           value: 2000,
    //           density: {
    //             enable: true,
    //             value_area: 10000
    //           }
    //         }
    //       }
    //     }}
    //   />
    <SocketContext.Provider value={socket}>
      <HashRouter>
        <body className="App-body">
          <Route exact path="/" component={Frontpage} />
          <Route exact path="/Gameroom" component={Gameroom} />
          <Route exact path="/Landing" component={Landing} />
          <Route exact path="/Roundend" component={Roundend} />
          <Route path="/Playgame" component={Playgame} />
        </body>
      </HashRouter>
    </SocketContext.Provider>
    // </div>
  );
}

export default App;
