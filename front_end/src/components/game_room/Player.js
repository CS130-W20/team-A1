import React, { Component } from "react";
import SortableList from "./SortableList";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";
import SocketContext from "../pre_gameroom/Context";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Spinner } from "react-bootstrap";
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
    console.log("Submitting results to server [player]: ");
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
          <div
            id="response_process"
            style={{ display: this.state.displayProcess, margin: " 0 auto" }}
          >
            <h1>Time Is Up, Your Response Is Being Processed...</h1>

            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
          </div>

          <div id="sort_list" style={{ display: this.state.displayTimer }}>
            <h1 style={{ textAlign: "center" }}>Please Sort the List!</h1>
            <p
              style={{
                color: "white",
                backgroundColor: "darkBlue",
                width: "130px",
                textAlign: "center",
                margin: "auto",
                // marginLeft: "100px",
                borderRadius: "20px",
                borderColor: "darkBlue"
              }}
            >
              {minutes}:{seconds}
            </p>

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
      return <Countdown date={Date.now() + 20000} renderer={this.renderer} />;
    } else {
      return (
        <div style={{ marginTop: "50px" }}>
          <div style={{ textAalign: "center" }}>
            <p
              style={{
                fontWeight: "bold",
                color: "white",
                paddingTop: "50px"
              }}
            >
              Waiting For the Prompter To Propose A Query !{" "}
            </p>
          </div>
          <div
            style={{
              display: "inline-block",
              textAalign: "center"
            }}
          >
            {" "}
          </div>
          <div style={{ textAalign: "center", marginLeft: "80px" }}>
            <Loader
              type="Watch"
              color="White"
              height={400}
              width={400}
              timeout={100000} //3 secs
            />
          </div>
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
