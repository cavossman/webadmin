'use strict';
var mongoose = require('mongoose'),
    Poem = mongoose.model('Poem');

mongoose.set('debug', true);

exports.list_all_poems = function(req, res) {
    getCORS(res);
    Poem.find({}, function(err, poem) {
        if (err) res.send(err);
        res.json(poem);
    });
};

exports.write_a_poem = function(req, res) {
    postCORS(res);
    var new_poem = new Poem(req.body);
    new_poem.save(function(err, poem) {
        if (err) res.send(err.name);
        res.json(poem);
    });
};


exports.read_a_poem = function(req, res) {
    getCORS(res);
    Poem.findById(req.params.poem_id, function(err, poem) {
        if (err) res.send(err);
        res.json(poem);
    });
};


exports.update_a_poem = function(req, res) {
    postCORS(res);
    Poem.update({_id: req.params.poem_id}, req.body, {overwrite: true}, function(err, poem) {
        if (err) res.send(err);
        res.json(poem);
    });
};


exports.delete_a_poem = function(req, res) {
    postCORS(res);
    Poem.remove({ _id: req.params.poem_id }, function(err, poem) {
        if (err) res.send(err);
        res.json({ message: 'Poem successfully deleted' });
    });
};

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
