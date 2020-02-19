import React, { Component } from "react";
import SocketContext from "./Context";

export class Roomcreation1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "Empty"
    };

    this.handleCREATE_Submit = this.handleCREATE_Submit.bind(this);
    this.handleJOIN_Submit = this.handleJOIN_Submit.bind(this);
    this.handleDESTROY_Submit = this.handleDESTROY_Submit.bind(this);
  }

  handleCREATE_Submit(e) {
    let data = {
      room: "meow1",
      username: "omar"
    };
    this.props.socket.emit("create_room", data);
  }
  handleJOIN_Submit(e) {
    let data = {
      room: "meow2",
      username: "joey"
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
    return (
      <div style={this.buttonStyle}>
        <button onClick={this.handleCREATE_Submit}>Create Room</button>
        <label htmlFor="username">Enter a Room Name</label> <br />
        <input
          name="roomnumber_join"
          type="text"
          onChange={this.handleJOIN_Submit}
        />{" "}
        <r />
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

// socket.on("message", function(message) {
//   console.log(message);
// });

// socket.on("lobby_created", function(message) {
//   console.log(message);
// });

// socket.on("lobby_destroyed", function(message) {
//   console.log(message);
// });

// socket.on("player_joined", function(message) {
//   console.log("player " + message + " has joined");
// });
