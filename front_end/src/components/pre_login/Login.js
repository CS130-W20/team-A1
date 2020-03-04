import React, { Component } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Bootstrap from "react-bootstrap";
import SocketContext from "./Context";
import axios from "axios";
import SocketContext from "../pre_gameroom/Context";

// Autho0 make form for login
// Login on backend sends data to backend { user, password, etc}
export class Login1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("Handling submit: ", event);
    console.log("state: ", this.state);
    let obj = {};
    obj.username = this.state.email;
    obj.password = this.state.password;

    axios({
      method: "POST",
      url: "/login",
      data: obj,
      headers: {
        "Content-Type": "application/json"
      }
    })
      // axios.post('/login', JSON.stringify({
      //   username: this.state.email,
      //   password: this.state.password
      // }))
      .then(function(response) {
        console.log("response: ", response);
      })
      .catch(function(error) {
        console.log("error: ", error);
      });
    // TODO Send state to backend.
  };
  // Send to game room
  // reroute to game room.
  // TODO: Implement using this function...
  // async function handleSubmit(event) {
  //   event.preventDefault();

  //   try {
  //     await Auth.signIn(email, password);
  //     alert("Logged in");
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // }

  // TODO: Add Async call to to it with try catch loop
  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            className="bigbutton"
          >
            Login1
          </Button>
        </Form>
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
