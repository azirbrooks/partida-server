const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('');
});

http.listen(port, () => {
  console.log('Server listening at port %d', port);
});
