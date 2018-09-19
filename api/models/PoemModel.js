'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoemSchema = new Schema({
  title: {
    type: String,
    required: 'Poem title is required'
  },
  body: {
    type: String,
    required: 'Latitude coordinate is required'
  },
  featured: {
    type: Boolean,
    required: 'Number of floors is required'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poem', PoemSchema);
