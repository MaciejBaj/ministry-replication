var mongoose = require('mongoose');
var _ = require('lodash');
var subjectModel = require('../models/subject');
var mongoDbAdressess = require('../mongoDBconfig');
var json2html = require('json2html');

module.exports = function(app) {
  app.route('/subjects/school/:id').get(function(req, res) {
    var port = _.find(app.schools, {id: req.params.id});
    if(!port) {
      res.status(404).send("no mongo connection can be found for school of id ", req.params.id);
    }
    var schoolOneConnection = mongoose.createConnection('mongodb://' + mongoDbAdressess.ministry + ',' + mongoDbAdressess.host + ':' + port + '/education?w=0&readPreference=secondary');
    var SubjectsCollection = schoolOneConnection.model('Subject', subjectModel);

    SubjectsCollection.find(function (err, subjects) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).render(json2html.render(subjects));
    });

  });
};




