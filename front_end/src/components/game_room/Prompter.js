import React, { Component } from "react";
import Searchbox from "./Searchbox";
import Countdown from "react-countdown-now";
import { Redirect } from "react-router-dom";
import SocketContext from "../pre_gameroom/Context";

export class Prompter1 extends Component {
  state = {
    roundNo: this.props.round_num,
    redirect: null,
    Message: {},
    Redirect_Message: this.props.Redirect_Message,
    myId: this.props.myId,
    room: this.props.room
  };

  componentDidMount() {
    this.receive_results_from_server();
  }
  receive_results_from_server = () => {
    this.props.socket.on("send_scores", message => {
      console.log(
        "Received results fom back end [prompter]: " + JSON.stringify(message)
      );
      var Message = {};
      Message = message;
      Message["room"] = this.state.room;
      Message["myId"] = this.state.myId;
      this.setState({
        Message: Message,
        redirect: "/Roundend"
      });
    });
  };

  // Renderer callback with condition
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <h1>Time Is Up! Dude! Are you serious?</h1>;
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
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              Message: this.state.Message
            }
          }}
        />
      );
    } else {
      return (
        <div className="searchbox" style={{ maginTop: "450px" }}>
          {/* <Countdown date={Date.now() + 100000} renderer={this.renderer} /> */}
          <Searchbox
            room={this.props.room}
            myId={this.props.myId}
            style={{ textAlign: "center" }}
          ></Searchbox>
        </div>
      );
    }
  }
}

const Prompter = props => (
  <SocketContext.Consumer>
    {socket => <Prompter1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Prompter;
