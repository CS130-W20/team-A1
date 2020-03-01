import React, { Component } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import Navbar from "./FrontPageNavbar";
import { ButtonToolbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Frontpage extends Component {
  render() {
    return (
      <div id="frontpage">
        <Navbar />

        <h1
          style={{
            textAlign: "center",
            margin: "200px"
          }}
        >
          Welcome to the World Of HI-FI
        </h1>
        <h4
          style={{
            textAlign: "center",
            margin: "50px"
          }}
        >
          Can't wait to start the game?
        </h4>

        <Button
          variant="success"
          href="#Login"
          size="lg"
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "100px"
          }}
          block
        >
          Jump in!
        </Button>
      </div>
    );
  }
}

export default Frontpage;
