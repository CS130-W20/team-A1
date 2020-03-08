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
    // Redirect_Message: this.props.location.state.Redirect_Message, //This is the redirect message will be passed down to the next page
    // Redirect_Message_Continue: this.props.location.state.Redirect_Message,
    if_game_over: false,
    if_prompter: false,
    redirect: null,
    round_num: 1
    // round_num:this.props.location.state.Message['round_no']
  };
  componentDidMount() {
    this.game_startCommand_listener();
  }

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
        this.setState({
          round_num: data["round_number"],
          redirect: "/Playgame"
        });
      }
    });
  };

  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed && !this.state.if_game_over) {
      this.start_newround_request();
    } else if (this.state.if_game_over) {
      // Render a countdown
      return <h1>Game Over</h1>;
    } else {
      return <h1>game completion error occurred </h1>;
    }
  };
  render() {
    // console.log(
    //   "The message passed in is:" + JSON.stringify(this.state.Message)
    // );
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
                round_num: this.state.round_num,
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
        <h1>Round {this.state.round_num} is Over</h1>
        <h1>
          Your Round Score Is --
          {this.state.Message["user_results"].find(
            userResult => userResult["id"] === this.props.socket.id + ""
          )
            ? this.state.Message["user_results"].find(
                userResult => userResult["id"] === this.props.socket.id + ""
              )["current_score"]
            : "000"}
          /100
        </h1>
        <Answerboard
          correct_answer={this.state.Message["correct_answer"]}
          //Missing: the current user's orderings should be passed in as well
          // my_results={}
        ></Answerboard>

        <h1>LeaderBoard</h1>
        <Leaderboard_ingame results={this.state.Message["user_results"]}>
          {/* We need to pass in [{id:0,name:"ha",current_score:1,total_score:2},{id:1,name:"ha",current_score:1,total_score:2},{id:2,name:"ha",current_score:1,total_score:2}] */}
        </Leaderboard_ingame>
        <Countdown
          date={Date.now() + 60000}
          onComplete={this.renderer}
          style={{ display: "none" }}
        />
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

// #Create a list with the user results.
// user_results = []
// for i in game_rooms[room]['clients']:
//     user_results.append({'id':i, 'total_score':total_scores[i], 'current_score':round_scores[i]})

// #Get the game_status
// game_over = not game.get_game_status()

// #Make the message from these components.
// Message = {'correct_answer':correct_answers, 'user_results':user_results}
