import React, { Component } from "react";

import { Route, NavLink, HashRouter } from "react-router-dom";

class Frontpage extends Component {
  render() {
    return (
      <div id="frontpage">
        <h1>Welcome to the World Of HI-FI</h1>
        <NavLink to="/Login">Login To Start</NavLink>
      </div>
    );
  }
}

export default Frontpage;
