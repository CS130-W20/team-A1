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
    this.updateInput = this.updateInput.bind(this);
    this.props.socket.on("lobby_created", function(message) {
      console.log(message);
    });
    this.props.socket.on('lobby_destroyed', function (message) {
      console.log(message);
    });
    this.props.socket.on('player_joined', function (message) {
      console.log("player " + message + " has joined");
    });
  }

  
  

  updateInput(evt){
    this.state={roomname: evt.target.value};   
  }
   
 

  handleCREATE_Submit(e) {
      let data = {
          "username": "omar"
      };
      this.props.socket.emit("create_room", data);

  }
  handleJOIN_Submit(e) {
    console.log(this.state.roomname)
    let data = {
          "room": this.state.roomname,
          "username": "joey"
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
          onChange={this.updateInput}
        />{" "}
        <r />
        <button onClick={this.handleJOIN_Submit}>Join Room</button>
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
