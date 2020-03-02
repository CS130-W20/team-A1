import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";

export class Leaderboard_ingame extends Component {
  state = {
    data: [
      { id: 1, name: "Jack1", score: 12982 },
      { id: 2, name: "John2", score: 112992 },
      { id: 3, name: "Joe3", score: 981 },
      { id: 4, name: "Josh4", score: 182 }
    ],
    columns: [
      {
        name: "Cool Avatar",
        selector: "avatar",
        //sortable: true,
        left: true
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
        center: true
      },
      {
        name: "Score",
        selector: "score"
        // sortable: true
      }
      //   {
      //     name: "Challenge",
      //     cell: () => (
      //       <Button raised primary onClick={this.handleAction}>
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
  handleAction = () => {
    console.log("Some action !");
  };
  render() {
    return (
      <DataTable
        title="Scores"
        columns={this.state.columns}
        data={this.state.data}
        defaultSortField="score"
        defaultSortAsc="true"
      />
    );
  }
}

export default Leaderboard_ingame;
