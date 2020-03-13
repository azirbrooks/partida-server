const routes = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const User = require('./User');

routes.get('/', function(req, res) {
  let isAuthenticated = false;

  if (req.session.user !== undefined) {
    isAuthenticated = true;
  }

  res.json({ isAuthenticated: isAuthenticated });
});

routes.post('/', jsonParser, function(req, res) {
  let isAuthenticated = false;

  if (req.body.userName) {
    req.session.user = new User(req.body.userName);
    isAuthenticated = true;
  }

  res.json({ isAuthenticated: isAuthenticated });
});

module.exports = routes;
