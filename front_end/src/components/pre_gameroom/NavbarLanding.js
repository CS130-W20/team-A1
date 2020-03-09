import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { useAuth0 } from "./../../contexts/auth-context";

function NavbarLanding(props) {
  const { logout, isLoading, user, logout_uri } = useAuth0();

  return (
    <div>
      {!isLoading && user && (
        <Navbar bg="dark" variant="dark" fixed="top">
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
        </Navbar>
      )}
      {!isLoading && !user && <h1>Prohibited Access, Please Signin/Singup</h1>}
    </div>
  );
}

export default NavbarLanding;
