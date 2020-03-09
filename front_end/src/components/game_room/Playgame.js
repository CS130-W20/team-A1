import React, { Component } from "react";
import Player from "./Player";
import Prompter from "./Prompter";
// import ReactDOM from "react-dom";
import SocketContext from "../pre_gameroom/Context";
import Footbar from "../pre_login/Footbar";
import GameroomNavbar from "./GameroomNavbar";

export class Playgame1 extends Component {
  state = {
    round_num: this.props.location.state.message.round_num,
    room_id: this.props.location.state.message.room_id,
    playerid: this.props.location.state.message.playerid,
    role: this.props.location.state.message.role
  };

  render() {
    if (this.state.role == "non-prompter") {
      return (
        <div>
          <GameroomNavbar
            room={this.state.room_id}
            role={"Guesser"}
            round={this.state.round_num}
            style={{ marginBottom: "50px" }}
          />
          <div style={{ marginTop: "100px" }}>
            <Player
              clients={this.state.clients}
              round_num={this.state.round_num}
              room={this.state.room_id}
              myId={this.state.playerid}
              if_received_questions={false}
              style={{ marginTop: "100px" }}
            />
          </div>
          <Footbar></Footbar>
        </div>
      );
    } else if (this.state.role == "prompter") {
      return (
        <div>
          <GameroomNavbar
            room={this.state.room_id}
            role={"Prompter"}
            round={this.state.round_num}
            style={{ marginBottom: "50px" }}
          />
          <div style={{ marginTop: "200px" }}>
            <Prompter
              clients={this.state.clients}
              round_num={this.state.round_num}
              room={this.state.room_id}
              myId={this.state.playerid}
              style={{ marginTop: "100px" }}
            />
          </div>
          <Footbar></Footbar>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Incorrect role !!!</h1>
        </div>
      );
    }
  }
}

const Playgame = props => (
  <SocketContext.Consumer>
    {socket => <Playgame1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Playgame;
