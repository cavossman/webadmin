'use strict';
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

mongoose.set('debug', true);

exports.login = (req, res) => {
    applyCORS(res, 'GET');
    handleExistingUser(req, res);
}

exports.createUser = (req, res) => {
    applyCORS(res, 'PUT');
    handleNewUser(req, res)
}

// do real check here and set up expiration
exports.checkIfLogged = (req, res) => {
    applyCORS(res, 'GET');
    handleExistingUser(req, res);
};

// check if username is taken - not likely since we are only using one maybe two users
let handleNewUser = (req, res) => {
    bcrypt.hash(req.query.password, 10, function(err, hash) {
        var newUser = new User({username: req.query.username, password: hash});
        newUser.save(function(err, user) {
            if (err) res.send(err.name);
            res.json(user);
        });
    });
}

let handleExistingUser = (req, res) => {
    User.find({username: req.query.username}, function(err, user) {
        if (user.length > 0) {
            bcrypt.compare(req.query.password, user[0].password, function(err, response) {
                if (err) res.send(err.name);
                console.log((response ? 'successful' : 'failed') + ' login: ' + req.query.username);
                res.json({validCredentials: response, username: user[0].username});
            });
        } else {
            console.log('failed login attempt: ' + req.query.username);
            res.json({validCredentials: false, username: null});
        }
    });
}

// change 'Access-Control-Allow-Origin' to URL of application when live
let applyCORS = (res, httpReq) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', httpReq);
    res.setHeader('Access-Control-Allow-Headers', '*');
}