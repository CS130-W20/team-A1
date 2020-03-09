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

    // if_game_over: false,
    myId: this.props.myId,
    if_received_questions: this.props.if_received_questions,
    if_submitted_answer: false,
    redirect: null,
    Message: {},
    Redirect_Message: this.props.Redirect_Message,
    room: this.props.room,
    displayTimer: "",
    displayProcess: "none"
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
    this.props.socket.emit("submit_answer", data);
    this.setState({ if_submitted_answer: true });
  };
  receive_results_from_server = () => {
    this.props.socket.on("send_scores", message => {
      var Message = {};
      Message = message;
      Message["room"] = this.state.room;
      Message["myId"] = this.state.myId;
      console.log(
        "Player Received results from the server:" + JSON.stringify(Message)
      );
      if (this.state.if_submitted_answer) {
        this.setState({
          Message: Message,
          redirect: "/Roundend"
        });
      } else {
        alert("invalid route after round!");
      }
    });
  };

  receive_questions_from_server = () => {
    this.props.socket.on("display_suggestions", message => {
      console.log(
        "Received questions from the server:" + JSON.stringify(message)
      );
      var my_questions = message[this.state.myId + ""];
      this.setState({ sentences: my_questions, if_received_questions: true });
    });
  };

  // Renderer callback with condition
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      this.setState({ displayTimer: "none", displayProcess: "" });
      this.send_results_to_server();
      //this.setState({ if_round_over: true });
      return <div></div>;
    } else {
      return (
        <>
          <h1
            id="response_process"
            style={{ display: this.state.displayProcess }}
          >
            Time Is Up, Your Response Is Being Processed
          </h1>
          <div id="sort_list" style={{ display: this.state.displayTimer }}>
            <h1 style={{ margin: "5px", padding: "5px" }}>
              Round {this.state.round_num}/4
            </h1>
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
            <h1>You are a player, please sort the list!</h1>
            <SortableList
              items={this.state.sentences}
              answerupdate={this.getAnswers}
            />
          </div>
        </>
      );
    }
  };

  render() {
    if (this.state.redirect) {
      // console.log("Redirecting to " + this.state.redirect);
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              Message: this.state.Message
              // Redirect_Message: this.state.Redirect_Message
            }
          }}
        />
      );
    } else if (this.state.if_received_questions && !this.if_submitted_answer) {
      // console.log("we received qustions ! countdown starts now!");
      return <Countdown date={Date.now() + 13000} renderer={this.renderer} />;
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
