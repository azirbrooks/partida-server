const express = require('express');
const app = express();
const http = require('http').createServer(app);
const helmet = require('helmet');
const io = require('socket.io')(http);
const routes = require('./src/routes');
const sharedsession = require('express-socket.io-session');

const port = process.env.PORT || 3000;
const session = require('./src/session');
const cors = require('./src/cors');
const socketEvents = require('./src/socket-events');

/**  App middlewares */
app.use(helmet());
app.use(cors);
app.use(session);
app.use('/', routes);

/** Socket events */
// Allow requests only from CORS_ORIGIN */
io.origins(process.env.CORS_ORIGIN);

// Attach express-session object to socket.handshake
io.use(
  sharedsession(session, {
    autoSave: true,
  })
);

// Start listen for socket events
socketEvents.listen(io);

/** Start http server */
http.listen(port, () => {
  console.log('Server listening at port %d', port);
});
