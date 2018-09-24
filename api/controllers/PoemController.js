'use strict';
var mongoose = require('mongoose'),
    Poem = mongoose.model('Poem');

mongoose.set('debug', true);

exports.getAll = function(req, res) {
    applyCORS(res, 'GET');
    Poem.find({}, function(err, poem) {
        if (err) res.send(err);
        res.json(poem);
    });
};

// should adjust cors
exports.add = function(req, res) {
    applyCORS(res, 'POST');
    var new_poem = new Poem(req.body);
    new_poem.save(function(err, poem) {
        if (err) res.send(err.name);
        res.json(poem);
    });
};


exports.get = function(req, res) {
    applyCORS(res, 'GET');
    Poem.findById(req.params.poem_id, function(err, poem) {
        if (err) res.send(err);
        res.json(poem);
    });
};


exports.update = function(req, res) {
    applyCORS(res, 'PUT');
    Poem.update({_id: req.params.poem_id}, req.body, {overwrite: true}, function(err, poem) {
        if (err) res.send(err);
        res.json(poem);
    });
};


exports.remove = function(req, res) {
    applyCORS(res, 'DELETE');
    Poem.deleteOne({ _id: req.params.poem_id }, function(err, poem) {
        if (err) res.send(err);
        res.json({ message: 'Poem successfully deleted' });
    });
};

let applyCORS = (res, httpReq) => {
    console.log(httpReq);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', httpReq);
    res.setHeader('Access-Control-Allow-Headers', '*');
}