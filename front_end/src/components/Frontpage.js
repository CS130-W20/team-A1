import React, { Component } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";

class Frontpage extends Component {
  render() {
    return (
      <div id="frontpage">
        <h1>Welcome to the World Of HI-FI</h1>
        <Link to="/Login">Login To Start</Link>
      </div>
    );
  }
}

export default Frontpage;
