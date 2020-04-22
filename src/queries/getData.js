const databaseConnection = require('../database/db_connection.js');

const getData = cb => {
  databaseConnection.query('SELECT product.id,product.name,product.quantity,prices.price FROM product inner join prices on product.id=prices.product_id;', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.stringify(res.rows));
    }
  });
};

const getAllDescriptions = cb => {
  databaseConnection.query('SELECT * FROM product', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.stringify(res.rows));
      console.log(JSON.stringify(res.rows))
    }
  });
};


module.exports = {
  getData:getData,
  getAllDescriptions: getAllDescriptions
}
