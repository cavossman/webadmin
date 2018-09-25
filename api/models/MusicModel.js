'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  title: {
    type: String,
    required: 'Song title is required'
  },
  contentUrl: {
    type: String,
    required: 'URL is required'
  },
  featured: {
    type: Boolean
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Music', MusicSchema);
