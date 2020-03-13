const express = require('express');
const app = express();
const http = require('http').createServer(app);
const helmet = require('helmet');
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const session = require('./src/session');
const cors = require('./src/cors');
const jsonParser = bodyParser.json();
const User = require('./src/User');

/**  App middlewares */
app.use(helmet());
app.use(cors);
app.use(session);

/** App routes */
app.get('/', function(req, res) {
  let isAuthenticated = false;

  if (req.session.user !== undefined) {
    isAuthenticated = true;
  }

  res.json({ isAuthenticated: isAuthenticated });
});

app.post('/', jsonParser, function(req, res) {
  let isAuthenticated = false;

  if (req.body.userName) {
    req.session.user = new User(req.body.userName);
    isAuthenticated = true;
  }

  res.json({ isAuthenticated: isAuthenticated });
});

/** Socket events */
io.origins(process.env.CORS_ORIGIN);
io.on('connection', function(socket) {
  // socket connected
});

/** Start http server */
http.listen(port, () => {
  console.log('Server listening at port %d', port);
});
