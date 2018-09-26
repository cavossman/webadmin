//TODO: Implement sessions so that the admin doesn't get logged out every page load.
require('dotenv').config();
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    util = require('util'),
    log_file = fs.createWriteStream(__dirname + '/logs/output.log', {flags : 'w'}),
    log_stdout = process.stdout,

    Poem = require('./api/models/PoemModel'),
    Music = require('./api/models/MusicModel'),
    User = require('./api/models/UserModel');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/webadmin', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes');
routes(app);

app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);

// Overload console.log function for logging.
console.log = function(d) {
  log_file.write(new Date().toLocaleString() + ': ' + util.format(d) + '\n');
  log_stdout.write(new Date().toLocaleString() + ': ' + util.format(d) + '\n');
};