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
    required: 'Body is required'
  },
  featured: {
    type: Boolean
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poem', PoemSchema);
