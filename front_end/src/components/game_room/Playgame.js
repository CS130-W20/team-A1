import React, { Component } from "react";
import Player from "./Player";
import Prompter from "./Prompter";
// import ReactDOM from "react-dom";
import SocketContext from "../pre_gameroom/Context";
import Footbar from "../pre_login/Footbar";

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
          <Player
            clients={this.state.clients}
            round_num={this.state.round_num}
            room={this.state.room_id}
            myId={this.state.playerid}
            if_received_questions={false}
          />
          <Footbar></Footbar>
        </div>
      );
    } else if (this.state.role == "prompter") {
      return (
        <div>
          <h1 style={{ margin: "5px", padding: "5px" }}>
            Round {this.state.round_num}/4
          </h1>
          <Prompter
            clients={this.state.clients}
            round_num={this.state.round_num}
            room={this.state.room_id}
            myId={this.state.playerid}
          />
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
