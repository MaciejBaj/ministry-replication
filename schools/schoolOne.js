var mongoose = require('mongoose');
var subjectModel = require('../models/subject');
var mongoDbAdressess = require('../mongoDBconfig');
var schoolOneConnection = mongoose.createConnection('mongodb://' + mongoDbAdressess.ministry + ',' + mongoDbAdressess.schoolOne + '/education?w=0&readPreference=secondary');
var SubjectsCollection = schoolOneConnection.model('Subject', subjectModel);

module.exports = function(app) {
  app.route('/subjects/schoolOne').get(function(req, res) {
    SubjectsCollection.find(function (err, subjects) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(subjects);
    });

  });
};


