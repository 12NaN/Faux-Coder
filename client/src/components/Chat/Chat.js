import React, { Component } from "react";
import io from "socket.io-client";
import { Accordion, Button, Card } from 'react-bootstrap';

const socket = io.connect("http://localhost:5000/editor");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: "", chat: [...this.props.name], nickname: this.props.name };
  }

  componentDidMount() {
    socket.on("chat message", ({ nickname, msg }) => {
      this.setState({
        chat: [...this.state.chat, { nickname, msg }]
      });
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = () => {
    const { nickname, msg } = this.state;
    socket.emit("chat message", { nickname, msg });
    this.setState({ msg: "" });
  };

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ nickname, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{nickname}: </span>

        <span>{msg}</span>
      </div>
    ));
  }
  openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  render() {
    /* Set the width of the sidebar to 250px (show it) */

    return (
      <div>
      <div id="mySidepanel" class="sidepanel">
            <span>Nickname</span>
            <input
              name="nickname"
              onChange={e => this.onTextChange(e)}
              value={this.state.nickname}
            />
            <span>Message</span>
            <input
              name="msg"
              onChange={e => this.onTextChange(e)}
              value={this.state.msg}
            />
            <button onClick={this.onMessageSubmit}>Send</button>
            <div>{this.renderChat()}</div>
      </div><button class="openbtn" onclick={()=>{document.getElementById("mySidepanel").style.width = "250px"}}>&#9776; Toggle Sidepanel</button>
      </div>
    );
  }
}

export default Chat;