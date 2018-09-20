'use strict';
var path = require('path');
module.exports = function(app) {
    var poem = require('../controllers/PoemController');
    const BASE_URL = '/api/v1';

    app.route(
        '/user/login', 
        (req, res, next) => {
            console.log('login route');
            console.log(req.body);
            next();
        },
        passport.authenticate('local'),
        (req, res) => {
            console.log('logged in ', req.user);
            var userInfo = {
                username: req.user.username
            };
            res.send(userInfo);
        }
    );

    /* API */
    app.route(BASE_URL + '/poems')
    .get(poem.list_all_poems)
    .post(poem.write_a_poem);

    app.route(BASE_URL + '/poems/:poem_id')
    .put(poem.update_a_poem)
    .get(poem.read_a_poem)
    .delete(poem.delete_a_poem);


}