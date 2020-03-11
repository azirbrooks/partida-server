const session = require('express-session');

options = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: process.env.SESSION_NAME,
  cookie: {
    httpOnly: process.env.SESSION_HTTPONLY,
    sameSite: process.env.SESSION_SAMESITE,
    maxAge: Number(process.env.SESSION_MAXAGE),
    secure: process.env.SESSION_SECURE,
    domain: process.env.SESSION_DOMAIN,
  },
};

module.exports = session(options);
