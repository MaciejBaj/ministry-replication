var mongoose = require('mongoose');
var subjectModel = require('../models/subject');
var mongoDbAdressess = require('../mongoDBconfig');
var schoolOneConnection = mongoose.createConnection('mongodb://' + mongoDbAdressess.ministry + '/education');
var SubjectsCollection = schoolOneConnection.model('Subject', subjectModel);
var json2html = require('json2html');

module.exports = function(app) {

  app.route('/subjects/ministry').get(function(req, res) {
    SubjectsCollection.find({}, function (err, subjects) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(json2html.render(subjects));
    });
  });

  app.route('/subjects/ministry/insert').post(function(req, res) {
    SubjectsCollection.create(req.body, function (err, subjects) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).send(json2html.render(subjects));
    });
  });
};





