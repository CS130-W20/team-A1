import React, { Component } from "react";
import DataTable from "react-data-table-component";

export class Leaderboard_ingame extends Component {
  state = {
    data: this.props.results,
    columns: [
      {
        name: "ID",
        selector: "id",
        left: true
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
        center: true
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
        title="Leaderboard"
        columns={this.state.columns}
        data={this.state.data}
        defaultSortField="score"
        defaultSortAsc="true"
      />
    );
  }
}

export default Leaderboard_ingame;
