import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
class Compile extends Component {
  render() {
    return (
      <div>
        <Button id="compile" variant="outline-primary" value="hi">Compile & run</Button>
      </div>
    );
  }
}

export default Compile;