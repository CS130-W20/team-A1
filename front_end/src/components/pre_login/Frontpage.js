import React, { Component, useContext } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import Navbar from "./FrontPageNavbar";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "./../../contexts/auth-context";
import logo from "./../../logo/logo2.png";

function Frontpage() {
  // render() {
  const { isLoading, user, loginWithRedirect } = useAuth0();
  console.log("values: " + isLoading + " " + user);
  // const auth = useContext(Auth0Context);
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
      <img
        src={logo}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        alt="My Avatar"
      />
      <h4
        style={{
          textAlign: "center",
          margin: "50px"
        }}
      >
        Can't wait to start the game?
      </h4>
      {!isLoading && !user && (
        <>
          {" "}
          <Button
            variant="success"
            // href="#Login"
            onClick={loginWithRedirect}
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
        </>
      )}

      <Button
        variant="primary"
        href="#Landing"
        size="lg"
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "100px"
        }}
        block
      >
        DEV ONLY!! jump to landing
      </Button>
    </div>
  );
}

export default Frontpage;
