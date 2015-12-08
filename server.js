var PORT = 4005;

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

require('./ministry/ministry')(app);
require('./administration/administration')(app);

mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  }
);

server.listen(PORT, function () {
  console.log('Express server listening on %d', PORT);
});

// Expose app
exports = module.exports = app;