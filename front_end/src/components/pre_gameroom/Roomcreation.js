import React, { Component } from "react";
import SocketContext from "./Context";
import { Redirect } from "react-router-dom";
<<<<<<< HEAD
import { Form, Button, Table } from "react-bootstrap";
=======
import { Form, Button } from "react-bootstrap";
>>>>>>> master
import Leaderboard_Global from "./Leaderboard_Global";
let Message;

export class Roomcreation1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "Empty",
      redirect: null,
      ifWrongRoomName: false
    };

    this.handleCREATE_Submit = this.handleCREATE_Submit.bind(this);
    this.handleJOIN_Submit = this.handleJOIN_Submit.bind(this);
    this.handleDESTROY_Submit = this.handleDESTROY_Submit.bind(this);
    this.updateInput = this.updateInput.bind(this);

    this.props.socket.on("lobby_created", message => {
      Message = JSON.parse(JSON.stringify(message));
      // console.log(
      //   "lobby creation message received ! " + JSON.stringify(message),
      //   "\n\n The room is: " + Message["users"][0]["room"]
      // );
      Message["ifowner"] = true;
      Message["room"] = Message["users"][0]["room"];
      Message["users"] = Message["users"].filter(client => {
        return client.id !== this.props.socket.id;
      });
      this.setState({ ifWrongRoomName: false });
      this.setState({ redirect: "/Gameroom" });
    });
    //Missing: room error created !
    this.props.socket.on("lobby_destroyed", message => {
      console.log(message);
    });
    this.props.socket.on("player_error_join", message => {
      this.setState({ ifWrongRoomName: true });
    });
    this.props.socket.on("player_suc_join", message => {
      Message = message;
      Message["ifowner"] = false;
      Message["room"] = message["users"][0]["room"];

      Message["users"] = Message["users"].filter(client => {
        return client.id !== this.props.socket.id;
      });
      this.setState({ ifWrongRoomName: false });
      this.setState({ redirect: "/Gameroom" });

      console.log(message);
    });
  }

  updateInput(evt) {
    this.state = { roomname: evt.target.value };
  }

  handleCREATE_Submit(e) {
    console.log(this.props.userInfo);

    let data = {
      id: this.props.socket.id,
      name: this.props.userInfo["name"]
    };
    this.props.socket.emit("create_room", data);
    console.log(
      "sending room creation request with data:" + JSON.stringify(data)
    );
  }
  handleJOIN_Submit(e) {
    console.log(this.state.roomname);
    console.log(this.props.userInfo);
    let data = {
      room: this.state.roomname,
      id: this.props.socket.id,
      name: this.props.userInfo["name"]
    };
    this.props.socket.emit("join_room", data);
  }

  //Currently only works for omar username, testcase until front end form submission
  //to server is set up (so server can get name of lobby to leave.)
  handleDESTROY_Submit(e) {
    let data = {
      room: "dummy1",
      username: "omar"
    };
    this.props.socket.emit("destroy_room", data);
  }

  buttonStyle = {
    color: "blue",
    backgroundColor: "grey",
    padding: "10px",
    margin: "10px"
  };

  render() {
    if (this.state.redirect && !this.ifWrongRoomName) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { m: Message }
          }}
        />
      );
    }
    return (
<<<<<<< HEAD
      <>
        <div
          style={{
            paddingTop: "100px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {!this.state.ifWrongRoomName ? (
            <p></p>
          ) : (
            <h5 style={{ backgroundColor: "red", textAlign: "center" }}>
              Invalid Room Name , Try Again!
            </h5>
          )}
        </div>
        <table class="table">
          {/* <tr>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center"
              }}
            >
              Choose An Action
            </th>
          </tr> */}

          <tr>
            <td>
              <h3
                style={{
                  backgroundColor: "#810413",
                  color: "white",
                  textAlign: "center",
                  width: "300px",
                  paddingTop: "30px",
                  marginTop: "20px"
                }}
              >
                Choose An Action
              </h3>
              <div
                id="actions"
                style={{
                  width: "300px",
                  height: "400px",
                  textAlign: "center",
                  display: "inline-block",
                  padding: "60px",
                  backgroundColor: "#810413",
                  marginRight: "80px"

                  // marginBottom: "300px",
                  // paddingTop: "60px"
                }}
              >
                <div id="create_room">
                  <Form>
                    <Form.Label style={{ color: "white" }}>
                      Create Room
                    </Form.Label>
                    <Form.Control type="email" placeholder="Room name" />

                    <Button
                      variant="primary"
                      onClick={this.handleCREATE_Submit}
                    >
                      Create
                    </Button>
                  </Form>
                </div>

                <div id="join_room">
                  <Form>
                    <Form.Label style={{ color: "white" }}>
                      Join Room
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Room name"
                      onChange={this.updateInput}
                    />
                    {/* <Form.Text className="text-muted">
                Please enter a room name you wanna join
              </Form.Text> */}

                    <Button variant="primary" onClick={this.handleJOIN_Submit}>
                      Join
                    </Button>
                  </Form>
                </div>
              </div>
            </td>
            <td>
              <div
                style={{
                  display: "inline-block",
                  padding: "60px",
                  backgroundColor: "#810413",
                  marginLeft: "120px"
                }}
              >
                <Leaderboard_Global
                // style={{ marginBottom: "100px", paddingBottom: "50px" }}
                ></Leaderboard_Global>
              </div>
            </td>
          </tr>
        </table>
      </>
=======
      <div
        style={{
          paddingTop: "100px",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {!this.state.ifWrongRoomName ? (
          <p></p>
        ) : (
          <h5 style={{ backgroundColor: "red", textAlign: "center" }}>
            Invalid Room Name , Try Again!
          </h5>
        )}
        <div
          id="actions"
          style={{
            width: "300px",
            height: "400px",
            textAlign: "center",
            display: "inline-block",
            padding: "60px",
            backgroundColor: "red",
            marginRight: "120px",
            marginBottom: "300px",
            paddingTop: "60px"
          }}
        >
          <div id="create_room">
            <Form>
              <Form.Label>Create Room</Form.Label>
              <Form.Control type="email" placeholder="Room name" />
              {/* <Form.Text className="text-muted">
                Please enter a room name of your choice
              </Form.Text> */}

              <Button variant="primary" onClick={this.handleCREATE_Submit}>
                Create
              </Button>
            </Form>
          </div>

          <div id="join_room">
            <Form>
              <Form.Label>Join Room</Form.Label>
              <Form.Control
                type="text"
                placeholder="Room name"
                onChange={this.updateInput}
              />
              {/* <Form.Text className="text-muted">
                Please enter a room name you wanna join
              </Form.Text> */}

              <Button variant="primary" onClick={this.handleJOIN_Submit}>
                Join
              </Button>
            </Form>
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            padding: "60px",
            backgroundColor: "silver",
            marginLeft: "120px"
          }}
        >
          <Leaderboard_Global
          // style={{ marginBottom: "100px", paddingBottom: "50px" }}
          ></Leaderboard_Global>
        </div>
      </div>
      // <div style={this.buttonStyle}>
      //   <button onClick={this.handleCREATE_Submit}>Create Room</button>
      //   <br />
      //   <h4>Enter Room Name:</h4>
      //   {!this.state.ifWrongRoomName ? (
      //     <p></p>
      //   ) : (
      //     <h2>Invalid Room Name , Try Again!</h2>
      //   )}
      //   <input
      //     name="roomnumber_join"
      //     type="text"
      //     onChange={this.updateInput}
      //   ></input>
      //   <button placeholder="room number" onClick={this.handleJOIN_Submit}>
      //     Join Room
      //   </button>
      // </div>
>>>>>>> master
    );
  }
}
const Roomcreation = props => (
  <SocketContext.Consumer>
    {socket => <Roomcreation1 {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default Roomcreation;
