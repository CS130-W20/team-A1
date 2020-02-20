import React, { Component } from "react";
import Player from "./Player";
import Prompter from "./Prompter";

export class Playgame extends Component {
  state = {
    clients: [
      { id: 1, role: "non-prompter", name: "Joker1" },
      { id: 2, role: "non-prompter", name: "Joker2" },
      { id: 3, role: "non-prompter", name: "Joker3" }
    ],
    roundover: false,
    round_num: 1,
    room_id: 0,
    playerid: 1111,
    role: "player"
  };
  extractParam() {
    console.log("My role is" + this.props.match.params.role);
  }
  render() {
    if (this.state.role == "player") {
      return (
        <div>
          <Player clients={this.state.clients} />
        </div>
      );
    } else {
      return (
        <div>
          <Prompter clients={this.state.clients} />
        </div>
      );
    }
  }
  // <Player arg={player}
  // />)
}
export default Playgame;
