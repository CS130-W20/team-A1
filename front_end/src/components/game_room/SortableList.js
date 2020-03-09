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
                backgroundColor: "#0066ff",
                border: "2px solid white",
                borderRadius: "20px",

                margin: "3px",
                padding: "20px"
              }}
            >
              {item}
            </div>
          </SortableItem>
        </div>
      );
    });
    records = items.map((item, i) => [item]);

    this.updatePlayer(records);

    return (
      <ul
        style={{
          listStyleType: "upper-roman",
          backgroundColor: "silver",
          color: "white",
          textAlign: "center",
          padding: "80px",
          borderRadius: "20px"
        }}
        className="sortable-list"
      >
        {listItems}
      </ul>
    );
  }
}

export default SortableList;
