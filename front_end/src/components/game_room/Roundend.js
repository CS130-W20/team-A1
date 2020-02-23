import React, { Component } from "react";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";

export class Roundend extends Component {
  M = this.props.location.state.m;
  Path = "/Playgame/" + this.M.role;
  Completionist = () => {
    return (
      <Redirect
        to={{
          pathname: this.Path,
          state: {
            m: { result: 1, round_num: this.props.location.state.round_num }
          }
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
      return <p></p>;
    }
  };
  render() {
    return (
      <div>
        <h1>Round {this.M.round_num} is Over</h1>
        <h1>Result is : {this.M.result}</h1>
        <h1>Your score is : 100</h1>
        <h1>A new round will start once the timer is off</h1>
        <Countdown date={Date.now() + 5000} renderer={this.renderer} />
      </div>
    );
  }
}

export default Roundend;
