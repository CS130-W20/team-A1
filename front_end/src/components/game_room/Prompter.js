import React, { Component } from "react";
import Searchbox from "./Searchbox";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";
import SocketContext from "../pre_gameroom/Context";

export class Prompter1 extends Component {
  state = {
    roundNo: this.props.round_num,
    redirect: null,
    if_round_over: this.props.if_round_over
  };

  // Completionist = () => {
  //   this.send_results_to_server();
  // };
  componentDidMount() {
    this.receive_results_from_server();
  }
  receive_results_from_server = () => {
    this.props.socket.on("send_answers", message => {
      console.log("Received results fom back end : " + JSON.stringify(message));
      var Message = {};
      Message = message;
      Message["round_num"] = this.state.roundNo;
      Message["role"] = this.state.role;
      this.redirect_to_result_page(Message);
    });
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
  // Completionist = () => {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/Roundend",
  //         state: {
  //           m: {
  //             result: 1,
  //             round_num: this.state.roundNo,
  //             role: this.state.role
  //           }
  //         }
  //       }}
  //     />
  //   );
  // };

  // Renderer callback with condition
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // return <this.Completionist />;
      // this.send_results_to_server();
      return <h1>Time Is Up, Peers' Responses Are Being Processed</h1>;
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
      <div className="searchbox">
        <h1>You are the prompter, please create a prompt!</h1>
        <Countdown date={Date.now() + 1000000} renderer={this.renderer} />
        <Searchbox></Searchbox>
      </div>
    );
  }
}

const Prompter = props => (
  <SocketContext.Consumer>
    {socket => <Prompter1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Prompter;
