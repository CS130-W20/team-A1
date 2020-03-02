import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { ButtonToolbar, Button } from "react-bootstrap";

const data = [
  { id: 1, name: "Jack1", score: 12982 },
  { id: 2, name: "John2", score: 112992 },
  { id: 3, name: "Joe3", score: 981 },
  { id: 4, name: "Josh4", score: 182 },
  { id: 5, name: "James5", score: 292 },
  { id: 6, name: "Jade", score: 21244992 },
  { id: 7, name: "Jose", score: 121244992 }
];
const handleAction = () => {
  console.log("Some action !");
};
const columns = [
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
  },
  {
    name: "Challenge",
    cell: () => (
      <Button raised primary onClick={handleAction}>
        Invite
      </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    right: true
  }
];

export class Leaderboard_Global extends Component {
  render() {
    return (
      <DataTable
        title="Top Players"
        columns={columns}
        data={data}
        theme="dark"
        defaultSortField="score"
        defaultSortAsc="true"
      />
    );
  }
}
export default Leaderboard_Global;
