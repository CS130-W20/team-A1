import React, { Component } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import SocketContext from "./Context";

export class Login1 extends Component {
  componentDidMount() {
    let data = {
      room: "meow1",
      username: "omar"
    };
    this.props.socket.emit("create_room", data);
    this.props.socket.on("lobby_created", function(message) {
      console.log(message);
    });
  }

  render() {
    return (
      <div>
        <h1>Awesome Login Page is coming !</h1>
        <ul className="enterRoom">
          <Link to="/Gameroom">Game Room</Link>;
        </ul>
      </div>
    );
  }
}
const Login = props => (
  <SocketContext.Consumer>
    {socket => <Login1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Login;
