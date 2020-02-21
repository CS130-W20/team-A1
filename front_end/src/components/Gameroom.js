import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, NavLink, HashRouter, Link, useHistory } from "react-router-dom";
import SocketContext from "./Context";
import { Playerwait } from "./Playerwait";

export class Gameroom1 extends Component {
  constructor(props) {
    super(props);
    this.eventlistener = this.eventlistener.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      myId: this.props.socket.id,
      ifready: false,
      Message: this.props.location.state.m,
      Ifowner: this.props.location.state.m.ifowner,
      player1: {
        ifexists: this.player_size(0) ? true : false,
        id: this.player_size(0) ? this.props.location.state.m.clients[0].id : 0,
        name: this.player_size(0)
          ? this.props.location.state.m.clients[0].id
          : "",
        status: this.player_size(0)
          ? this.props.location.state.m.clients[0].status
          : ""
      },
      player2: {
        ifexists: this.player_size(1) ? true : false,
        id: this.player_size(1) ? this.props.location.state.m.clients[1].id : 0,
        name: this.player_size(1)
          ? this.props.location.state.m.clients[1].id
          : "",
        status: this.player_size(1)
          ? this.props.location.state.m.clients[1].status
          : ""
      },
      player3: {
        ifexists: this.player_size(2) ? true : false,
        id: this.player_size(2) ? this.props.location.state.m.clients[2].id : 0,
        name: this.player_size(2)
          ? this.props.location.state.m.clients[2].id
          : "",
        status: this.player_size(2)
          ? this.props.location.state.m.clients[2].status
          : ""
      }
    };
  }
  player_size(size) {
    return this.props.location.state.m.clients.length > size;
  }
  componentDidMount() {
    this.eventlistener();
  }
  eventlistener = () => {
    this.props.socket.on("player_status_changed", message => {
      if (message.id != this.state.myId) {
        if (message.id == this.state.player1.id) {
          this.change_client_status(1, message.status);
        } else if (message.id == this.state.player2.id) {
          this.change_client_status(2, message.status);
        } else if (message.id == this.state.player3.id) {
          this.change_client_status(3, message.status);
        }
      }
    });

    this.props.socket.on("player_suc_join", message => {
      console.log("New Player Joined: " + message);
    });
    this.props.socket.on("player_left", message => {
      console.log("A player left, his ID is " + message);
      if (message.id != this.props.socket.id) {
        if (message.id == this.state.player1.id) {
          this.RemoveUser(1);
        } else if (message.id == this.state.player2.id) {
          this.RemoveUser(2);
        } else if (message.id == this.state.player3.id) {
          this.RemoveUser(3);
        }
      }
    });
  };
  ownerStartHandle = () => {
    window.location.hash = "#/Playgame/owner";
  };
  RemoveUser = useNum => {
    if (useNum == 1) {
      this.setState({
        player1: { ifexists: false, id: 0, name: "", status: "" }
      });
    } else if (useNum == 2) {
      this.setState({
        player2: { ifexists: false, id: 0, name: "", status: "" }
      });
    } else if (useNum == 3) {
      this.setState({
        player3: { ifexists: false, id: 0, name: "", status: "" }
      });
    }
  };
  change_client_status = (useNum, Status) => {
    var clientStatus;
    if (useNum == 1) {
      clientStatus = { ...this.state.player1 };
    } else if (useNum == 2) {
      clientStatus = { ...this.state.player1 };
    } else if (useNum == 3) {
      clientStatus = { ...this.state.player1 };
    }
    clientStatus.status = Status;
    this.setState({ clientStatus });
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

    window.location.hash = "#/Landing";
  };

  render() {
    //console.log("The ownership is: " + this.Message.ifowner);
    if (this.state.ifready) {
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
              height: "110px",
              width: "210px",
              padding: "10px",
              margin: "10px"
            }}
          >
            <p style={{ color: "white" }}>My Name: Eminem</p>
            <p style={{ color: "white" }}>Drop Down Menu</p>
          </div>
          <Playerwait
            id={1}
            name={this.state.player1.name}
            status={this.state.player1.status}
            ifPlayerExists={this.state.player1.ifexists}
          />
          <Playerwait
            id={2}
            name={this.state.player2.name}
            status={this.state.player2.status}
            ifPlayerExists={this.state.player2.ifexists}
          />
          <Playerwait
            id={3}
            name={this.state.player3.name}
            status={this.state.player3.status}
            ifPlayerExists={this.state.player3.ifexists}
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
          name={this.state.player1.name}
          status={this.state.player1.status}
          ifPlayerExists={this.state.player1.ifexists}
        />
        <Playerwait
          id={2}
          name={this.state.player2.name}
          status={this.state.player2.status}
          ifPlayerExists={this.state.player2.ifexists}
        />
        <Playerwait
          id={3}
          name={this.state.player3.name}
          status={this.state.player3.status}
          ifPlayerExists={this.state.player3.ifexists}
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
