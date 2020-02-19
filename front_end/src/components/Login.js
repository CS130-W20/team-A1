import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";

export class Login extends Component {
  render() {
    return (
      <div>
        <h1>Awesome Login Page is coming !</h1>
        <ul className="enterRoom">
          <NavLink to="/Gameroom">Game Room</NavLink> <br />
        </ul>
      </div>
    );
  }
}

export default Login;
