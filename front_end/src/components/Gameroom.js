import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, NavLink, HashRouter, Link, useHistory } from "react-router-dom";
import Roomcreation from "./Roomcreation";

export class Gameroom extends Component {
  state = {
    ifowner: false
  };

  playrReadyHandle = () => {
    window.location.hash = "#/Playgame/player";
  };
  ownerStartHandle = () => {
    window.location.hash = "#/Playgame/owner";
  };
  render() {
    if (this.state.ifowner)
      return (
        <div id="gameRoom_owner">
          <h1>This is a player(room owner)</h1>
          <NavLink exact to="/">
            Home
          </NavLink>{" "}
          <r />
          <button onClick={this.ownerStartHandle}>Start Game</button>
          <Roomcreation className="Roombuttons" />
        </div>
      );
    return (
      <div id="gameRoom_player">
        <h1>This is a player(not the room owner)</h1>
        <Link to="/">
          <button>Home Go</button>
        </Link>
        <button onClick={this.playrReadyHandle}>I'm Ready</button>
        <Roomcreation className="Roombuttons" />
      </div>
    );
  }
}

export default Gameroom;
