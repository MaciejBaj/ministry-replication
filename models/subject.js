'use strict';

var Schema = require('mongoose').Schema;

var SubjectSchema = new Schema({
  name: String,
  ects: Number
});

module.exports = SubjectSchema;
