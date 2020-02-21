import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, NavLink, HashRouter, Link, useHistory } from "react-router-dom";
import SocketContext from "./Context";
import { Playerwait } from "./Playerwait";

export class Gameroom1 extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    myId: 0,
    ifready: false,
    Message: this.props.location.state.m,
    Ifowner: this.props.location.state.m.ifowner,
    player1: { ifexists: false, id: 1 },
    player2: { ifexists: false, id: 2 },
    player3: { ifexists: false, id: 3 }
  };
  componentDidMount() {
    this.props.socket.on("player_status_changed", function(message) {
      console.log("Player status changed: " + message);
    });
    this.props.socket.on("player_suc_join", function(message) {
      console.log("New Player Joined: " + message);
    });
    this.props.socket.on("player_left", function(message) {
      console.log("A player left, his ID is " + message);
    });
  }

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
    const data = {
      room_name: this.state.Message.room_name,
      id: this.state.myId
    };
    if (this.state.ifready) {
      this.props.socket.emit("player_ready", data);
    } else {
      this.props.socket.emit("player_UNDOready", data);
    }
  };
  LeaveRoomHandle = () => {
    const data = {
      room_name: this.state.Message.room_name,
      id: this.state.myId
    };
    this.props.socket.emit("player_left_room", data);
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

    if (this.state.Ifowner)
      return (
        <div>
          <h1> Room name: {this.state.Message.room_name}</h1>
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
            <button onClick={this.LeaveRoomHandle}>Leave Room</button>
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
        <h1>Room name: {this.state.Message.room_name}</h1>
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
          <button onClick={this.LeaveRoomHandle}>Leave Room</button>
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
