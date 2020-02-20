import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, NavLink, HashRouter, Link, useHistory } from "react-router-dom";
import SocketContext from "./Context";
import { Playerwait } from "./Playerwait";

export class Gameroom1 extends Component {
  constructor(props) {
    super(props);
    this.props.socket.on("player_suc_join", function(message) {
      console.log(message);
    });
  }
  state = {
    ifready: false
  };

  Message = this.props.location.state.m;
  Ifowner = this.Message.ifowner;

  playrReadyHandle = () => {
    //window.location.hash = "#/Playgame/player";
  };
  ownerStartHandle = () => {
    window.location.hash = "#/Playgame/owner";
  };

  ToggleReady = () => {
    this.setState({
      ifready: !this.state.ifready
    });
  };

  render() {
    //console.log("The ownership is: " + this.Message.ifowner);
    if (this.state.ifready) {
      console.log("player ready!!!");
      this.playrReadyHandle();
    }
    const style = !this.state.ifready
      ? {
          backgroundColor: "red",
          color: "white",
          width: "90px",
          height: "30px",
          margin: "10px"
        }
      : {
          backgroundColor: "green",
          color: "white",
          width: "90px",
          height: "30px",
          margin: "10px"
        };

    if (this.Ifowner)
      return (
        <div>
          <h1> Room name: {this.Message.room_name}</h1>
          <h3>You own the room </h3>
          <div
            id="buttons_own"
            style={{
              backgroundColor: "grey",
              height: "70px",
              width: "200px",
              padding: "30px",
              margin: "30px"
            }}
          >
            <NavLink exact to="/">
              Home
            </NavLink>
            <br />
            <button onClick={this.ownerStartHandle}>Start Game</button>
            <button onClick={this.ToggleReady} style={style}>
              {!this.state.ifready ? "Get Ready" : "Not Ready"}
            </button>
          </div>
          <div
            id="currentUser"
            style={{
              backgroundColor: "grey",
              height: "70px",
              width: "200px",
              padding: "30px",
              margin: "30px"
            }}
          >
            <p style={{ color: "white" }}>My Name: Eminem</p>
            <p style={{ color: "white" }}>Drop Down Menu</p>
          </div>
          <Playerwait
            id={1}
            name={"Joey"}
            status={"Ready"}
            ifPlayerExists={false}
          />
          <Playerwait
            id={2}
            name={"Jon"}
            status={"Waiting"}
            ifPlayerExists={false}
          />
          <Playerwait
            id={3}
            name={"Omar"}
            status={"Ready"}
            ifPlayerExists={true}
          />
        </div>
      );

    console.log(
      "We are at the Game room messge is: \n" +
        this.props.location.state.m.room_name
    );

    return (
      <div id="gameRoom_player">
        <h1>Room name: {this.Message.room_name}</h1>
        <h3>Happy Gaming</h3>
        <div
          id="buttons"
          style={{
            backgroundColor: "grey",
            height: "70px",
            width: "200px",
            padding: "30px",
            margin: "30px"
          }}
        >
          <Link to="/">
            <button>Home</button>
          </Link>

          <button onClick={this.ToggleReady} style={style}>
            {!this.state.ifready ? "Get Ready" : "Not Ready"}
          </button>
        </div>
        <div
          id="currentUser1"
          style={{
            backgroundColor: "grey",
            height: "70px",
            width: "200px",
            padding: "30px",
            margin: "30px"
          }}
        >
          <p style={{ color: "white" }}>My Name: Eminem</p>
          <p style={{ color: "white" }}>Drop Down Menu</p>
        </div>
        <Playerwait
          id={1}
          name={"Joey"}
          status={"Ready"}
          ifPlayerExists={false}
        />
        <Playerwait
          id={2}
          name={"Jon"}
          status={"Waiting"}
          ifPlayerExists={false}
        />
        <Playerwait
          id={3}
          name={"Omar"}
          status={"Ready"}
          ifPlayerExists={true}
        />
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
