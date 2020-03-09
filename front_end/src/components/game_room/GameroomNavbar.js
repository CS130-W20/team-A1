import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Button } from "react-bootstrap";

export class GameroomNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand style={{ marginLeft: "0 auto" }}>
            GAME ROOM: {this.props.room}
          </Navbar.Brand>

          <Navbar.Brand style={{ marginRight: "30px" }}>
            {this.props.role}
          </Navbar.Brand>
          <p class="navbar-text" style={{ margin: "0 auto" }}></p>
          <Navbar.Brand style={{ marginRight: "0 auto" }}>
            ROUND {this.props.round}/4
          </Navbar.Brand>
          {/* <p class="navbar-text" style={{ margin: "0 auto" }}>
            {this.props.role}
          </p> */}

          {/* <p class="navbar-text" style={{ marginRight: "0 auto" }}>
            ROUND {this.props.round}/4
          </p> */}
        </Navbar>
      </div>
    );
  }
}

export default GameroomNavbar;

{
  /* <Navbar bg="dark" variant="dark" fixed="top">
  <Navbar.Brand href="#" style={{ marginLeft: "0 auto" }}>
    Good Afternoon {props.name} !
  </Navbar.Brand>
  <p class="navbar-text" style={{ margin: "0 auto" }}>
    You Are Authorized
  </p>
  <Button
    size="lg"
    variant="outline-light"
    href="/"
    style={{ marginRight: "10px" }}
  >
    Home
  </Button>
  <Button
    size="lg"
    variant="outline-light"
    onClick={() => logout({ returnTo: logout_uri })}
    style={{ marginRight: "0 auto" }}
  >
    Logout
  </Button>
</Navbar>; */
}
