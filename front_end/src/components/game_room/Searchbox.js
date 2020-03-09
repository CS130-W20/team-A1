import React from "react";
// import axios from "axios";
import SocketContext from "../pre_gameroom/Context";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Searchbox1 extends React.Component {
  state = {
    query: "",
    answers: [],
    showAnswers: false
  };

  componentDidMount() {
    this.receive_results_from_server();
  }
  receive_results_from_server = () => {
    this.props.socket.on("display_suggestions", message => {
      console.log(
        "Received results fom back end (prompter): " + JSON.stringify(message)
      );
      if (message["if_valid"]) {
        var ans = message[this.props.myId + ""];
        this.setState({ answers: ans, showAnswers: true });
      } else {
        alert("bad query try it again");
      }
    });
  };

  send_query_to_server = query => {
    var data = {
      room: this.props.room,
      prompt: query
    };
    this.props.socket.emit("submit_prompt", data);
  };
  onFormSubmit = event => {
    event.preventDefault();
    console.log("query is: ", this.state.query);

    const query = { prompt: this.state.query };
    this.send_query_to_server(query.prompt);
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ query: event.target.value });
  };

  render() {
    if (this.state.showAnswers) {
      var items = this.state.answers.map((item, index) => {
        return (
          <li>
            {index + 1} -- {item}
          </li>
        );
      });
      return (
        <div
          id="results"
          style={{
            backgroundColor: "#0066ff",
            height: "500px",
            width: "800px",
            border: "solid 40px white",
            padding: "20px"
          }}
        >
          <h1 style={{ textAlign: "center" }}>Correct Results</h1>
          <ul style={{ listStyleType: "none", padding: "5px" }}>{items}</ul>
          <h2
            style={{
              textAlign: "center",
              fontStyle: "italic",
              marginTop: "20px",
              color: "white"
            }}
          >
            Other Players Are Guessing , Please Wait!
          </h2>
          <div style={{ textAlign: "center", marginLeft: "60px" }}>
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>Enter a Prompt </h2>
          <br />
          <form
            className="form"
            id="searchForm"
            style={{ textAlign: "center" }}
          >
            <input
              type="text"
              className="input"
              placeholder="Type query here"
              value={this.state.query}
              onChange={this.handleChange}
            ></input>
          </form>

          <br />
          <br />
          <Button
            className="button search-button"
            onClick={this.onFormSubmit}
            size="lg"
            block
          >
            Submit Prompt
          </Button>
        </div>
      );
    }
  }
}
const Searchbox = props => (
  <SocketContext.Consumer>
    {socket => <Searchbox1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Searchbox;
