import React, { Component } from "react";
import DataTable from "react-data-table-component";

export class Leaderboard_ingame extends Component {
  state = {
    data: [
      { id: 1, name: "Jack1", current_score: 12982, total_score: 123 },
      { id: 2, name: "John2", current_score: 112992, total_score: 123 },
      { id: 3, name: "Joe3", current_score: 981, total_score: 123 },
      { id: 4, name: "Josh4", current_score: 182, total_score: 123 }
    ],
    columns: [
      {
        name: "Cool Avatar",
        selector: "avatar",
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
      },
      {
        name: "Score From This Round",
        selector: "current_score"
      },
      {
        name: "Score So Far",
        selector: "total_score"
      }
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
