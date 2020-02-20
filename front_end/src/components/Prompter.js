import React, { Component } from "react";
import Searchbox from "./Searchbox";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";

export class Prompter extends Component {
  componentWillReceiveProps() {
    this.setState({ roundNo: this.props.round_num });
  }

  constructor(props) {
    super(props);
    this.state = {
      roundNo: this.props.round_num
    };
  }

  Completionist = () => {
    return (
      <Redirect
        to={{
          pathname: "/Roundend",
          state: {
            m: {
              result: 1,
              round_num: this.state.roundNo,
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
          <h1>Round Num is: {this.state.roundNo}</h1>
        </p>
      );
    }
  };
  render() {
    return (
      <div className="searchbox">
        <h1>You are the prompter, please create a prompt!</h1>
        <Countdown date={Date.now() + 10000} renderer={this.renderer} />
        <Searchbox></Searchbox>
      </div>
    );
  }
}

export default Prompter;
