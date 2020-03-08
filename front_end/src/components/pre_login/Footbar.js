import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormControl,
  Form,
  Button
} from "react-bootstrap";

export class Footbar extends Component {
  render() {
    return (
      <div style={{ marginTop: "130px" }}>
        <Navbar bg="dark" variant="dark" fixed="bottom">
          <Navbar.Brand href="#">Copyright {"\u00A9"} Hi-Fi Games</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default Footbar;
