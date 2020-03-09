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
import { useAuth0 } from "./../../contexts/auth-context";

// const { isLoading, user, loginWithRedirect } = useAuth0();

function FrontPageNavbar() {
  const { isLoading, user, loginWithRedirect, logout_uri, logout } = useAuth0();

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#">Hi-Fi</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          {!isLoading && !user && (
            <Button variant="outline-info" onClick={loginWithRedirect}>
              Login/Signup
            </Button>
          )}
          {!isLoading && user && (
            <Button
              variant="outline-info"
              onClick={() => logout({ returnTo: logout_uri })}
            >
              Logout
            </Button>
          )}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
}

export default FrontPageNavbar;
