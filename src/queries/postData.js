const databaseConnection = require('../database/db_connection.js');

const postData = (name, quantity, cb) => {
  databaseConnection.query(
    'INSERT INTO product (name, quantity) VALUES ($1, $2)',
    [name, quantity],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = postData;
