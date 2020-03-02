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
    sentences: [],
    roundNo: this.props.round_num,
    if_round_over: this.props.if_round_over,
    myId: this.props.myId,
    if_received_questions: false,
    redirect: null,
    Message: {},
    Redirect_Message: this.props.Redirect_Message
  };
  componentDidMount() {
    this.receive_results_from_server();
    this.receive_questions_from_server();
  }
  getAnswers = answer => {
    currentAnswer = answer;
  };

  send_results_to_server = () => {
    var data = {
      room: this.props.room,
      answers: currentAnswer,
      id: this.state.myId
    };
    //alert("Sending answers to the server: " + JSON.stringify(data));
    this.props.socket.emit("submit_answer", data);
  };
  receive_results_from_server = () => {
    this.props.socket.on("send_scores", message => {
      console.log(
        "Received results from back end [player]: " + JSON.stringify(message)
      );
      var Message = {};
      Message = message;
      Message["round_num"] = this.state.roundNo;
      Message["role"] = this.state.role;

      this.setState({ Message: Message, redirect: "/Roundend" });
    });
  };

  receive_questions_from_server = () => {
    this.props.socket.on("display_suggestions", message => {
      var my_questions = message[this.state.myId + ""];
      this.setState({ sentences: my_questions, if_received_questions: true });
    });
  };

  // Renderer callback with condition
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      this.send_results_to_server();
      //this.setState({ if_round_over: true });
      return <h1>Time Is Up, Your Response Is Being Processed</h1>;
    } else {
      // Render a countdown
      return (
        <div id="sort_list">
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
          {/* <Countdown date={Date.now() + 5000} renderer={this.renderer} /> */}
          <h1>You are a player, please sort the list!</h1>
          <SortableList
            items={this.state.sentences}
            answerupdate={this.getAnswers}
          />
        </div>
      );
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/Roundend",
            state: {
              Message: this.state.Message,
              Redirect_Message: this.state.Redirect_Message
            }
          }}
        />
      );
    } else if (this.state.if_received_questions) {
      return <Countdown date={Date.now() + 10000} renderer={this.renderer} />;
    } else {
      return (
        <div>
          <h1>Waiting For the Prompter!</h1>
        </div>
      );
    }
  }
}

const Player = props => (
  <SocketContext.Consumer>
    {socket => <Player1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Player;
