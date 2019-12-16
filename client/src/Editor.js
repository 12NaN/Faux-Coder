import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Button from 'react-bootstrap/Button';
import Header from "./components/Header";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";
import "./App.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

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
      .post("https://fauxcoder.herokuapp.com/update-editor", data)
     // .post("http://localhost:5000/update-editor", data)
      .catch(console.error);
  };
//  
  handleChange(e){
    var source_template={
      "CPP11" : "#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}",
      "JAVA" : "/* package whatever; // don't place package name! */\nimport java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\
    /* Name of the class has to be \"Main\" only if the class is public. */\nclass Ideone{\n\t\
    public static void main (String[] args) throws java.lang.Exception{\n\t\t// your code goes here\n\t}\n}",
      "PYTHON":"# your code goes here"
    }  
    this.state.code = source_template.e
  }
  render() {
    const { code} = this.state;
    
    return (
    
      <div>
 
       <Header/> 
        <select id="language">
          <option value = "CPP11" onChange={this.handleChange} >C++</option>
          <option value = "JAVA" onChange={this.handleChange}>Java</option>
          <option value = "PYTHON" onChange={this.handleChange}>Python</option>
        </select>
        
        <CodeMirror
          className="code-mirror-container"
          value={code}
          options={{
            theme: "dracula",
            lineNumbers: true,
            scrollbarStyle: null,
            lineWrapping: true
          }}
          onBeforeChange={(editor, data, code) => {
            this.setState({ code }, () => this.syncUpdates());
          }}
        />
          
        <div id="outputbox"></div>
        <br/>
        <Button id="compile" variant="outline-primary" value={code} style={{color: "#5ce198", borderColor: "#5ce198" }}>Compile & run</Button>
    </div>  
    );
  }
}

export default Editor;
