import React, { Component } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import SocketContext from "../pre_gameroom/Context";
import FacebookLogin from "react-facebook-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
export class Login1 extends Component {
  // componentDidMount() {
  data = {
    room: "meow1",
    username: "omar"
  };
  // state = {};
  responseFacebook = response => {
    console.log(response);
  };
  componentClicked = response => {
    console.log(response);
  };
  // this.props.socket.emit("create_room", data);
  // this.props.socket.on("lobby_created", function(message) {
  //   console.log(message);
  // });

  render() {
    return (
      <div>
        <h1>Awesome Login Page is coming !</h1>

        <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />

        <ul className="enterRoom">
          <Link to="/Landing">Game Page</Link>
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
