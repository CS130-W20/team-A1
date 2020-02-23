import React, { Component } from "react";
import Player from "./Player";
import Prompter from "./Prompter";
import ReactDOM from "react-dom";

export class Playgame extends Component {
  // tick() {
  //   this.setState(state => ({
  //     round_num: state.round_num + 1
  //   }));
  // }
  // interval = 0;
  // timesRun = 0;
  // componentDidMount() {
  //   this.interval = setInterval(() => {
  //     this.timesRun += 1;
  //     if (this.timesRun === 1) {
  //       clearInterval(this.interval);
  //     }
  //     this.tick();
  //   }, 10000);
  // }

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
          <h1 style={{ margin: "5px", padding: "5px" }}>
            Round {this.state.round_num}/5
          </h1>

          <Player
            clients={this.state.clients}
            round_num={this.state.round_num}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ margin: "5px", padding: "5px" }}>
            Round {this.state.round_num}/5
          </h1>
          <Prompter
            clients={this.state.clients}
            round_num={this.state.round_num}
          />
        </div>
      );
    }
  }
  // <Player arg={player}
  // />)
}
export default Playgame;
