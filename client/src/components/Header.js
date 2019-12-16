import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" className="App-title">
            <Navbar.Brand href="#home">
              <h1 style={{textAlign: "right"}} >FauxCoder</h1>
            </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default Header;

