import React, { Component } from "react";

export class Roomcreation extends Component {
  handleCREATE_Submit(e) {}
  handleJOIN_Submit(e) {}

  buttonStyle = {
    color: "blue",
    backgroundColor: "grey",
    padding: "10px",
    margin: "10px"
  };

  render() {
    return (
      <div style={this.buttonStyle}>
        <form onSubmit={this.handleCREATE_Submit}>
          <label htmlFor="username">Enter a Room Name</label> <br />
          <input id="username" name="roomnumber" type="text" /> <r />
          <button>Create Room</button>
        </form>

        <form onSubmit={this.handleJOIN_Submit}>
          <label htmlFor="username">Enter a Room Name</label> <br />
          <input id="username" name="roomnumber" type="text" /> <r />
          <button>Join Room</button>
        </form>
      </div>
    );
  }
}

export default Roomcreation;
