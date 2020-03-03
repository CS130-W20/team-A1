import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import Playerwait from "./Playerwait";
import { ButtonToolbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export class Otherplayers extends Component {
  LeaveRoomHandle = this.props.LeaveRoomHandle;
  startPermission = this.props.startPermission;
  ToggleReady = this.props.ToggleReady;

  toggle_style_Notready = {
    backgroundColor: "red",
    color: "white",
    width: "90px",
    height: "30px",
    margin: "10px"
  };
  toggle_style_Ready = {
    backgroundColor: "Green",
    color: "white",
    width: "90px",
    height: "30px",
    margin: "10px"
  };

  componentWillReceiveProps() {
    this.setState({ ifready: this.props.ifready });
    this.setState({ Message: this.props.Message });
    this.setState({ player1: this.props.player1 });
    this.setState({ player2: this.props.player2 });
    this.setState({ player2: this.props.player3 });
  }
  render() {
    const toggle_style = this.props.ifready
      ? this.toggle_style_Notready
      : this.toggle_style_Ready;
    const toggle_word = this.props.ifready ? "Not Ready" : "Ready";

    if (this.props.Ifowner)
      return (
        <div>
          <h1> Room name: {this.props.Message.room}</h1>
          <h2>Player name:{this.props.myId}</h2>
          <h3>You own the room </h3>
          <div
            id="buttons_own"
            style={{
              backgroundColor: "#f4897b",
              height: "300px",
              width: "300px",
              padding: "40px",
              margin: "40px"
            }}
          >
            <NavLink exact to="/">
              Home
            </NavLink>
            <br />
            <Button
              variant={this.props.if_all_ready ? "success" : "secondary"}
              size="lg"
              disabled={!this.props.if_all_ready}
              onClick={this.startPermission}
            >
              Start Game
            </Button>{" "}
            <Button variant="primary" size="lg" onClick={this.LeaveRoomHandle}>
              Leave Room
            </Button>{" "}
            <Button
              variant={!this.props.ifready ? "success" : "danger"}
              size="lg"
              onClick={this.ToggleReady}
            >
              {" "}
              {toggle_word}
            </Button>
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
            name={this.props.player1.name}
            status={this.props.player1.status}
            ifPlayerExists={this.props.player1.ifexists}
          />
          <Playerwait
            id={2}
            name={this.props.player2.name}
            status={this.props.player2.status}
            ifPlayerExists={this.props.player2.ifexists}
          />
          <Playerwait
            id={3}
            name={this.props.player3.name}
            status={this.props.player3.status}
            ifPlayerExists={this.props.player3.ifexists}
          />
        </div>
      );

    return (
      <div id="gameRoom_player">
        <h1>Room name: {this.props.Message.room}</h1>
        <h2>Player name:{this.props.myId}</h2>
        <h3>Happy Gaming</h3>
        <div
          id="buttons"
          style={{
            backgroundColor: "#f4897b",
            height: "300px",
            width: "300px",
            padding: "40px",
            margin: "40px"
          }}
        >
          <Link to="/">
            <button>Home</button>
          </Link>
          <br />
          <Button variant="primary" size="lg" onClick={this.LeaveRoomHandle}>
            Leave Room
          </Button>{" "}
          <br />
          <Button
            variant={!this.props.ifready ? "success" : "danger"}
            size="lg"
            onClick={this.ToggleReady}
          >
            {" "}
            {toggle_word}
          </Button>
        </div>
        <div
          id="currentUser1"
          style={{
            backgroundColor: "grey",
            height: "200px",
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
          name={this.props.player1.name}
          status={this.props.player1.status}
          ifPlayerExists={this.props.player1.ifexists}
        />
        <Playerwait
          id={2}
          name={this.props.player2.name}
          status={this.props.player2.status}
          ifPlayerExists={this.props.player2.ifexists}
        />
        <Playerwait
          id={3}
          name={this.props.player3.name}
          status={this.props.player3.status}
          ifPlayerExists={this.props.player3.ifexists}
        />
      </div>
    );
  }
}

export default Otherplayers;
