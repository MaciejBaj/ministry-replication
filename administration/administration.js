var exec = require('child_process').exec;
var _ = require('lodash');

var LAST_SCHOOL_PORT = 27031;
module.exports = function(app) {
  app.schools = [];
  app.route('/create/:number').get(function(req, res) {
    for(var i = 0; i < req.params.number; i++) {
      executeCommand(
        getMongoCreateCommand(i, LAST_SCHOOL_PORT),
        res,
        function() {},
        function(){
          app.schools.push({id: i, port: LAST_SCHOOL_PORT})
        });
      LAST_SCHOOL_PORT += 1;
    }
  });

  app.route('/kill/:id').get(function(req, res) {
    var schoolId = req.params.id;
    var schoolToKill = _.remove(app.schools, {'id': schoolId});
    if(!schoolToKill) {
      res.status(404).send("no school of id ", schoolId, " found");
      return;
    }
    executeCommand(getMongoKillCommand(schoolId), res, function(error) { app.schools.push(schoolToKill) }, function(){});
  });

  app.route('/killAll').post(function(req, res) {
    app.schools.forEach(function(school) {
      executeCommand(getMongoKillCommand(school.id), res, function(error) { app.schools.push(school) }, function(){});
    });
  });

  function getMongoKillCommand(id) {
    return 'mongod --dbpath /mongo-rs-szkola-' + id + ' --shutdown';
  }

  function getMongoCreateCommand(id, mongoPort) {
    return 'export LC_ALL="en_US.UTF-8" && mkdir /mongo-rs-szkola-' + id +
      ' ; mongod --dbpath=/mongo-rs-szkola-' + id +
      ' --logpath=/var/log/mongodb/mongo-ministry-rs.log --logappend --port=' + mongoPort +
      ' --replSet=rs_ministry --fork' +
      ' && mongo --port 27030 --eval \'rs.add("macio1:' + mongoPort + '")\'';
  }

  function executeCommand(command, res, onErrorAction, onSuccessAction) {
    exec(command, function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        onErrorAction(error);
        res.status(500).send(error);
      }
      else {
        onSuccessAction();
      }
    });
  }

};

//module.exports = schools;

//
//
//export LC_ALL="en_US.UTF-8" && mkdir /mongo-rs-szkola-0 ; mongod --dbpath=/mongo-rs-szkola-0 --logpath=/var/log/mongodb/mongo-ministry-rs.log --logappend --port=27031 --replSet=rs_ministry --fork && mongo --port 27030 --eval 'rs.add("macio1:27031")'
//
//mongod --dbpath /mongo-rs-szkola-3 --shutdown