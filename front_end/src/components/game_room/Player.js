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
    this.receive_questions_from_server();
  }
  getAnswers = answer => {
    currentAnswer = answer;
    // console.log("New current answer is:\n" + currentAnswer);
  };
  // Completionist = () => {
  //   this.send_results_to_server();
  // };

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
    this.props.socket.on("send_answers", message => {
      console.log(
        "Received results from back end : " + JSON.stringify(message)
      );
      var Message = {};
      Message = message;
      Message["round_num"] = this.state.roundNo;
      Message["role"] = this.state.role;
      this.redirect_to_result_page(Message);
    });
  };

  receive_questions_from_server = () => {
    // . {‘user1’:[List of suggestions in order], ‘user2’:[List of suggestions in order], ‘user3’:[List of suggestions in order], ‘prompter’ [List of real suggestions in order]}
    this.props.socket.on("display_suggestions", message => {
      alert("The questions received from the server is:", message);
      // var my_questions =
      // var my_questions = message[this.state.myId + ""];
      // this.setState({ sentences: my_questions });
    });
  };

  // user_results.append({'id':i, 'total_score':total_scores[i], 'current_score':round_scores[i]})

  // #Get the game_status
  // game_over = not game.get_game_status()

  // #Make the message from these components.
  // Message = {'correct_answer':correct_answers, 'user_results':user_results, 'if_game_over':game_over}
  // {
  //   result: 1,
  //   round_num: this.state.roundNo,
  //   role: this.state.role
  // }

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
  // Completionist = () => {
  //   this.send_results_to_server();
  // };
  // Renderer callback with condition
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // return <this.Completionist />;
      //this.send_results_to_server();
      this.setState({ if_round_over: true });
      return <h1>Time Is Up, Your Response Is Being Processed</h1>;
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
    if (this.state.if_round_over) {
      return <Countdown date={Date.now() + 5000} renderer={this.renderer} />;
    } else {
      return (
        <div>
          <h1>You are a player, please sort the list!</h1>
          <Countdown date={Date.now() + 5000} renderer={this.renderer} />
          <SortableList
            items={this.state.sentences}
            answerupdate={this.getAnswers}
          />
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
