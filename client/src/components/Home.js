import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import Editor from '../Editor';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', editor: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      add = () => {
        this.setState({editor : !this.state.editor})
      }
      handleChange(event) {
        this.setState({value: event.target.value});

      }
    
      handleSubmit(event) {

       alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
 
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Join:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button onClick={() => this.add()}>CLICK</button>
     { this.state.editor &&
        <Editor room={this.state.value}/>
     }
          </form>
        );
      }
}

export default Home;