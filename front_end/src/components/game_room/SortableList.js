import React, { Component } from "react";
import ReactDOM from "react-dom";
import { sortable } from "react-sortable";
var records;
class Item extends React.Component {
  render() {
    return <li {...this.props}>{this.props.children}</li>;
  }
}
var SortableItem = sortable(Item);

export class SortableList extends Component {
  state = {
    items: this.props.items
  };

  onSortItems = items => {
    this.setState({
      items: items
    });
  };
  updatePlayer(neworder) {
    this.props.answerupdate(neworder);
  }

  render() {
    const { items } = this.state;
    var listItems = items.map((item, i) => {
      console.log("id:" + i + "object:" + item);
      return (
        <div>
          <SortableItem
            key={i}
            onSortItems={this.onSortItems}
            items={items}
            sortId={i}
          >
            <div
              style={{
                backgroundColor: "#4c8c92",
                border: "2px solid blue",
                padding: "5px",
                margin: "3px"
              }}
            >
              {item}
            </div>
          </SortableItem>
        </div>
      );
    });
    records = items.map((item, i) => [item]);
    console.log("THE RECORDS ARE: \n" + records);
    this.updatePlayer(records);

    return (
      <ul
        style={{
          listStyleType: "upper-roman",
          backgroundColor: "cyan",
          color: "#9f0606",
          textAlign: "center"
        }}
        className="sortable-list"
      >
        {listItems}
      </ul>
    );
  }
}

export default SortableList;
