import React, { Component } from "react";
import SortableList from "./SortableList";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";
import SocketContext from "../pre_gameroom/Context";
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
export class Player1 extends Component {
  state = {
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

    roundNo: this.props.round_num,
    if_round_over: this.props.if_round_over,
    myId: this.props.myId
  };
  componentDidMount() {
    this.receive_results_from_server();
  }
  getAnswers = answer => {
    currentAnswer = answer;
    console.log("New current answer is:\n" + currentAnswer);
  };
  Completionist = () => {
    this.send_results_to_server();
  };

  send_results_to_server = () => {
    var data = {
      room: this.props.room,
      answers: currentAnswer,
      id: this.state.myId
    };
    this.props.socket.emit("submit_answer", data);
  };
  receive_results_from_server = () => {
    this.props.socket.on("send_answers", message => {
      console.log("Received results fom back end : " + JSON.stringify(message));
      var Message = {};
      Message = message;
      Message["round_num"] = this.state.roundNo;
      Message["role"] = this.state.role;
      this.redirect_to_result_page(Message);
    });

    // {
    //   result: 1,
    //   round_num: this.state.roundNo,
    //   role: this.state.role
    // }
  };

  redirect_to_result_page = Message => {
    return (
      <Redirect
        to={{
          pathname: "/Roundend",
          state: Message
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

const Player = props => (
  <SocketContext.Consumer>
    {socket => <Player1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Player;
