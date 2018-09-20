'use strict';
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

mongoose.set('debug', true);

exports.login = function(req, res) {
    getCORS(res);
    handleExistingUser(req, res);
};
exports.createUser = function(req, res) {
    putCORS(res);
    handleNewUser(req, res)
}

// do real check here and set up expiration
exports.checkIfLogged = function(req, res) {
    getCORS(res);
    handleExistingUser(req, res);
};

// check if username is taken - not likely since we are only using one maybe two users
var handleNewUser = function(req, res) {
    bcrypt.hash(req.query.password, 10, function(err, hash) {
        var newUser = new User({username: req.query.username, password: hash});
        newUser.save(function(err, user) {
            if (err) res.send(err.name);
            res.json(user);
        });
    });
}

var handleExistingUser = function(req, res) {
    User.find({username: req.query.username}, function(err, user) {
        if (user.length > 0) {
            bcrypt.compare(req.query.password, user[0].password, function(err, response) {
                if (err) res.send(err.name);
                res.json({validCredentials: response, username: user[0].username});
            });
        } else {
            res.json(false);
        }
    });
}



var getCORS = function (res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
}

var postCORS = function (res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
}

var putCORS = function (res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
}