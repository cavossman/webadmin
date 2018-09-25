'use strict';
var path = require('path');
module.exports = function(app) {
  const BASE_URL = '/api/v1';
  var poem = require('../controllers/PoemController'),
      user = require('../controllers/UserController'),
      music = require('../controllers/MusicController');

  app.route('/user/login')
    .get(user.login);
  app.route('/user/add')
    .get(user.createUser);
  app.route('/user/loggedIn')
    .get(user.checkIfLogged);

  /* poems */
  app.route(BASE_URL + '/poems')
    .get(poem.getAll)
    .post(poem.add)
    .options(poem.add);

  app.route(BASE_URL + '/poems/:poem_id')
    .get(poem.get)
    .put(poem.edit)
    .delete(poem.remove)
    .options(poem.remove);

  /* music */
  app.route(BASE_URL + '/music')
    .get(music.getAll)
    .post(music.add)
    .options(music.add);

  app.route(BASE_URL + '/music/:music_id')
    .get(music.get)
    .put(music.edit)
    .delete(music.delete)
    .options(music.delete);
  
}