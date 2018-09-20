'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//encrypt password and such
var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required'
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
