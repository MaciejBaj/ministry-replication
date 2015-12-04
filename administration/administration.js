var mongoose = require('mongoose');
var subjectModel = require('../models/subject');
var mongoDbAdressess = require('../mongoDBconfig');
var schoolOneConnection = mongoose.createConnection('mongodb://' + mongoDbAdressess.ministry + '/education');
var SubjectsCollection = schoolOneConnection.model('Subject', subjectModel);
var exec = require('child_process').exec;

module.exports = function(app) {

  app.route('/create/:number').get(function(req, res) {

    for(var i = 0; i < req.params.number; i++) {
      exec('mongod create databases with range', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    }

  });

  app.route('/kill/:id').post(function(req, res) {
    exec('mongod /cs/cas stop' + i, function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  });
};





