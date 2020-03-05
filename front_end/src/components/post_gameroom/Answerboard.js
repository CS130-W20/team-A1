import React, { Component } from "react";
import DataTable from "react-data-table-component";

export class Answerboard extends Component {
  handleAction = () => {
    console.log("Some action !");
  };
  componentDidMount() {
    let ans = this.answer_formatter();
    this.setState({ answers: ans });
  }
  answer_formatter() {
    var answers = this.props.correct_answer.map((val, index) => {
      return { rank: index, sentence: val, myrank: index };
    });
    return answers;
  }
  state = {
    answers: [],
    columns: [
      {
        name: "Sentences",
        selector: "sentence",
        right: true
      },
      {
        name: "Correct Order",
        selector: "rank",
        center: true
      },
      {
        name: "My Answer",
        selector: "myrank"
      }
    ]
  };
  render() {
    return (
      <DataTable
        title="Answers"
        columns={this.state.columns}
        data={this.state.answers}
        theme="dark"
      />
    );
  }
}

export default Answerboard;
