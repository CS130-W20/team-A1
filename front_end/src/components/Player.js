import React, { Component } from "react";
import SortableList from "./SortableList";
export class Player extends Component {
  state = {
    sentences: [
      "Gold",
      "Crimson",
      "Hotpink",
      "Blueviolet",
      "Cornflowerblue",
      "Skyblue",
      "Lightblue",
      "Aquamarine",
      "Burlywood"
    ]
  };

  render() {
    return (
      <div>
        <h1>You are a player, please sort the list!</h1>

        <SortableList items={this.state.sentences} />
      </div>
    );
  }
}
export default Player;
