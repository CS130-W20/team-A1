import React, { Component } from "react";
import io from 'socket.io-client'
const socket = io('http://localhost:5000');


socket.on('message', function (message) {
    console.log(message);
});


socket.on('lobby_created', function (message) {
    console.log(message);
});

socket.on('lobby_destroyed', function (message) {
    console.log(message);
});

export class Roomcreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomname: "Empty"
        };

        this.handleCREATE_Submit = this.handleCREATE_Submit.bind(this);
        this.handleJOIN_Submit = this.handleJOIN_Submit.bind(this);
        this.handleDESTROY_Submit = this.handleDESTROY_Submit.bind(this);
    }

    handleCREATE_Submit(e) {
        let data = {
            "room": "meow1",
            "username": "omar"
        };
        socket.emit("create_room", data);

    }
    handleJOIN_Submit(e) {
        let data = {
            "room": "meow2",
            "username": "joey"
        };
        socket.emit("join", data);
    }
    //Currently only works for omar username, testcase until front end form submission
    //to server is set up (so server can get name of lobby to leave.)
    handleDESTROY_Submit(e) {
        let data = {
            "room": "dummy1",
            "username": "omar"
        };
        socket.emit("destroy_room", data);
    }

    buttonStyle = {
        color: "blue",
        backgroundColor: "grey",
        padding: "10px",
        margin: "10px"
    };

    render() {
        return (
            <div style={this.buttonStyle}>
                <label htmlFor="username">Enter a Room Name</label> <br />
                <input name="roomnumber_create" type="text" /> <r />
                <button onClick={this.handleCREATE_Submit}>Create Room</button>

                <label htmlFor="username">Enter a Room Name</label> <br />
                <input name="roomnumber_join" type="text" /> <r />
                <button onClick={this.handleJOIN_Submit}>Join Room</button>

                <label htmlfor="username">Enter a Room Name</label> <br />
                <input name="roomnumber_leave" type="text" /> <r />
                <button onClick={this.handleDESTROY_Submit}>Leave Room</button>
            </div>
        );
    }
}

export default Roomcreation;