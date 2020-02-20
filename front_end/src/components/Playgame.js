import React, { Component } from "react";
import Player from "./Player";
import Prompter from "./Prompter";
import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";

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
  Completionist = () => {
    return (
      <Redirect
        to={{
          pathname: "/Roundend",
          state: {
            m: {
              result: 1,
              round_num: this.state.round_num,
              role: this.state.role
            }
          }
        }}
      />
    );
  };
  // Renderer callback with condition
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <this.Completionist />;
    } else {
      // Render a countdown
      return (
        <p
          style={{
            color: "white",
            backgroundColor: "grey",
            width: "100px",
            textAlign: "center"
          }}
        >
          {minutes}:{seconds}
        </p>
      );
    }
  };

  render() {
    if (this.state.role == "player") {
      return (
        <div>
          <h1 style={{ margin: "5px", padding: "5px" }}>
            Round {this.state.round_num}/5
          </h1>

          <Countdown date={Date.now() + 10000} renderer={this.renderer} />

          <Player clients={this.state.clients} />
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ margin: "5px", padding: "5px" }}>
            Round {this.state.round_num}/5
          </h1>

          <Countdown date={Date.now() + 10000} renderer={this.renderer} />
          <Prompter clients={this.state.clients} />
        </div>
      );
    }
  }
  // <Player arg={player}
  // />)
}
export default Playgame;
