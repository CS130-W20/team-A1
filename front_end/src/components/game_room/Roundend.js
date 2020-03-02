import React, { Component } from "react";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";
import Leaderboard_ingame from "./Leaderboard_ingame";
import Answerboard from "./Answerboard";

export class Roundend extends Component {
  // Path = "/Playgame/" + this.M.role;
  path = "/Gameroom";
  state = {
    Message: this.props.location.state.Message,
    Redirect_Message: this.props.location.state.Redirect_Message
  };
  Completionist = () => {
    return (
      <Redirect
        to={{
          pathname: "/Gameroom",
          state: { m: this.state.Redirect_Message }
        }}
      />
    );
  };
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <this.Completionist />;
    } else {
      // Render a countdown
      return <p>No Time No Fun</p>;
    }
  };
  render() {
    return (
      <div>
        <h1>Round {this.state.Message.round_num} is Over</h1>
        {/* <h1 style={{ textAlign: "center" }}>Results Are</h1> */}
        <h1>Your score is : 100</h1>
        <Answerboard
          correct_answer={this.state.Message["correct_answer"]}
        ></Answerboard>
        {/* <h1>
          Passed in correct answe is: {JSON.stringify(this.state.Message)}
        </h1> */}

        <h1>LeaderBoard</h1>
        <h1>You Will Be Redirected Soon!</h1>
        <Leaderboard_ingame></Leaderboard_ingame>
        <Countdown date={Date.now() + 9000} renderer={this.renderer} />
      </div>
    );
  }
}

export default Roundend;
