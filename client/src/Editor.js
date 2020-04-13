import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Button from 'react-bootstrap/Button';
import Chat from './components/Chat';
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
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      code: "#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}",
      room: "private-"+this.props.location.state.room
    };
   
    this.pusher = new Pusher("25fb961369ffad5aeb83", {
      cluster: "us2",
      forceTLS: true
    });
    console.log(this.state.room);
 //   this.channel = this.pusher.subscribe(this.props.location.state.room);
   this.channel = this.pusher.subscribe(this.state.room);
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
    //  .post("http://localhost:5000/update-editor", data)
   //   .post(`http://localhost:5000/editor?name=${this.props.name}&room=${this.props.room}/update-editor`, data)
    //  .post(`http://localhost:5000/editor/update-editor`, data)
      .catch(console.error);
  };
  
  onChange = e =>{
    var source_template={
      "C" : "#include <stdio.h>\nint main(void) {\n\t// your code goes here\n\treturn 0;\n}",
      "CPP" : "#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}",
      "CPP11" : "#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}",
      "CLOJURE" : "; your code goes here",
      "CSHARP" : "using System;\npublic class Test{\n\tpublic static void Main(){\n\t// your code goes here\n\t}\n}",
      "JAVA" : "/* package whatever; // don't place package name! */\nimport java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\
    /* Name of the class has to be \"Main\" only if the class is public. */\nclass Ideone{\n\t\
    public static void main (String[] args) throws java.lang.Exception{\n\t\t// your code goes here\n\t}\n}",
      "JAVASCRIPT":"// your code goes here",
      "HASKELL":"main = -- your code goes here",
      "PERL":"#!/usr/bin/perl\n# your code goes here",
      "PHP":"<?php\n\n// your code goes here",
      "PYTHON":"# your code goes here",
      "RUBY":"# your code goes here"
    };
    this.setState({code: source_template[e.target.value]});
    console.log(source_template[e.target.value]);
  }

  
  render() {
    const { code} = this.state;
    
    return (
    
      <div>
       <Header/> 
        <select id="language" onChange={this.onChange}>
          <option value = "CPP11" >C++</option>
          <option value = "JAVA">Java</option>
          <option value = "PYTHON">Python</option>
        </select>
        <Chat/>

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
        <Button id="compile" variant="outline-success" value={code} style={{color: "#5ce198", borderColor: "#5ce198" }}>Compile & run</Button>
    </div>  
    );
  }
}

export default Editor;
