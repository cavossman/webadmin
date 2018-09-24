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

  app.route('/loggedIn')
    .get(user.checkIfLogged);

  /* poems */
  //should adjust route - don't need all options for this endpoint
  app.route(BASE_URL + '/poems')
    .get(poem.getAll)
    .post(poem.add)
    .put(poem.add)
    .options(poem.add);

  // app.all(BASE_URL + '/poems/:poem_id', (req, res, next) => {
  //   console.log(req);
  // });

  app.route(BASE_URL + '/poems/:poem_id')
    .put(poem.add)
    .get(poem.get)
    .options(poem.remove);
}