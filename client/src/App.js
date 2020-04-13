import React from 'react';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Editor from './Editor';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <div id ="editor">
       {/* <Home/> */}
       
       <Router>
         
          <Route path="/" exact component={Join} /> 
          <Route path="/editor" component={Editor} />
       </Router>
       
      {/* <Editor/>*/}
      </div>
    </div>
  );
}

export default App;
