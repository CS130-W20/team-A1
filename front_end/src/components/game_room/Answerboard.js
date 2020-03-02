import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { ButtonToolbar, Button } from "react-bootstrap";

export class Answerboard extends Component {
  handleAction = () => {
    console.log("Some action !");
  };
  state = {
    answers: [
      { rank: 1, sentence: "Jack1", myrank: 2 },
      { rank: 3, sentence: "Jack12", myrank: 1 },
      { rank: 2, sentence: "Jack13", myrank: 3 },
      { rank: 5, sentence: "Jack14", myrank: 5 },
      { rank: 4, sentence: "Jack13", myrank: 4 }
    ],
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
        selector: "score"
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
        title="Results"
        columns={this.state.columns}
        data={this.state.data}
        defaultSortField="rank"
        defaultSortAsc="true"
      />
    );
  }
}

export default Answerboard;
