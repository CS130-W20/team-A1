import React, { Component } from "react";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";

export class Facebooklogin extends Component {
  state = {
    if_authorized: false,
    response: {}
  };
  responseFacebook = response => {
    // console.log(response);
    // if (response.status === "connected") {
    //   return <h1>You are authorized through FB</h1>;
    // }
    this.setState({ if_authorized: true, response: response });
  };
  componentClicked = response => {
    console.log("something is clicked " + response);
  };
  render() {
    if (this.state.if_authorized) {
      return (
        <h1>Hello {this.state.response.name} you are authorized through FB</h1>
      );
    } else {
      return (
        <div>
          <h1>Login with facebook ? Easy!</h1>
          <FacebookLogin
            appId="*****"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </div>
      );
    }
  }
}

export default Facebooklogin;
