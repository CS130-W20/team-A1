import React, { Component } from "react";
import SocketContext from "./Context";
import { Route, HashRouter, Link, Redirect } from "react-router-dom";
var Message;
export class Roomcreation1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "Empty",
      redirect: null,
      ifWrongRoomName: false
    };

    this.handleCREATE_Submit = this.handleCREATE_Submit.bind(this);
    this.handleJOIN_Submit = this.handleJOIN_Submit.bind(this);
    this.handleDESTROY_Submit = this.handleDESTROY_Submit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.props.socket.on("lobby_created", message => {
      Message = message;
      Message["ifowner"] = true;
      Message["room"] = message["users"][0].room;
      Message["users"] = Message["users"].filter(client => {
        return client.id !== this.props.socket.id;
      });
      this.setState({ ifWrongRoomName: false });
      this.setState({ redirect: "/Gameroom" });
      console.log(Message);
    });
    //Missing: room error created !
    this.props.socket.on("lobby_destroyed", message => {
      console.log(message);
    });
    this.props.socket.on("player_error_join", message => {
      this.setState({ ifWrongRoomName: true });
    });
    this.props.socket.on("player_suc_join", message => {
      Message = message;
      Message["ifowner"] = false;
      Message["room"] = message["users"][0].room;
      // alert(
      //   "player joined successfully! the message is: " + JSON.stringify(Message)
      // );

      Message["users"] = Message["users"].filter(client => {
        return client.id !== this.props.socket.id;
      });
      this.setState({ ifWrongRoomName: false });
      this.setState({ redirect: "/Gameroom" });

      console.log(message);
    });
  }

  updateInput(evt) {
    this.state = { roomname: evt.target.value };
  }

  handleCREATE_Submit(e) {
    let data = {
      id: this.props.socket.id
    };
    this.props.socket.emit("create_room", data);
  }
  handleJOIN_Submit(e) {
    console.log(this.state.roomname);
    let data = {
      room: this.state.roomname,
      id: this.props.socket.id
    };
    this.props.socket.emit("join_room", data);
  }

  //Currently only works for omar username, testcase until front end form submission
  //to server is set up (so server can get name of lobby to leave.)
  handleDESTROY_Submit(e) {
    let data = {
      room: "dummy1",
      username: "omar"
    };
    this.props.socket.emit("destroy_room", data);
  }

  buttonStyle = {
    color: "blue",
    backgroundColor: "grey",
    padding: "10px",
    margin: "10px"
  };

  render() {
    if (this.state.redirect && !this.ifWrongRoomName) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { m: Message }
          }}
        />
      );
    }
    return (
      <div style={this.buttonStyle}>
        <button onClick={this.handleCREATE_Submit}>Create Room</button>
        <br />
        <h4>Enter Room Name:</h4>
        {!this.state.ifWrongRoomName ? (
          <p></p>
        ) : (
          <h2>Invalid Room Name , Try Again!</h2>
        )}
        <input
          name="roomnumber_join"
          type="text"
          onChange={this.updateInput}
        ></input>
        <button placeholder="room number" onClick={this.handleJOIN_Submit}>
          Join Room
        </button>
      </div>
    );
  }
}
const Roomcreation = props => (
  <SocketContext.Consumer>
    {socket => <Roomcreation1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Roomcreation;
