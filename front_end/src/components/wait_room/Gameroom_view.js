import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import Playerwait from "./Playerwait";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarWaitRoom from "./NavbarWaitRoom";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Footbar from "./../pre_login/Footbar";

const my_name = "";
export class Otherplayers extends Component {
  LeaveRoomHandle = this.props.LeaveRoomHandle;
  startPermission = this.props.startPermission;
  ToggleReady = this.props.ToggleReady;

  render() {
    const toggle_word = this.props.ifready ? "Not Ready" : "Ready";
    return (
      <>
        <div>
          <NavbarWaitRoom
            ready_button_style={!this.props.ifready ? "success" : "danger"}
            ready_button_text={toggle_word}
            room={this.props.Message.room}
            leave_room_handle={this.LeaveRoomHandle}
            toggle_handle={this.ToggleReady}
            user_name={my_name}
            style={{ marginTop: "10px", marginBottom: "30px" }}
          ></NavbarWaitRoom>
          <br />
          <br />
          <div
            id="owner_button"
            style={{ display: this.props.Ifowner ? "block" : "none" }}
          >
            <h3>
              You own the room, you can start the game once all the players are
              ready!{" "}
            </h3>
            <br />
            <Button
              variant={this.props.if_all_ready ? "success" : "secondary"}
              size="lg"
              disabled={!this.props.if_all_ready}
              onClick={this.startPermission}
              block
            >
              Start Game
            </Button>{" "}
          </div>

          <br />

          <Playerwait
            id={1}
            name={this.props.player1.name}
            status={this.props.player1.status}
            ifPlayerExists={this.props.player1.ifexists}
          />
          <Playerwait
            id={2}
            name={this.props.player2.name}
            status={this.props.player2.status}
            ifPlayerExists={this.props.player2.ifexists}
          />
          <Playerwait
            id={3}
            name={this.props.player3.name}
            status={this.props.player3.status}
            ifPlayerExists={this.props.player3.ifexists}
          />
        </div>
        <div
          style={{
            margin: "auto"
          }}
        >
          {" "}
          {!this.props.ifready ? (
            <p>Please get ready to enter the game</p>
          ) : (
            <p>Cool ! You're ready for the game !</p>
          )}
          <div style={{ margin: "0 auto", paddingLeft: "130px" }}>
            <BootstrapSwitchButton
              onlabel="Ready"
              s
              offlabel="Unready"
              onstyle="success"
              // offstyle="info"
              // style="w-100 mx-3"
              width={120}
              height={75}
              onChange={this.ToggleReady}
            />
          </div>
        </div>
        <Footbar></Footbar>
      </>
    );
  }
}
export default Otherplayers;
