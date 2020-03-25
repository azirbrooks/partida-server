const routes = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const User = require('./User');

routes.get('/access-control/:resourceUri', function(req, res) {
  let isAllowed = false;

  if (req.session.user !== undefined) {
    isAllowed = true;
  }

  res.json({ accessControl: { isAllowed: isAllowed } });
});

routes.post('/', jsonParser, function(req, res) {
  let isAllowed = false;

  if (req.body.userName && req.body.roomName) {
    req.session.user = new User(req.body.userName, req.body.roomName);
    isAllowed = true;
  }

  res.json({ accessControl: { isAllowed: isAllowed } });
});

module.exports = routes;
