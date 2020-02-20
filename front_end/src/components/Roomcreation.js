import React, { Component } from "react";
import SocketContext from "./Context";
import { Route, HashRouter, Link, Redirect } from "react-router-dom";
var Message;
export class Roomcreation1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "Empty",
      redirect: null
    };

    this.handleCREATE_Submit = this.handleCREATE_Submit.bind(this);
    this.handleJOIN_Submit = this.handleJOIN_Submit.bind(this);
    this.handleDESTROY_Submit = this.handleDESTROY_Submit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.props.socket.on("lobby_created", message => {
      Message = message;
      Message["ifowner"] = true;
      this.setState({ redirect: "/Gameroom" });
      console.log(Message);
    });
    this.props.socket.on("lobby_destroyed", message => {
      console.log(message);
    });
    this.props.socket.on("player_error_join", message => {
      console.log(message);
    });
    this.props.socket.on("player_suc_join", message => {
      console.log(message);
    });
    
  }

  updateInput(evt) {
    this.state = { roomname: evt.target.value };
  }

  handleCREATE_Submit(e) {
    let data = {
      username: this.props.socket.id
    };
    this.props.socket.emit("create_room", data);
  }
  handleJOIN_Submit(e) {
    console.log(this.state.roomname);
    let data = {
      room: this.state.roomname,
      username: this.props.socket.id
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
    if (this.state.redirect) {
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
        <label htmlFor="username"></label> <br />
        <input
          name="roomnumber_join"
          type="text"
          onChange={this.updateInput}
        />{" "}
        <r />
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
