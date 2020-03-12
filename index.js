const express = require('express');
const app = express();
const http = require('http').createServer(app);
const helmet = require('helmet');

const port = process.env.PORT || 3000;
const session = require('./src/session');
const cors = require('./src/cors');

/**  App middlewares */
app.use(helmet());
app.use(cors);
app.use(session);

/** App routes */
app.get('/', function(req, res) {
  res.send('');
});

/** Start http server */
http.listen(port, () => {
  console.log('Server listening at port %d', port);
});
