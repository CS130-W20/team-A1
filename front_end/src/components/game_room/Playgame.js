import React, { Component } from "react";
import Player from "./Player";
import Prompter from "./Prompter";
// import ReactDOM from "react-dom";
import SocketContext from "../pre_gameroom/Context";

export class Playgame1 extends Component {
  state = {
    clients: [
      { id: 1, role: "non-prompter", name: "Joker1" },
      { id: 2, role: "non-prompter", name: "Joker2" },
      { id: 3, role: "non-prompter", name: "Joker3" }
    ],
    if_round_over: false,
    round_num: this.props.location.state.message.round_num,
    room_id: this.props.location.state.message.room_id,
    playerid: this.props.location.state.message.playerid,
    role: this.props.location.state.message.role,
    Redirect_Message: this.props.location.state.Redirect_Message
  };

  render() {
    if (this.state.role == "non-prompter") {
      return (
        <div>
          <h1 style={{ margin: "5px", padding: "5px" }}>
            Round {this.state.round_num}/5
          </h1>

          <Player
            clients={this.state.clients}
            round_num={this.state.round_num}
            if_round_over={this.state.if_round_over}
            room={this.state.room_id}
            myId={this.state.playerid}
            Redirect_Message={this.state.Redirect_Message}
          />
        </div>
      );
    } else if (this.state.role == "prompter") {
      return (
        <div>
          <h1 style={{ margin: "5px", padding: "5px" }}>
            Round {this.state.round_num}/5
          </h1>
          <Prompter
            clients={this.state.clients}
            round_num={this.state.round_num}
            if_round_over={this.state.if_round_over}
            room={this.state.room_id}
            myId={this.state.playerid}
            Redirect_Message={this.state.Redirect_Message}
          />
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
