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
  pusher.trigger('editor', 'text-update', {
   ...req.body,
  });

  res.status(200).send('OK');
});

// Post request to compile the code 
app.post('/', (req, res) => {

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
        /*
        var user = await User.findByUsername(req.user.username);
        user.compiledCodes.push(body.web_link);
        await user.save();
        */
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