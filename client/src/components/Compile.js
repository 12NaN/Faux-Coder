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

/*
const route = require("express").Router();

var request = require('request');

route.get("/", (req, res) => {
    res.render("editor/index", {
        success: req.flash("success"),
        error: req.flash("error")
    });
});


// Post request to compile the code 
route.post('/', (req, res) => {

    // hackerearth api secret key
   var CLIENT_SECRET = "a8f254b5ebf237c40407e62cc82a574723510918";
    
    // data to be sent to the hackerearth api
    var requ ={
      url: "https://api.hackerearth.com/v3/code/run/",
      method: 'POST',
      form: {
        'client_secret': CLIENT_SECRET,
        'async': 0,
        'source': req.body.source,
        'lang': req.body.lang,
        'input': req.body.input,
        'time_limit': 5,
        'memory_limit': 262144,
      }
    };

    // sending request to the hackerearth api
    request(requ, async (err, resp, body) => {
        // Convert data to json
        body = JSON.parse(body);
        /*
        var user = await User.findByUsername(req.user.username);
        user.compiledCodes.push(body.web_link);
        await user.save();
        */
       /*
        res.send(body);
    });
});

module.exports = route;*/