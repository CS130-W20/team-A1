import React, { Component } from "react";
import Searchbox from "./Searchbox";

export class Prompter extends Component {
  render() {
    return (
      <div className="searchbox">
        <h1>You are the prompter, please create a prompt!</h1>
        <Searchbox></Searchbox>
      </div>
    );
  }
}

export default Prompter;
