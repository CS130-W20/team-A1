import React, { Component } from "react";
import DataTable from "react-data-table-component";
// import { Button } from "react-bootstrap";

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
        //sortable: true,
        right: true
      },
      {
        name: "Actual Ranking",
        selector: "rank",
        // sortable: true,
        center: true
      },
      {
        name: "My Ranking",
        selector: "myrank"
        // sortable: true
      }
      //   {
      //     name: "Challenge",
      //     cell: () => (
      //       <Button raised primary onClick={handleAction}>
      //         Invite
      //       </Button>
      //     ),
      //     ignoreRowClick: true,
      //     allowOverflow: true,
      //     button: true,
      //     right: true
      //   }
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
