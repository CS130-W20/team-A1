import React, { Component } from "react";
import Roomcreation from "./Roomcreation";
import Leaderboard_Global from "./Leaderboard_Global";
const signIn = true;
const leaderboard = [
  {
    id: "d4",
    maxScore: 82,
    name: "Ado Kukic",
    picture: "https://twitter.com/KukicAdo/profile_image"
  },
  {
    id: "a1",
    maxScore: 235,
    name: "Bruno Krebs",
    picture: "https://twitter.com/brunoskrebs/profile_image"
  },
  {
    id: "c3",
    maxScore: 99,
    name: "Diego Poza",
    picture: "https://twitter.com/diegopoza/profile_image"
  },
  {
    id: "b2",
    maxScore: 129,
    name: "Jeana Tahnk",
    picture: "https://twitter.com/jeanatahnk/profile_image"
  },
  {
    id: "e5",
    maxScore: 34,
    name: "Jenny Obrien",
    picture: "https://twitter.com/jenny_obrien/profile_image"
  },
  {
    id: "f6",
    maxScore: 153,
    name: "Kim Maida",
    picture: "https://twitter.com/KimMaida/profile_image"
  },
  {
    id: "g7",
    maxScore: 55,
    name: "Luke Oliff",
    picture: "https://twitter.com/mroliff/profile_image"
  },
  {
    id: "h8",
    maxScore: 146,
    name: "Sebastian Peyrott",
    picture: "https://twitter.com/speyrott/profile_image"
  }
];

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
