import React, { Component } from "react";
import Roomcreation from "./Roomcreation";
import Leaderboard_Global from "./Leaderboard_Global";

export class Landing extends Component {
  render() {
    return (
      <div style={{ padding: "50px", margin: "50px" }}>
        <hi>You are authorized , please select from below actions</hi>
        <Roomcreation className="Roombuttons" />
        <Leaderboard_Global
          style={{ marginBottom: "100px", paddingBottom: "50px" }}
        ></Leaderboard_Global>
      </div>
    );
  }
}

export default Landing;
