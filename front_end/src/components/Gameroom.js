import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, NavLink, HashRouter, Link, useHistory } from "react-router-dom";
import SocketContext from "./Context";

export class Gameroom1 extends Component {
  constructor(props){
    super(props);
     this.props.socket.on("player_suc_join", function(message) {

      console.log(message);
    });
  }

  Message = this.props.location.state.m;
  Ifowner = this.Message.ifowner;
 
  playrReadyHandle = () => {
    window.location.hash = "#/Playgame/player";
  };
  ownerStartHandle = () => {
    window.location.hash = "#/Playgame/owner";
  };
  
  render() {
    console.log("The ownership is: " + this.Message.ifowner);
    const playerstyle = {
      boxSizing: "border-box",
      width: "250px",
      height: "290px",
      border: "5px solid red",
      float: "left",
      backgroundColor: "blue",
      color: "white"
    };
    if (this.Ifowner)
      return (
        <div id="gameRoom_owner">
          <h1>You own the room </h1>
          <div
            id="buttons_own"
            style={{
              backgroundColor: "grey",
              height: "70px",
              width: "200px",
              padding: "30px"
            }}
          >
            <NavLink exact to="/">
              Home
            </NavLink>{" "}
            <r />
            <button onClick={this.ownerStartHandle}>Start Game</button>
          </div>
          <div id="player1" style={playerstyle}>
            {" "}
            <h4>Player 1</h4>
            <h5>Status:Ready</h5>
          </div>
          <div id="player2" style={playerstyle}>
            {" "}
            <h4>Player 1</h4>
            <h5>Status:Ready</h5>
          </div>
          <div id="player3" style={playerstyle}>
            {" "}
            <h4>Player 1</h4>
            <h5>Status:Ready</h5>
          </div>
        </div>
      );

    console.log(
      "We are at the Game room messge is: \n" +
        this.props.location.state.m.room_name
    );
    return (
      <div id="gameRoom_player">
        <h1>Happy Gaming</h1>
        <div
          id="buttons"
          style={{
            backgroundColor: "grey",
            height: "70px",
            width: "200px",
            padding: "30px"
          }}
        >
          <Link to="/">
            <button>Home Go</button>
          </Link>
          <button onClick={this.playrReadyHandle}>I'm Ready</button>
        </div>

        <div id="player1" style={playerstyle}>
          {" "}
          <h4>Player 1</h4>
          <h5>Status:Ready</h5>
        </div>
        <div id="player2" style={playerstyle}>
          <h4>Player 2</h4>
          <h5>Status:Ready</h5>
        </div>
        <div id="player3" style={playerstyle}>
          <h4>Player 3</h4>
          <h5>Status:Ready</h5>
        </div>
      </div>
    );
  }
}
const Gameroom = props => (
  <SocketContext.Consumer>
    {socket => <Gameroom1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Gameroom;
