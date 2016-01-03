var mongoose = require('mongoose');
var _ = require('lodash');
var subjectModel = require('../models/subject');
var mongoDbAdressess = require('../mongoDBconfig');
var json2html = require('json2html');

var LAST_SCHOOL_PORT = 27031;

module.exports = function(app) {
  app.route('/school/:id').get(function(req, res) {
    var port = _.find(app.schools, {id: req.params.id});
    console.log("found school at port ", port);
    port = port || LAST_SCHOOL_PORT + parseInt(req.params.id);
    var schoolOneConnection = mongoose.createConnection('mongodb://' + mongoDbAdressess.ministry + ',' + mongoDbAdressess.host + ':' + port + '/education?w=0&readPreference=secondary');
    var SubjectsCollection = schoolOneConnection.model('Subject', subjectModel);
    console.log("connection exists", !!schoolOneConnection, "connection exists", !!SubjectsCollection);
    if(!schoolOneConnection || !SubjectsCollection) {
      res.status(404).send("no mongo connection can be found for school of id ", req.params.id);
      return;
    }
    SubjectsCollection.find(function (err, subjects) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(json2html.render(subjects));
    });

  });
};




