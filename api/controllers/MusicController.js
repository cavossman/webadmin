//TODO: Implement logging on access to resources
'use strict';
var mongoose = require('mongoose'),
    Music = mongoose.model('Music');

mongoose.set('debug', true);

exports.getAll = (req, res) => {
    applyCORS(res, 'GET');
    Music.find({}, function(err, music) {
        if (err) res.send(err);
        res.json(music);
    });
};

exports.add = (req, res) => {
    applyCORS(res, 'POST');
    var new_music = new Music(req.body);
    new_music.save(function(err, music) {
        if (err) res.send(err.name);
        res.json(music);
    });
};

exports.edit = (req, res) => {
    applyCORS(res, 'PUT');
    res.send('this route has not been implemented');
}


exports.get = (req, res) => {
    applyCORS(res, 'GET');
    Music.findById(req.params.music_id, function(err, music) {
        if (err) res.send(err);
        res.json(music);
    });
};


exports.update = (req, res) => {
    applyCORS(res, 'PUT');
    Music.update({_id: req.params.music_id}, req.body, {overwrite: true}, function(err, music) {
        if (err) res.send(err);
        res.json(music);
    });
};


exports.delete = (req, res) => {
    applyCORS(res, 'DELETE');
    Music.deleteOne({ _id: req.params.music_id }, function(err, music) {
        if (err) res.send(err);
        res.json({ message: 'Poem successfully deleted' });
    });
};

// change 'Access-Control-Allow-Origin' to URL of application when live
let applyCORS = (res, httpReq) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', httpReq);
    res.setHeader('Access-Control-Allow-Headers', '*');
}