import React, { Component } from "react";

export class Roomcreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "Empty"
    };

    this.handleCREATE_Submit = this.handleCREATE_Submit.bind(this);
    this.handleJOIN_Submit = this.handleJOIN_Submit.bind(this);
  }

  handleCREATE_Submit(e) {
    const Roomname = e.target.roomnumber_create.value;
    this.setState({ roomname: Roomname });
  }
  handleJOIN_Submit(e) {
    const Roomname = e.target.roomnumber_join.value;
    this.setState({ roomname: Roomname });
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
        <form onSubmit={this.handleCREATE_Submit}>
          <label htmlFor="username">Enter a Room Name</label> <br />
          <input name="roomnumber_create" type="text" /> <r />
          <button>Create Room</button>
        </form>

        <form onSubmit={this.handleJOIN_Submit}>
          <label htmlFor="username">Enter a Room Name</label> <br />
          <input name="roomnumber_join" type="text" /> <r />
          <button>Join Room</button>
        </form>
      </div>
    );
  }
}

export default Roomcreation;
