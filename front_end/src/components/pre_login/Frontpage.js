import React, { Component, useContext } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import Navbar from "./FrontPageNavbar";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "./../../contexts/auth-context";
import logo from "./../../logo/logo2.png";
import Footbar from "./Footbar";

function Frontpage() {
  // render() {
  const { isLoading, user, loginWithRedirect } = useAuth0();

  console.log("values: " + isLoading + " " + user);
  // const auth = useContext(Auth0Context);
  return (
    <>
      <div id="frontpage">
        <Navbar />

        <h1
          style={{
            textAlign: "center",
            margin: "200px"
          }}
        >
          Welcome to HI-FI Games !
        </h1>
<<<<<<< HEAD
        <div
          style={{
            display: "flex",
            justifyContent: "center"
            // backgroundColor: "green"
          }}
        >
          <img
            src={logo}
            width={300}
            height={300}
            // style={{
            //   textAlign: "center",
            //   alignItems: "center",
            //   display: "block"
            // }}
            alt="My Avatar"
          />
        </div>
=======
        <img
          src={logo}
          width={300}
          height={300}
          style={{
            textAlign: "center",
            alignItems: "center",
            display: "block"
          }}
          alt="My Avatar"
        />
>>>>>>> master
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
<<<<<<< HEAD
        {!isLoading && user && (
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
            Go to Game Room
          </Button>
        )}
=======

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
>>>>>>> master
      </div>
      <Footbar></Footbar>
    </>
  );
}

export default Frontpage;
