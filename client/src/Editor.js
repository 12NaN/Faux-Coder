import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Header from "./components/Header";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";
import {Button} from 'react-bootstrap';
import Output from "./components/Output";
import "./App.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/clike/clike");
require("codemirror/theme/dracula.css");
class Editor extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      code: ""
    };
   
    this.pusher = new Pusher("25fb961369ffad5aeb83", {
      cluster: "us2",
      forceTLS: true
    });

    this.channel = this.pusher.subscribe("editor");
  }

  componentDidMount() {
    this.setState({
      id: pushid()
    });

    this.channel.bind("text-update", data => {
      const { id } = this.state;
      if (data.id === id) return;

      this.setState({
        code: data.code
      });
    });
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios
      .post("http://localhost:5000/update-editor", data)
      .catch(console.error);
  };
//  

  render() {
    const { code} = this.state;
    return (
    
      <div>
        <Header style={{ background: "#1d1f27" }} />
        <select id="language">
          <option value = "CPP11">C++</option>
          <option value = "JAVA">Java</option>
          <option value = "PYTHON">Python</option>
        </select>
        <CodeMirror
          className="code-mirror-container"
          value={code}
          options={{
            theme: "dracula",
            lineNumbers: true,
            scrollbarStyle: null,
            lineWrapping: true,
            mode: "clike"
          }}
          onBeforeChange={(editor, data, code) => {
            this.setState({ code }, () => this.syncUpdates());
          }}
        />
          
        <div id="outputbox"></div>
        <br/>
        <Button id="compile" variant="outline-primary" value={code}>Compile & run</Button>
    </div>  
    );
  }
}

export default Editor;
