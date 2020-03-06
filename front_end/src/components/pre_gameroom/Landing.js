import React, { useContext } from "react";
import Roomcreation from "./Roomcreation";
import Leaderboard_Global from "./Leaderboard_Global";
import { useAuth0 } from "./../../contexts/auth-context";
import { Button } from "react-bootstrap";

function Landing() {
  const { isLoading, user, logout, loginWithRedirect } = useAuth0();
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
    <div style={{ padding: "50px", margin: "50px" }}>
      {!isLoading && user && (
        <>
          <h1>
            Hello {user.nickname}, You are authorized , please select from below
            actions
          </h1>
          {user.picture && <img src={user.picture} alt="My Avatar" />}
          {/* {user.picture && <img src={user.picture} alt="My Avatar" />} */}
          <hr />
          <Button onClick={() => logout({ returnTo: "http://localhost:5000" })}>
            Logout
          </Button>
          <Roomcreation className="Roombuttons" userInfo={userInfo} />
          <Leaderboard_Global
            style={{ marginBottom: "100px", paddingBottom: "50px" }}
          ></Leaderboard_Global>
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
  );
}

export default Landing;
