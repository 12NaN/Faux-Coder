import React, { useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';

const Chat = (props) => {

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                View Chat
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Chat;