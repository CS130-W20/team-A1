import React, { Component } from "react";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";
import Leaderboard_ingame from "./Leaderboard_ingame";
import Answerboard from "./Answerboard";
import SocketContext from "../pre_gameroom/Context";
var message;
export class Roundend1 extends Component {
  state = {
    Message: this.props.location.state.Message, //This message is passed in from the player or the prompter to use in this page
    Redirect_Message: this.props.location.state.Redirect_Message, //This is the redirect message will be passed down to the next page
    // Redirect_Message_Continue: this.props.location.state.Redirect_Message,
    if_game_over: false,
    if_prompter: false,
    redirect: null
    // round_num:this.props.location.state.Message['round_no']
  };
  componentDidMount() {
    this.game_startCommand_listener();
  }
  redirect_to_game_over = () => {
    return (
      <Redirect
        to={{
          pathname: "/Gameroom",
          state: {
            m: this.state.Redirect_Message
          }
        }}
      />
    );
  };
  start_newround_request = () => {
    let data = {
      room: this.props.location.state.Message["room"],
      id: this.props.location.state.Message["myId"]
    };
    console.log("Sending start round request!");
    this.props.socket.emit("start_new_round", data);
  };

  game_startCommand_listener = () => {
    this.props.socket.on("new_round_permission", data => {
      console.log("RECEIVED PERMISSION MESSAGE :" + JSON.stringify(data));
      if (data["if_game_over"]) {
        message = data["room_creation_info"];
        message["room"] = message["users"][0].room;
        message["users"] = message["users"].filter(client => {
          return client.id !== this.props.socket.id;
        });

        if (message["owner_id"] == this.props.socket.id) {
          message["ifowner"] = true;
        } else message["ifowner"] = false;

        this.setState({ if_game_over: true });
      } else {
        if (data["prompter"] == this.props.location.state.Message["myId"]) {
          this.setState({ if_prompter: true });
        }
        this.setState({ redirect: "/Playgame" });
      }
    });
  };

  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed && !this.state.if_game_over) {
      // console.log("display time is up and game is not over!");
      this.start_newround_request();
    } else if (this.state.if_game_over) {
      // Render a countdown
      // return <this.redirect_to_game_over />;
    } else {
      return <h1>game completion error occurred </h1>;
    }
  };
  render() {
    if (this.state.if_game_over) {
      return (
        <Redirect
          to={{
            pathname: "/Gameroom",
            state: {
              m: message
            }
          }}
        />
      );
    }
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              message: {
                round_num: this.props.location.state.Message["round_num"],
                room_id: this.props.location.state.Message["room"],
                playerid: this.props.location.state.Message["myId"],
                role: this.state.if_prompter ? "prompter" : "non-prompter"
              }
            }
          }}
        />
      );
    }
    return (
      <div>
        <h1>Round {this.state.Message.round_num} is Over</h1>
        <h1>Your score is : 100</h1>
        <Answerboard
          correct_answer={this.state.Message["correct_answer"]}
        ></Answerboard>

        <h1>LeaderBoard</h1>
        <h1>You Will Be Redirected Soon!</h1>
        <Leaderboard_ingame></Leaderboard_ingame>
        <Countdown date={Date.now() + 9000} onComplete={this.renderer} />
      </div>
    );
  }
}
const Roundend = props => (
  <SocketContext.Consumer>
    {socket => <Roundend1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Roundend;
