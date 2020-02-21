import React, { Component } from "react";

export class Playerwait extends Component {
  state = {
    ifPlayerExists: this.props.ifPlayerExists,
    name: this.props.name,
    status: this.props.status,
    id: this.props.id
  };

  componentWillReceiveProps() {
    this.setState({ ifPlayerExists: this.props.ifPlayerExists });
    this.setState({ name: this.props.name });
    this.setState({ status: this.props.status });
    this.setState({ id: this.props.id });
  }
  playerstyle = {
    boxSizing: "border-box",
    width: "250px",
    height: "290px",
    border: "5px solid red",
    float: "left",
    backgroundColor: "blue",
    color: "white",
    textAlign: "center"
  };
  render() {
    return (
      <div id="player" style={this.playerstyle}>
        {!this.state.ifPlayerExists ? (
          <p></p>
        ) : (
          <div>
            <h4>Player {this.props.id}</h4>
            <h5>Name : {this.props.name}</h5>
            <h5>Status : {this.props.status}</h5>
          </div>
        )}
      </div>
    );
  }
}

export default Playerwait;
