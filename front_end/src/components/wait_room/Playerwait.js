import React, { Component } from "react";
// import { Card } from "";
import { Card, CardDeck } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Shimmer from "react-shimmer";
import placeholder from "./../../logo/placeholder.png";

const img = placeholder;
export class Playerwait extends Component {
  state = {
    border: "15px dashed grey"
  };
  componentDidMount() {
    this.setBorder();
  }
  playerstyle = {
    boxSizing: "border-box",
    width: "280px",
    height: "390px",
    border: this.state.border,
    float: "left",
    backgroundColor: "blue",
    color: "white",
    textAlign: "center",
    padding: "10px"
  };
  setBorder = () => {
    if (this.props.status == "Not-Ready") {
      this.setState({ border: "15px dashed red" });
    } else {
      this.setState({ border: "15px dashed green" });
    }
  };
  render() {
    return (
      <div id="player" style={this.playerstyle}>
        {!this.props.ifPlayerExists ? (
          <p></p>
        ) : (
          <div>
            <h4 style={{ backgroundColor: "grey", width: "240" }}>
              {" "}
              Player {this.props.id}
            </h4>
            <img
              src={placeholder}
              style={{ border: "green,dashed" }}
              width={220}
              height={240}
              mode="fit"
            ></img>

            <h3>{this.props.name}</h3>
            {this.props.status == "Not-Ready" ? (
              <h5 style={{ backgroundColor: "red" }}>I'm NOT Ready!</h5>
            ) : (
              <h5 style={{ backgroundColor: "green", width: "240" }}>
                I'm Ready
              </h5>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Playerwait;
// {
//   /* <div>
// <h4>Player {this.props.id}</h4>
// <h5>Name : {this.props.name}</h5>
// <h5>Status : {this.props.status}</h5>
// </div> */
// }
