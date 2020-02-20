import React, { Component } from "react";
import SortableList from "./SortableList";
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
  state = {
    sentences: [
      "My numb head is not working",
      "My nap was too long to be a nap",
      "My nose is big",
      "My name is Ghandi",
      "My nephew won the jackpot",
      "My nee hurts",
      "My number is everywhere",
      "My new phone is not working"
    ]
  };
  getAnswers = answer => {
    currentAnswer = answer;
    console.log("New current answer is:\n" + currentAnswer);
  };

  render() {
    return (
      <div>
        <h1>You are a player, please sort the list!</h1>
        <SortableList
          items={this.state.sentences}
          answerupdate={this.getAnswers}
        />
      </div>
    );
  }
}
export default Player;
