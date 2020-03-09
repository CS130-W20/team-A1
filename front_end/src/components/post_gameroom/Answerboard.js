import React, { Component } from "react";
import DataTable from "react-data-table-component";

export class Answerboard extends Component {
  handleAction = () => {
    console.log("Some action !");
  };
  componentDidMount() {
    let ans = this.answer_formatter();
    let answer = this.rank_formatter(ans);
    this.setState({ answers: answer });
  }
  answer_formatter() {
    var answers = this.props.correct_answer.map((val, index) => {
      return { rank: index + 1, sentence: val, myrank: index + 1 };
    });
    return answers;
  }
  rank_formatter(ans) {
    var my_rank_list = [];
    var answers = this.props.correct_answer;
    var my_rank = this.props.my_answer;
    var i;
    for (i = 0; i < answers.length; i++) {
      var j;
      for (j = 0; j < my_rank.length; j++) {
        if (answers[i] == my_rank[j]) {
          // my_rank_list.push(j + 1);
          ans[i]["myrank"] = j + 1;
        }
      }
    }
    console.log("current_answers " + answers);
    console.log("my_answer_list : " + my_rank);
    console.log("my_ranks " + my_rank_list);
    console.log("table is :" + ans);
    return ans;
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
