import React, { Component } from "react";
import Roomcreation from "./Roomcreation";

export class Landing extends Component {
  render() {
    return (
      <div>
        <hi>You are authorized , please select from below actions</hi>
        <Roomcreation className="Roombuttons" />
      </div>
    );
  }
}

export default Landing;
