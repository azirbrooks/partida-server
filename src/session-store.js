const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const sessionStore = new MongoDBStore(
  {
    uri: process.env.DATABASE_URI,
    databaseName: process.env.DATABASE_NAME,
    collection: process.env.DATABASE_SESSIONSTORE_COLLECTION,
  },
  function(error) {
    if (error) {
      console.log('session-store: Unable to connect to the database');
    }
  }
);

module.exports = sessionStore;
