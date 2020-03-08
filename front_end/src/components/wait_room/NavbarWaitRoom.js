import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Button } from "react-bootstrap";

export class NavbarWaitRoom extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="#" style={{ marginLeft: "0 auto" }}>
            GAME ROOM: {this.props.room}
          </Navbar.Brand>
          <p class="navbar-text" style={{ margin: "0 auto" }}>
            Happy Gaming {this.props.user_name}
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
            onClick={this.props.leave_room_handle}
            style={{ marginRight: "0 auto" }}
          >
            Leave Room
          </Button>
        </Navbar>
      </div>
    );
  }
}

export default NavbarWaitRoom;
