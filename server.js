require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
var request = require('request');
const app = express();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});
  // Exprees will serve up production assets
  // Express serve up index.html file if it doesn't recognize route
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/update-editor', (req, res) => {

  pusher.trigger(req.body.room, 'text-update', {
   ...req.body,
  });

  res.status(200).send('OK');
});

// Post request to compile the code 
app.post('/', (req, res) => {
//  console.log(req.body);
    // hackerearth api secret key
   var CLIENT_SECRET = "926a0a861df9fc10c5cd44d16d3b12cf1a0aef2c";
    
    // data to be sent to the hackerearth api
    var requ ={
      url: "https://api.hackerearth.com/v3/code/run/",
      method: 'POST',
      form: {
        'client_secret': CLIENT_SECRET,
        'async': 0,
        'source': req.body.source,
        'lang': req.body.lang,
        'time_limit': 5,
        'memory_limit': 262144,
      }
    };

    // sending request to the hackerearth api
    request(requ, async (err, resp, body) => {
        // Convert data to json
        body = JSON.parse(body);
        res.send(body);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
/*
require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
var request = require('request');
const app = express();

const http = require('http');
const socketio = require('socket.io');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});
  // Exprees will serve up production assets
  // Express serve up index.html file if it doesn't recognize route
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if(error) return callback(error);

    socket.join(user.room);
    console.log(user.name);
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/update-editor', (req, res) => {
  pusher.trigger('editor', 'text-update', {
   ...req.body,
  });

  res.status(200).send('OK');
});

// Post request to compile the code 
app.post('/editor', (req, res) => {

    // hackerearth api secret key
   var CLIENT_SECRET = "926a0a861df9fc10c5cd44d16d3b12cf1a0aef2c";
    
    // data to be sent to the hackerearth api
    var requ ={
      url: "https://api.hackerearth.com/v3/code/run/",
      method: 'POST',
      form: {
        'client_secret': CLIENT_SECRET,
        'async': 0,
        'source': req.body.source,
        'lang': req.body.lang,
        'time_limit': 5,
        'memory_limit': 262144,
      }
    };

    // sending request to the hackerearth api
    request(requ, async (err, resp, body) => {
        // Convert data to json
        body = JSON.parse(body);
        res.send(body);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.set('port', process.env.PORT || 5000);

*/
/*
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});*/