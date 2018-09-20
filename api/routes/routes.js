'use strict';
var path = require('path');
module.exports = function(app) {
  const BASE_URL = '/api/v1';
  var poem = require('../controllers/PoemController'),
      user = require('../controllers/UserController');

  app.route('/user/login')
    .get(user.login);
  app.route('/user/add')
    .get(user.createUser);

  app.route('loggedIn')
    .get(user.checkIfLogged);

  /* poems */
  //should adjust route - don't need all options for this endpoint
  app.route(BASE_URL + '/poems')
    .get(poem.list_all_poems)
    .post(poem.write_a_poem)
    .put(poem.write_a_poem)
    .options(poem.write_a_poem);

  app.route(BASE_URL + '/poems/:poem_id')
    .put(poem.update_a_poem)
    .get(poem.read_a_poem)
    .delete(poem.delete_a_poem);
}