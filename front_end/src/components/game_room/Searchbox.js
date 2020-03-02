import React from "react";
import axios from "axios";

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      answers: [],
      showAnswers: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(event) {
    // submits the given state to server and receives the answers
    console.log("query is: ", this.state.query);
    event.preventDefault();
    const query = { query: this.state.query };
    // const url = '127.0.0.1:8000/query/';
    axios
      .get("/query/", { params: query })
      .then(data => {
        const received = JSON.stringify(data);
        console.log("Data received: ", received);
        this.setState({ answers: received.data, showAnswers: true });
      })
      .catch(err => {
        if (err) {
          console.log("Error in get", err);
          this.setState({ answers: ["errors only"] });
        }
      });
  }

  handleChange(event) {
    event.preventDefault();
    console.log("Handle change called");
    this.setState({ query: event.target.value });
  }

  // Render the searchterms in side
  // TODO: Will need to use map() to render the list of answers, each of <item> type
  // Guide: Prompter can grab answers form searchbox

  render() {
    // Below now working right yet ----
    let items;
    if (this.state.showAnswers) {
      items = this.state.answers.map(item => {
        return <li key={item}>{item}</li>;
      });
    } else {
      items = <li>text</li>;
    }
    // Above not working right yet ----

    return (
      <div>
        <form className="form" id="searchForm">
          <input
            type="text"
            className="input"
            placeholder="Type query here"
            value={this.state.query}
            onChange={this.handleChange}
          ></input>
        </form>
        <button className="button search-button" onClick={this.onFormSubmit}>
          Clickme
        </button>
      </div>
    );
  }
}

export default Searchbox;
