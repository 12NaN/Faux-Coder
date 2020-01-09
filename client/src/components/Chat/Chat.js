import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Editor from '../../Editor';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000/';
  var i = 0;
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
      else{
        alert(name);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
      console.log(users[i]);
      i++;
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [messages])

  return (
    <div>
      <div>
          <Editor name = {name} room={'editor'}/>
      </div>
    </div>
  );
}

export default Chat;
