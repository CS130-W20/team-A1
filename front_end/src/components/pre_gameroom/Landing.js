import React, { useContext } from "react";
import Roomcreation from "./Roomcreation";

import { useAuth0 } from "./../../contexts/auth-context";
import { Button } from "react-bootstrap";
import NavbarLanding from "./NavbarLanding";
import Footbar from "./../pre_login/Footbar";

function Landing() {
  const { isLoading, user, loginWithRedirect } = useAuth0();
  let userInfo = {};
  if (user && !isLoading) {
    console.log(
      "status is loading" +
        isLoading +
        "\n user" +
        JSON.stringify(user) +
        "Id is" +
        user["sub"]
    );
    userInfo = {
      id: user["sub"],
      name: user["nickname"],
      picture_url: user["picture"],
      authenticated: true
    };
  }

  return (
    <>
      <div style={{ padding: "50px", margin: "50px" }}>
        {!isLoading && user && (
          <>
            {/* <h1>
            Hello {user.nickname}, You are authorized , please select from below
            actions
          </h1> */}
            <NavbarLanding name={user.nickname}></NavbarLanding>
            {/* {user.picture && <img src={user.picture} alt="My Avatar" />} */}
            {/* {user.picture && <img src={user.picture} alt="My Avatar" />}
          <hr />
          <Button onClick={() => logout({ returnTo: "http://localhost:5000" })}>
            Logout
          </Button> */}
            <Roomcreation className="Roombuttons" userInfo={userInfo} />
          </>
        )}

        {!isLoading && !user && (
          <>
            {" "}
            <h1>You are not authorized, please log in or sign up!</h1>
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
              Login/Signup
            </Button>
          </>
        )}
      </div>
      <Footbar></Footbar>
    </>
  );
}

export default Landing;
