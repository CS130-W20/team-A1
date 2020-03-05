import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, NavLink, HashRouter, Link, useHistory } from "react-router-dom";
import SocketContext from "../pre_gameroom/Context";
import { Playerwait } from "./Playerwait";
import Gameroom_view from "./Gameroom_view";

export class Gameroom1 extends Component {
  constructor(props) {
    super(props);
    this.eventlistener = this.eventlistener.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      ifready: false,
      if_all_ready: false,
      Ifprompter: false,
      Ifowner: this.props.location.state.m.ifowner,
      redirect: null,
      round_num: 1,
      myId: this.props.socket.id,
      Message: this.props.location.state.m,

      player1: {
        ifexists: this.player_size(0) ? true : false,
        id: this.player_size(0) ? this.props.location.state.m.users[0].id : 0,
        name: this.player_size(0)
          ? this.props.location.state.m.users[0].name
          : "",
        status: this.player_size(0)
          ? this.props.location.state.m.users[0].status
          : ""
      },
      player2: {
        ifexists: this.player_size(1) ? true : false,
        id: this.player_size(1) ? this.props.location.state.m.users[1].id : 0,
        name: this.player_size(1)
          ? this.props.location.state.m.users[1].name
          : "",
        status: this.player_size(1)
          ? this.props.location.state.m.users[1].status
          : ""
      },
      player3: {
        ifexists: this.player_size(2) ? true : false,
        id: this.player_size(2) ? this.props.location.state.m.users[2].id : 0,
        name: this.player_size(2)
          ? this.props.location.state.m.users[2].name
          : "",
        status: this.player_size(2)
          ? this.props.location.state.m.users[2].status
          : ""
      }
    };
  }

  player_size(size) {
    return this.props.location.state.m.users.length > size;
  }
  componentDidMount() {
    this.eventlistener();
  }
  eventlistener = () => {
    this.props.socket.on("player_status_changed", message => {
      console.log(
        "Gamer " +
          message.id +
          "'s status change received, new status is:" +
          message.status
        //Ready ; Not-Ready
      );
      var player_id = message.id;
      if (player_id != this.state.myId) {
        if (player_id == this.state.player1.id) {
          this.change_client_status(1, message.status);
        } else if (player_id == this.state.player2.id) {
          this.change_client_status(2, message.status);
        } else if (player_id == this.state.player3.id) {
          this.change_client_status(3, message.status);
        }
      }
    });

    this.props.socket.on("new_player_join", player => {
      if (player.id != this.state.myId) {
        this.newUserWelcome(player);
      }
    });

    this.props.socket.on("if_all_ready", message => {
      if (message == "Yes") {
        this.setState({ if_all_ready: true });
        console.log("All the players are ready in the room");
      } else if (message == "No") {
        this.setState({ if_all_ready: false });
        console.log("NOT All the players are ready in the room");
      } else {
        console.log(
          "The message received from the if_all_ready end point is invalid\n"
        );
      }
    });
    //Receives who the prompter is to
    this.props.socket.on("enter_game", message => {
      var prompter_id = message.prompter;
      console.log(
        // "Game is starting ~!!!!~ The prompter in this round has ID: " +
        prompter_id
      );
      //Missing: [IMPORTANT] dont forget to unset the ifprompter after every round !!!
      if (prompter_id == this.state.myId) {
        this.setState({ Ifprompter: true });
      }
      this.StartHandle();
    });
    this.props.socket.on("player_left", message => {
      console.log("A player left, his ID is " + message.id);
      if (message.id != this.props.socket.id) {
        if (message.id == this.state.player1.id) {
          this.RemoveUser(1);
        } else if (message.id == this.state.player2.id) {
          this.RemoveUser(2);
        } else if (message.id == this.state.player3.id) {
          this.RemoveUser(3);
        }
      }
    });
  };
  StartHandle = () => {
    this.setState({ redirect: "/Playgame" });
  };

  RemoveUser = useNum => {
    if (useNum == 1) {
      this.setState({
        player1: { ifexists: false, id: 0, name: "", status: "" }
      });
    } else if (useNum == 2) {
      this.setState({
        player2: { ifexists: false, id: 0, name: "", status: "" }
      });
    } else if (useNum == 3) {
      this.setState({
        player3: { ifexists: false, id: 0, name: "", status: "" }
      });
    }
  };
  change_client_status = (useNum, Status) => {
    if (useNum == 1) {
      var updated_player1 = { ...this.state.player1 };
      updated_player1.status = Status;
      this.setState({ player1: updated_player1 });
    } else if (useNum == 2) {
      var updated_player2 = { ...this.state.player2 };
      updated_player2.status = Status;
      this.setState({ player2: updated_player2 });
    } else if (useNum == 3) {
      var updated_player3 = { ...this.state.player3 };
      updated_player3.status = Status;
      this.setState({ player3: updated_player3 });
    }
    //console.log("client status has changed! " + Status);
  };
  ToggleReady = () => {
    this.setState(
      {
        ifready: !this.state.ifready
      },
      () => {
        const data = {
          room: this.state.Message.room,
          id: this.state.myId
        };
        if (this.state.ifready) {
          this.props.socket.emit("player_ready", data);
          console.log("my status has changed! " + "READY!");
        } else {
          this.props.socket.emit("player_UNDOready", data);
          console.log("my status has changed! " + "NO READY!");
        }
      }
    );
  };

  LeaveRoomHandle = () => {
    const data = {
      room: this.state.Message.room,
      id: this.state.myId
    };
    this.props.socket.emit("player_left_room", data);

    window.location.hash = "#/Landing";
  };
  startGame = () => {
    const data = {
      room: this.state.Message.room,
      id: this.state.myId
    };
    this.props.socket.emit("start_game", data);
  };
  newUserWelcome = player => {
    var newplayer = {
      ifexists: true,
      id: player.id,
      name: player.name,
      status: player.status
    };
    if (!this.state.player1.ifexists) {
      this.setState({ player1: newplayer });
    } else if (!this.state.player2.ifexists) {
      this.setState({ player2: newplayer });
    } else if (!this.state.player3.ifexists) {
      this.setState({ player3: newplayer });
    }
  };
  //Prepares the redirect message such that we can come back to this page correctly once the game is over
  prepareRedirectMessage(Message) {
    return Message;
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              message: {
                round_num: this.state.round_num,
                room_id: this.state.Message.room,
                playerid: this.state.myId,
                role: this.state.Ifprompter ? "prompter" : "non-prompter"
              },
              Redirect_Message: this.prepareRedirectMessage(this.state.Message)
            }
          }}
        />
      );
    }
    return (
      <Gameroom_view
        {...this.state}
        LeaveRoomHandle={this.LeaveRoomHandle}
        startPermission={this.startGame}
        ToggleReady={this.ToggleReady}
      />
    );
  }
}
const Gameroom = props => (
  <SocketContext.Consumer>
    {socket => <Gameroom1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Gameroom;
