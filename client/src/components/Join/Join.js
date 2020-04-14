import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 style={{textAlign: "left", fontSize: "34px"}} className="App-title" >FauxCoder</h1>
        <h1 style={{fontSize: "20px"}}className="heading">Join/Create A Room</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={{pathname: '/editor', state: {name: name, room:room}}}>
          <button className={'button mt-20'} style={{backgroundColor: "#5ce198"}} type="submit">Create/Join Room</button>
        </Link>
      </div>
    </div>
  );
}
