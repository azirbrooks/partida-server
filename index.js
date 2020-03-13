const express = require('express');
const app = express();
const http = require('http').createServer(app);
const helmet = require('helmet');
const io = require('socket.io')(http);
const routes = require('./src/routes');

const port = process.env.PORT || 3000;
const session = require('./src/session');
const cors = require('./src/cors');

/**  App middlewares */
app.use(helmet());
app.use(cors);
app.use(session);
app.use('/', routes);

/** Socket events */
io.origins(process.env.CORS_ORIGIN);
io.on('connection', function(socket) {
  // socket connected
});

/** Start http server */
http.listen(port, () => {
  console.log('Server listening at port %d', port);
});
