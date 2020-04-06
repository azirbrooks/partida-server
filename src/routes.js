const routes = require("express").Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const User = require("./User");

routes.get("/access-control/:resourceUri", function (req, res) {
  let isAuthorized = false;

  if (req.session.user !== undefined) {
    isAuthorized = true;
  }

  res.json({ accessControl: { isAuthorized: isAuthorized } });
});

routes.post("/", jsonParser, function (req, res) {
  let isAuthorized = false;

  if (req.body.userName && req.body.roomName && req.body.playerNumber) {
    req.session.user = new User(
      req.body.userName,
      req.body.roomName,
      req.body.playerNumber
    );
    isAuthorized = true;
  }

  res.json({ accessControl: { isAuthorized: isAuthorized } });
});

module.exports = routes;
