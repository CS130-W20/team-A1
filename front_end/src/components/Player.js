import React, { Component } from "react";
import SortableList from "./SortableList";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";
var currentAnswer = [
  ["Gold", 1],
  ["Crimson", 2],
  ["Hotpink", 3],
  ["Blueviolet", 4],
  ["Cornflowerblue", 5],
  ["Skyblue", 6],
  [("Lightblue", 7)],
  ["Aquamarine", 8],
  ["Burlywood", 0]
];
export class Player extends Component {
  componentWillReceiveProps() {
    this.setState({ roundNo: this.props.round_num });
  }
  constructor(props) {
    super(props);
    this.state = {
      sentences: [
        "My numb head is not working",
        "My nap was too long to be a nap",
        "My night was good",
        "My name is Ghandi",
        "My nephew won the jackpot",
        "My nee hurts",
        "My number is everywhere",
        "My new phone is not working"
      ],
      roundNo: this.props.round_num
    };
  }

  getAnswers = answer => {
    currentAnswer = answer;
    console.log("New current answer is:\n" + currentAnswer);
  };
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
        </p>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>You are a player, please sort the list!</h1>
        <Countdown date={Date.now() + 10000} renderer={this.renderer} />
        <SortableList
          items={this.state.sentences}
          answerupdate={this.getAnswers}
        />
      </div>
    );
  }
}
export default Player;
