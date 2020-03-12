const cors = require('cors');

const options = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = cors(options);
